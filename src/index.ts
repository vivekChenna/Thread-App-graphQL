import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


async function init(){

    const app = express();
const PORT = Number(process.env.PORT) || 8000;

const gqlServer = new ApolloServer({
    typeDefs : `
    type Query {
            hello:String
    }`,
    resolvers : {
        Query : {
            hello : ()=> `hey there how its going?  `
        }
    }
})

app.use(express.json());

await gqlServer.start();

app.get('/' , (req , res)=>{
        res.json({message : "server is up and running"});
});

app.use('/graphql' , expressMiddleware(gqlServer));

app.listen(PORT , ()=>{
    console.log(`server started successfully at ${PORT}`);
})


}


init();