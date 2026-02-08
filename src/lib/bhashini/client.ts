/**
 * Bhashini API client for real-time Indic language translation.
 * Uses pipeline-based REST API: search → config → compute.
 * @see https://bhashini.gitbook.io/bhashini-apis
 */

const BHASHINI_BASE = process.env.BHASHINI_API_BASE ?? 'https://api.bhashini.gov.in';

export type BhashiniLangCode =
  | 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa' | 'ur';

export interface TranslateOptions {
  sourceLanguage: BhashiniLangCode;
  targetLanguage: BhashiniLangCode;
  text: string;
}

export interface TranslateResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

/**
 * Translate text between English and Indic languages via Bhashini.
 * In production, set BHASHINI_API_KEY and use pipeline config + compute.
 * This wrapper supports both mock (no key) and real API.
 */
export async function translate(options: TranslateOptions): Promise<TranslateResult> {
  const { sourceLanguage, targetLanguage, text } = options;
  if (!text?.trim()) {
    return { translatedText: '', sourceLanguage, targetLanguage };
  }

  const apiKey = process.env.BHASHINI_API_KEY;
  if (!apiKey) {
    return mockTranslate(options);
  }

  try {
    const pipelineId = await getTranslationPipelineId(apiKey, sourceLanguage, targetLanguage);
    if (!pipelineId) return mockTranslate(options);

    const result = await runPipelineCompute(apiKey, pipelineId, {
      sourceLanguage,
      targetLanguage,
      input: [{ source: text }],
    });
    const translatedText = result?.pipelineResponse?.[0]?.output?.[0]?.target ?? text;
    return { translatedText, sourceLanguage, targetLanguage };
  } catch {
    return mockTranslate(options);
  }
}

async function getTranslationPipelineId(
  apiKey: string,
  source: string,
  target: string
): Promise<string | null> {
  const searchRes = await fetch(
    `${BHASHINI_BASE}/pipeline/search?sourceLanguage=${source}&targetLanguage=${target}&pipelineType=translation`,
    { headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${apiKey}` } }
  );
  if (!searchRes.ok) return null;
  const data = await searchRes.json();
  const pipeline = Array.isArray(data) ? data[0] : data?.pipelines?.[0];
  return pipeline?.pipelineId ?? null;
}

async function runPipelineCompute(
  apiKey: string,
  pipelineId: string,
  body: { sourceLanguage: string; targetLanguage: string; input: Array<{ source: string }> }
): Promise<{ pipelineResponse?: Array<{ output?: Array<{ target?: string }> }> }> {
  const res = await fetch(`${BHASHINI_BASE}/pipeline/compute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ pipelineId, ...body }),
  });
  if (!res.ok) throw new Error('Bhashini compute failed');
  return res.json();
}

function mockTranslate(options: TranslateOptions): TranslateResult {
  const { sourceLanguage, targetLanguage, text } = options;
  if (sourceLanguage === targetLanguage) {
    return { translatedText: text, sourceLanguage, targetLanguage };
  }
  return {
    translatedText: `[${targetLanguage}] ${text}`,
    sourceLanguage,
    targetLanguage,
  };
}
