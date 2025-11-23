-- Create storage bucket for ML models
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('models', 'models', true, 52428800, ARRAY['application/octet-stream']::text[])
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access to models
CREATE POLICY "Public Access to Models"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'models');