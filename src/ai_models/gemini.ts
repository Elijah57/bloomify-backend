import { GoogleGenerativeAI, GenerativeModel, GenerateContentResult} from "@google/generative-ai";
import { config, genAIConfig, sysInstruction } from "../configs";
import AiInterface from "./interface";

export class GeminiModel implements AiInterface{
    private model: GenerativeModel

    constructor(){
        this.model = new GoogleGenerativeAI(config.AI_KEY).getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: genAIConfig,
            systemInstruction: sysInstruction,
        })

    }

    async generateResponse(prompt: string): Promise<string> {
        try{
            const result: GenerateContentResult = await this.model.generateContent(prompt)
            // return response as unknown as string;
            return result.response.text();
           

        }catch(error){
            console.error("Error generating response:", error);
            throw new Error("Failed to generate response");
        }
        
    }
}

