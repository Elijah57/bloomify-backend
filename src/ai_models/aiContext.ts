import AiInterface from "./interface";

export class AIContext{
    private model: AiInterface

    constructor(model:AiInterface){
        this.model = model;
    }

    switchModel(model: AiInterface){
        this.model = model
    }

    async processInput(prompt: string){
        return await this.model.generateResponse(prompt);
    }
}