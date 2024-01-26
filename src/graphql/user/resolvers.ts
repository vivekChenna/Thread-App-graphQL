// inside resolvers queries and mutations will be there

import userService, { createUserPayload, getUserTokenPayload } from "../../services/userService";

const queries = {
    getUserToken: async(_:any , payload : getUserTokenPayload)=>{
        const response = await userService.getUserToken(payload);
        return response;
    }
};
const mutations = {
createUser:async(_:any, payload : createUserPayload)=>{
    const res = await userService.createUser(payload);
        return res.id;
    }
};

export const resolvers = {queries , mutations};