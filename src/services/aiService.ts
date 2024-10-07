import { GeminiModel, AIContext } from "../ai_models";
import { ServerError } from "../middlewares";

const gemini = new GeminiModel()
const ai_model = new AIContext(gemini);

function parsePrompt(category: string, user_name: string, age_range: string, gender: string, tone: string, current_challenge: string[], support_area: string[],curr_emotional_state: string[], current_focus: string[], personality: string[]){
	let prompt;

	switch (category) {
		case 'affirmation':
		  prompt = `Generate a motivational affirmation for ${user_name}, a ${age_range} ${gender} who prefers a ${tone} tone. They are currently focused on ${current_challenge} and need support with ${support_area}."
`;
		  break;
		// case 'quote':
		//   prompt = `Provide a motivational quote for someone who is focused on ${preferences.join(", ")}:`;
		//   break;
		// case 'motivation':
		//   prompt = `Create a motivational message for ${userName} about achieving their goals related to ${preferences.join(", ")}:`;
		//   break;
		default:
		  throw new Error('Invalid content category');
	  }

	return prompt;
}

async function genAIResponse(context){	

	const {category, user_name, age_range, gender, tone, current_challenge, support_area, personality, curr_emotional_state, current_focus} = context;


    try{
		let prompt = parsePrompt(category, user_name, personality, age_range, gender, tone, current_challenge, support_area, current_focus, curr_emotional_state, )
        const result = await ai_model.processInput(prompt)
   
        return result;
    }catch (error) {
    // console.error('Error generating content:', error);

    
    throw new ServerError(`Failed to generate content: ${error.message} `);
  }
};



export default genAIResponse;