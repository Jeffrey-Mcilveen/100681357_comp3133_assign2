const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors')

const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')

//const { ApolloServer } = require('apollo-server-express');
const { ApolloServer } = require('apollo-server-express')



mongoose.connect("mongodb+srv://dbJeff:Midnight@cluster0.bnp1v.mongodb.net/100681357_comp3133_assig1?retryWrites=true&w=majority",
{
    usenewUrlparser:true,
    useUnifiedTopology:true   
}).then(success => {
    console.log(`MongoDB is Connected! ${success}` )
}).catch(err =>{
    console.log(`Mongodb Error: ${err}`)
})

// const server = new ApolloServer({
//     typeDefs: TypeDefs.typeDefs,
//     resolvers: Resolvers.resolvers
//   })

const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})


const app = express();
app.use(bodyParser.json());
app.use('*', cors());

//Add Express app as middleware to Apollo Server

server.applyMiddleware({app})

app.listen(4001, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`));