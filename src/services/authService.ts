import { BadRequest, Conflict, HttpError, ResourceNotFound, } from "../middlewares";
import User from "../models/users"
import { IAuthLogin, IAuthSignup } from "../types";
import { comparePassword, generateAccessToken, generateNumericOTP, generateVerificationCode, hashPassword } from "../utils";
import sendMail  from "../utils/mail";
import {config} from "../configs";
import * as crypto from "crypto"



export class AuthService{

    public async signup(payload){

        const {firstname, lastname, gender, email, password} = payload;
        const { age_range, life_stage, personality, support_area, current_focus, curr_emotional_state, affirmation_tone, affirmation_frequency, preferred_time} = payload;

        const profile_data = {age_range, life_stage, personality, support_area, current_focus, curr_emotional_state, affirmation_tone, affirmation_frequency, preferred_time}
        try{
            const userExist = await User.findOne({email})
            if(userExist){
                throw new Conflict("User already exists") 
            }

            const {activationCode, hashedActivationCode} = await generateVerificationCode();
            const otp_expires = new Date(Date.now() + 10 * 60 * 1000)

            const user = new User();
        
            user.firstname = firstname;
            user.lastname = lastname;
            user.gender = gender;
            user.email = email;
            user.password = password;
            user.otp_code = hashedActivationCode;
            user.otpExpires = otp_expires

            const createUser = await user.save()

            const {password: _, ...rest} = createUser.toObject();
            console.log(createUser)

            const emailData = {
                user: createUser.firstname,
                otp: `${config.HOST}/verify-email/?token=${activationCode}`
            }

            const mailSent = await sendMail({
                subject: "Activate your account",
                to: user.email,
                data: emailData,
                template: "activation.ejs"
            });

            return { mailSent, newUser: rest, profile_data}
        }
        catch (error){
            console.error('Error during registration:', error);
            if (error instanceof HttpError) {
                throw error;
              }
              throw new HttpError(error.status || 500, error.message || error);
            }
        }

    public async login(payload: IAuthLogin){
        const { email, password} = payload;

        try{
            const user = await User.findOne({email})

            if(!user){
                throw new ResourceNotFound("User does not exists")
            }

            const  isValidPasswd = comparePassword(password, user.password)

            if (!isValidPasswd){
                throw new BadRequest("Invalid email or password")

            }

            // if (!user.isVerified){
            //     throw new HttpError(403, "Email not verified")
            // }

            const user_ = user.toObject()
            const accessToken = generateAccessToken(user_._id)
            const {password: _, ...userDetails } = user_;
            console.log(accessToken, userDetails)
            return {user: userDetails, accessToken}

            
        }catch(error){
            console.log(error)
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
            
        }
    }

    public async verify(payload: string){
        const token = payload;

        const hashedActivationCode = crypto.createHash("sha256").update(token).digest("hex")

        try{
            const user = await User.findOne({otp_code: hashedActivationCode})

            if(!user){
                throw new ResourceNotFound("User does not exist or has been purged. please signup to use smartLearn")
            }

            if(user.isVerified){
                throw new Conflict("Email already verified");
            }

            user.isVerified = true;
            await user.save()

            return {status:true, message: "verification successful"}

        }catch(error){
            // console.error('Error during registration:', error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(error.status || 500, error.message || error);
            
        }

    }


    public async sendVerificationMail(payload: string){

        const email = payload;

        try{
            let user = await User.findOne({email: email})

            if(!user){
                throw new ResourceNotFound("User does not exist")
            }

            const {activationCode, hashedActivationCode} = await generateVerificationCode();
            const otp_expires = new Date(Date.now() + 10 * 60 * 1000)

            user.otp_code = hashedActivationCode;
            user.otpExpires = otp_expires

            await user.save()

            const emailData = {
                user: user.firstname,
                otp: `${config.HOST}/verify-email/?token=${activationCode}`
            }

            const mailSent = await sendMail({
                subject: "Activate your account",
                to: user.email,
                data: emailData,
                template: "activation.ejs"
            });

            if(!mailSent){
                throw new HttpError(500, "Failed to send verification link")
            }
        }catch(error){
            console.error('Error sending verification link:', error);
            if (error instanceof HttpError) {
                throw error;
              }
              throw new HttpError(error.status || 500, error.message || error);
            
        }

    }
    
}