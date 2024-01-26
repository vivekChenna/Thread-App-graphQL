import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createGraphqlServer from './graphql/index'


async function init(){

        const app = express();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(express.json());

        app.get('/' , (req , res)=>{
                res.json({message : "server is up and running"});
        });

        app.use('/graphql' , expressMiddleware(await createGraphqlServer()));

        app.listen(PORT , ()=>{
            console.log(`server started successfully at ${PORT}`);
        })


}


init();