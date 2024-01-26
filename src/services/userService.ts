import { prismaClient } from "../lib/db"
import {createHmac , randomBytes} from 'node:crypto'
import JWT from 'jsonwebtoken';


export interface createUserPayload{
        firstName :string
        lastName : string
        email : string
        password : string
}

export interface getUserTokenPayload{
    email : string
    password :string
}

const JWT_SECRET = 'secret@';

class userService{

    public static  createUser(payload  : createUserPayload){
        const {firstName , lastName , email , password} = payload;
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = this.generateHash(salt , password);
        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword
            }
        })
    }

    private static generateHash(salt:string , password :string){
        const hashedPassword = createHmac('sha256',salt).update(password).digest('hex');
        return hashedPassword;
    }

    private static  getUserByEmail(email:string){
       return prismaClient.user.findUnique({where : {email}});
    }

    public static async getUserToken(payload :getUserTokenPayload  ){

        const {email , password} = payload;
        const user = await this.getUserByEmail(email);  
        if(!user){
            throw new Error('user not found');
        }
        const userSalt = user.salt;
      
        const userHashPassword = this.generateHash(userSalt , password);
        if(userHashPassword !== user.password){
            throw new Error('Incorrect Password');
        }

        // get token

        const token = JWT.sign({id : user.id ,email : user.email },JWT_SECRET);
        return token;


        

    }


}

export default userService;