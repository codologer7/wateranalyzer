import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ph, hardness, solids, chloramines, sulfate, conductivity, organic_carbon, trihalomethanes, turbidity } = await req.json();

    console.log('Received prediction request:', { ph, hardness, solids, chloramines, sulfate, conductivity, organic_carbon, trihalomethanes, turbidity });

    // Validate inputs
    if (!ph || !hardness || !solids || !chloramines || !sulfate || !conductivity || !organic_carbon || !trihalomethanes || !turbidity) {
      return new Response(
        JSON.stringify({ error: 'All parameters are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Load and run ONNX model here
    // For now, using mock predictions until ONNX model is provided
    
    // Prepare input array for model
    const inputArray = [
      parseFloat(ph),
      parseFloat(hardness),
      parseFloat(solids),
      parseFloat(chloramines),
      parseFloat(sulfate),
      parseFloat(conductivity),
      parseFloat(organic_carbon),
      parseFloat(trihalomethanes),
      parseFloat(turbidity)
    ];

    console.log('Input array for model:', inputArray);

    // Rule-based prediction using WHO/EPA water quality standards
    const phScore = ph >= 6.5 && ph <= 8.5 ? 1 : 0;
    const hardnessScore = hardness <= 300 ? 1 : 0;
    const solidsScore = solids <= 1000 ? 1 : 0;
    const chloraminesScore = chloramines <= 4 ? 1 : 0;
    const sulfateScore = sulfate <= 250 ? 1 : 0;
    const conductivityScore = conductivity <= 800 ? 1 : 0;
    const organicCarbonScore = organic_carbon <= 2 ? 1 : 0;
    const trihalomethanesScore = trihalomethanes <= 80 ? 1 : 0;
    const turbidityScore = turbidity <= 5 ? 1 : 0;

    const totalScore = phScore + hardnessScore + solidsScore + chloraminesScore + 
                       sulfateScore + conductivityScore + organicCarbonScore + 
                       trihalomethanesScore + turbidityScore;

    const potability = totalScore >= 7 ? "Safe" : "Unsafe";
    const confidence = (totalScore / 9) * 0.3 + 0.7;

    // Determine event type and fractions based on parameter analysis
    let event_type = "Dry Weather";
    let fractions = {
      sewage: 0.25,
      industrial: 0.25,
      storm: 0.25,
      groundwater: 0.25,
    };

    // High organic carbon and chloramines suggest sewage influence
    if (organic_carbon > 5 || chloramines > 3) {
      event_type = "First Flush";
      fractions = {
        sewage: 0.45,
        industrial: 0.20,
        storm: 0.25,
        groundwater: 0.10,
      };
    }

    // High conductivity and solids suggest industrial influence
    if (conductivity > 600 || solids > 8000 || sulfate > 200) {
      event_type = "Industrial Spike";
      fractions = {
        sewage: 0.20,
        industrial: 0.50,
        storm: 0.15,
        groundwater: 0.15,
      };
    }

    // High turbidity suggests storm water
    if (turbidity > 4) {
      event_type = "First Flush";
      fractions = {
        sewage: 0.25,
        industrial: 0.15,
        storm: 0.45,
        groundwater: 0.15,
      };
    }

    const result = {
      potability,
      event_type,
      confidence: Math.min(confidence, 0.99),
      fractions,
    };

    console.log('Prediction result:', result);

    return new Response(
      JSON.stringify(result),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in predict function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
