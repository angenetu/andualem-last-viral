
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ScriptData, TrendData, AutoPilotSlot } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Script Generation (Flash & Flash-Lite) ---

export const generateViralScript = async (topic: string, platform: string): Promise<ScriptData> => {
  // Use Flash for the main script logic
  const prompt = `
    Act as a viral content strategist for ${platform}. 
    Create a highly engaging video script about "${topic}".
    
    The response must be a JSON object with the following structure:
    {
      "title": "A clickbait but honest title",
      "hook": "The first 3 seconds visual and audio hook",
      "body": "The main content, concise and fast-paced",
      "cta": "Call to action",
      "visualCues": ["List of 3-5 visual scene descriptions corresponding to the script"],
      "hashtags": [] 
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            body: { type: Type.STRING },
            cta: { type: Type.STRING },
            visualCues: { type: Type.ARRAY, items: { type: Type.STRING } },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } } // Placeholder
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    const data = JSON.parse(text) as ScriptData;

    // Use Flash-Lite for fast hashtag generation (Low latency requirement)
    try {
      const hashtagResponse = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest', // Corrected from gemini-2.5-flash-lite-latest
        contents: `Generate 5 viral hashtags for a video about "${topic}" on ${platform}. Return JSON array of strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      });
      
      if (hashtagResponse.text) {
        data.hashtags = JSON.parse(hashtagResponse.text);
      }
    } catch (liteError) {
      console.warn("Hashtag generation failed, using fallbacks:", liteError);
      data.hashtags = [`#${platform.toLowerCase()}`, "#viral", "#trending", `#${topic.split(' ')[0]}`];
    }

    return data;

  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};

// --- Growth & Grounding (Search & Maps) ---

export const analyzeTrendsWithGrounding = async (niche: string): Promise<TrendData[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `What are 3 currently trending specific topics in the "${niche}" niche for YouTube Shorts right now? Be specific about recent events or viral challenges.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    // Parse grounding chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Let's use a second call to format the grounded response into JSON
    const formatResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Extract trending topics from this text and format as JSON array of objects with keys: topic, volume (estimate number), growth (estimate number), difficulty (Low/Medium/High), snippet (one sentence summary).
      
      Text: ${response.text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
             type: Type.OBJECT,
             properties: {
                topic: { type: Type.STRING },
                volume: { type: Type.NUMBER },
                growth: { type: Type.NUMBER },
                difficulty: { type: Type.STRING },
                snippet: { type: Type.STRING }
             }
          }
        }
      }
    });

    const result = JSON.parse(formatResponse.text || '[]');
    // Attach source URLs from the first grounding call if available
    return result.map((item: any, index: number) => ({
      ...item,
      sourceUrl: chunks[index]?.web?.uri || ''
    }));

  } catch (error) {
    console.error("Error analyzing trends:", error);
    return [];
  }
};

export const findLocations = async (query: string, lat: number, lng: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: { latitude: lat, longitude: lng }
          }
        }
      }
    });
    return response.text || "No locations found.";
  } catch (e) {
    console.error(e);
    return "Error finding locations.";
  }
};

// --- Video Generation (Veo) ---

export const generateVeoVideo = async (prompt: string, image?: { data: string, mimeType: string }, aspectRatio: '16:9' | '9:16' = '16:9') => {
  try {
    let operation;
    
    if (image) {
      // Image-to-Video: Veo supports generating from an image prompt
      // The prompt text is optional but recommended for better control
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt, // Provide text context
        image: {
          imageBytes: image.data,
          mimeType: image.mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });
    } else {
      // Text-to-Video
      operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });
    }

    // Polling
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5s poll
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("No video URI returned");
    
    // The frontend needs to append &key=API_KEY to this URI to view it
    return videoUri;

  } catch (error) {
    console.error("Veo generation error:", error);
    throw error;
  }
};

// --- Image Generation & Editing (Imagen 3 & Nano Banana) ---

export const generateImagenImage = async (prompt: string, aspectRatio: '16:9' | '9:16' | '1:1' = '1:1') => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });
    
    const base64 = response.generatedImages[0]?.image?.imageBytes;
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Imagen error:", error);
    throw error;
  }
};

export const editImageNano = async (base64Image: string, prompt: string) => {
  try {
    // Strip header if present
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/png', 
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract result
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part && part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    console.error("Nano Banana error:", error);
    throw error;
  }
};

// --- Strategy & Thinking (Gemini 3 Pro) ---

export const deepStrategyThink = async (problem: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: problem,
      config: {
        thinkingConfig: { thinkingBudget: 16000 } // Set budget
      }
    });
    return response.text;
  } catch (error) {
    console.error("Thinking error:", error);
    throw error;
  }
};

// --- Audio Tools (TTS & Transcription) ---

export const generateTTS = async (text: string, voice: string = 'Kore') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });
    
    const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64; // UI will decode this
  } catch (error) {
    console.error("TTS error:", error);
    throw error;
  }
};

export const analyzeVideoContent = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this video concept and predict its viral potential: ${description}`,
    });
    return response.text;
  } catch (e) {
    return "Analysis failed.";
  }
};

