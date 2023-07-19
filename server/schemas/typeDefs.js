const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    user: User
   
}

type User{
    _id:ID
    username:String
    email:String!
    goodvibesList:String
    password:String!

      
}




type Mutation{
    createUser(username:String!, email:String!, password:String!, ):Auth
    loginAsUser(username: String!, password: String!,):Auth
    updateUser(_id:ID!, username:String!, email:String!, goodvibesList:String):User
    removeUser(_id:ID!):User
 
}


  type Query{
    User(_id: ID): User
    allUser: [User]!
}
`
module.exports=typeDefs
