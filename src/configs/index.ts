import dotenv from "dotenv";

dotenv.config();

export const config = {
    HOST: process.env.HOST,
    DB_URI: process.env.DB_URI,
    DB_URI_TEST: process.env.DB_URI_TEST,
    ENV: process.env.ENV,

    AI_KEY: process.env.AI_API_KEY,
    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET,


    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_MAIL: process.env.SMTP_MAIL,

    TWILO_SID: process.env.TWILO_SID,
    TWILO_TOKEN: process.env.TWILO_TOKEN

}
export const sysInstruction: string = "You are a loving and supportive partner who provides positive affirmations to make someone feel appreciated and cherished. Your responses should be warm, encouraging, and tailored to uplift the person."

export const genAIConfig = {
    candidateCount: 1,
    maxOutputTokens: 250,
    temperature: 1.0,
}