// --- New Auto-Edit & Caption Services ---

export const planVideoEdit = async (rawFootageDescription: string, style: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Act as a professional video editor. Plan an edit for raw footage described as: "${rawFootageDescription}".
      Style: ${style}.
      Return a JSON object with:
      - "musicTrack": recommended genre/track name
      - "pacing": description of cut speed
      - "cuts": array of { "start": number, "end": number, "description": string } (timestamps in seconds, imagine a 2 min video)
      - "effects": list of visual effects to apply`,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Auto-edit planning failed", error);
    return null;
  }
};

export const generateCaptions = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate SRT formatted captions for this script with viral-style kinetic typography suggestions (e.g. [Big Red Text]).
      Script: ${text}`,
    });
    return response.text;
  } catch (error) {
    console.error("Caption generation failed", error);
    return null;
  }
};

// --- Auto Pilot 24/7 Content Plan ---

export const generateDailyPlan = async (niche: string, tone: string, includeAmharic: boolean = false): Promise<AutoPilotSlot[]> => {
  let prompt = `
    Act as a Global Content Director for a "${niche}" brand.
    Create a 24-hour content posting schedule (1 video per hour).
    Tone: ${tone}.
    
    Requirements:
    1. Topics must be DIVERSE.
    2. Content must be GOOD FOR THE WORLD (positive impact, sharing knowledge).
  `;

  if (includeAmharic) {
    prompt += `
    3. CRITICAL REQUIREMENT: EXACTLY 6 of the 24 videos MUST be specifically about ETHIOPIA (Culture, History, News, or Tech in Ethiopia).
       - For these 6 videos, the 'title' and 'concept' fields MUST be written in AMHARIC SCRIPT (Fidel).
       - The content must feature Ethiopian people, country, culture, or history.
       - Set the "language" field to "Amharic" for these 6 items.
       - Distribute them evenly (e.g., 2 morning, 2 afternoon, 2 evening).
    4. The remaining 18 videos MUST be in English and globally relevant. Set "language" to "English".
    `;
  } else {
    prompt += `
    3. All 24 videos should be in English and globally relevant. Set "language" to "English".
    `;
  }

  prompt += `
    Return a JSON array of 24 objects. Each object:
    {
      "time": "HH:00",
      "title": "Title",
      "concept": "1 sentence summary",
      "hook": "The opening line",
      "platforms": ["TikTok", "YouTube", "Instagram", "Facebook"],
      "status": "Pending",
      "progress": 0,
      "language": "English" | "Amharic"
    }
    Ensure times range from 00:00 to 23:00.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING },
              title: { type: Type.STRING },
              concept: { type: Type.STRING },
              hook: { type: Type.STRING },
              platforms: { type: Type.ARRAY, items: { type: Type.STRING } },
              status: { type: Type.STRING },
              progress: { type: Type.NUMBER },
              language: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AutoPilot Plan Error", error);
    return [];
  }
};
