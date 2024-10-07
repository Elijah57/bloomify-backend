import User from "../models/users";
import Profile from "../models/profile";
import { Types } from "mongoose";
import { HttpError, ResourceNotFound } from "../middlewares";



export class UserService{

    public async UserProfileInit(payload){
        
        const { age_range, life_stage, personality, support_area, current_focus, curr_emotional_state, affirmation_tone, affirmation_frequency, preferred_time} = payload;


        try{
            const newProfile = new Profile();

            newProfile.age_range = age_range;
            newProfile.life_stage = life_stage;
            newProfile.personality = personality;
            newProfile.support_area = support_area;
            newProfile.current_focus = current_focus;
            newProfile.curr_emotional_state = curr_emotional_state;
            newProfile.affirmation_tone = affirmation_tone;
            newProfile.affirmation_frequency = affirmation_frequency;
            newProfile.preferred_time = preferred_time;
            await newProfile.save()

            console.log(newProfile)
            
            return "user profile created";

        }catch (error){

        }
        
    }

    public async getUserProfile(userId:Types.ObjectId){
        try{

            const user = await User.findOne({_id: userId}).populate("goals").select("-password");
            if(!user) throw new ResourceNotFound("User not Found")
            return user;

        }
        catch(error){
            if (error instanceof HttpError){
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
    
    }
    }

    // public async updateUserPrefernce(userId:Types.ObjectId, preferences: string[]){
    //     try {

    //         let user = await User.findById(userId)

    //         if(!user) throw new ResourceNotFound("User not Found")

    //         user.preferences = preferences || user.preferences

    //         user = await user.save()

    //         return user.toObject();

    //     }catch(error){
    //         if (error instanceof HttpError){
    //             throw error;
    //         }
    //         throw new HttpError(error.status || 500, error.message || error);
    
    // }
    // }
}