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

    // Mock prediction response
    // Replace this with actual ONNX model inference
    const mockResult = {
      potability: Math.random() > 0.5 ? "Safe" : "Unsafe",
      event_type: ["First Flush", "Industrial Spike", "Dry Weather"][Math.floor(Math.random() * 3)],
      confidence: 0.85 + Math.random() * 0.15,
      fractions: {
        sewage: 0.35 + Math.random() * 0.2,
        industrial: 0.25 + Math.random() * 0.2,
        storm: 0.2 + Math.random() * 0.15,
        groundwater: 0.1 + Math.random() * 0.15,
      },
    };

    console.log('Prediction result:', mockResult);

    return new Response(
      JSON.stringify(mockResult),
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
