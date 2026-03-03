
import { GoogleGenAI, Modality } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Decodes a base64 string into a Uint8Array of bytes.
export const decode = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Decodes raw PCM audio data into an AudioBuffer for playback.
export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Generates Text-to-Speech audio using the specialized gemini-2.5-flash-preview-tts model.
export const generateTTS = async (text: string, voiceName: string, emotion: string = 'Neutral', speed: number = 1.0, pitch: number = 0) => {
  const ai = getAIClient();
  const prompt = `Actúa como un locutor profesional. 
    Voz configurada: ${voiceName}. 
    Emoción solicitada: ${emotion}. 
    Ritmo: ${speed}x. 
    Tono: ${pitch}. 
    Texto a locutar: ${text}`;
    
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

// Performs fact-checking and enrichment using Google Search grounding.
export const runFactCheck = async (text: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analiza la veracidad histórica y actual de la siguiente información. Si detectas errores, corrígelos y explica por qué. Utiliza fuentes fiables vía Google Search. Texto: "${text}"`,
    config: { tools: [{ googleSearch: {} }] },
  });

  // Extract and list URLs from grounding metadata as required by the guidelines.
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web && chunk.web.uri)
    ?.map(chunk => chunk.web!.uri);
  
  if (sources && sources.length > 0) {
    const uniqueSources = Array.from(new Set(sources));
    return `${response.text}\n\nFuentes consultadas:\n${uniqueSources.join('\n')}`;
  }
  
  return response.text;
};

// Fix for missing export reported in Editor.tsx.
export const analyzeSocialUrl = async (url: string, duration: number) => {
  return generatePodcastFromSource(url, 'url', duration);
};

// Generates a podcast script based on a source, using Google Search for long-form content.
export const generatePodcastFromSource = async (source: string, type: 'url' | 'text' | 'pdf', duration: number) => {
  const ai = getAIClient();
  const isLong = duration > 120;
  
  const prompt = `Genera un guion de podcast profesional de aproximadamente ${duration} segundos basado en el siguiente ${type === 'url' ? 'enlace' : 'contenido'}: ${source}.
  
  ${isLong ? 'IMPORTANTE: Dado que el podcast es extenso, utiliza Google Search para investigar a fondo sobre el tema, encontrar datos curiosos, contexto histórico y ramificaciones interesantes para que el contenido sea rico y educativo.' : 'Resume los puntos clave de forma directa.'}
  
  Escribe el guion integrando etiquetas como [Risa], [Pausa 2s] y rodeando palabras clave con [stress]palabra[/stress] para dar énfasis. El tono debe ser de un podcaster experto.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: isLong ? { tools: [{ googleSearch: {} }] } : {},
  });
  
  let resultText = response.text || '';

  // Extract and list URLs from grounding metadata if Google Search was active.
  if (isLong) {
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web && chunk.web.uri)
      ?.map(chunk => chunk.web!.uri);
    
    if (sources && sources.length > 0) {
       const uniqueSources = Array.from(new Set(sources));
       resultText += `\n\nFuentes de investigación:\n${uniqueSources.join('\n')}`;
    }
  }
  
  return resultText;
};

// Translates text to a target language.
export const translateText = async (text: string, targetLanguage: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Traduce fielmente el siguiente texto al ${targetLanguage}, manteniendo el tono original: ${text}`,
  });
  return response.text;
};
