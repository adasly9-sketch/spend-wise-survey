CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  age INTEGER,
  gender TEXT,
  nationality TEXT,
  spend_range TEXT,
  career TEXT,
  email TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  scores JSONB
);
GRANT INSERT ON public.survey_responses TO anon;
GRANT ALL ON public.survey_responses TO service_role;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a response" ON public.survey_responses FOR INSERT TO anon WITH CHECK (true);