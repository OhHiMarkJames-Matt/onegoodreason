const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
    token: String
    user: User
}

type User {
    _id: ID
    username: String
    email: String!
    password: String!
    savedgoodVibes: [goodVibes]
}

type goodVibes {
    _id: ID
    thegoodVibe: String
}

input goodVibesInput {
    thegoodVibe: String
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginAsUser(username: String!, password: String!): Auth
    updateUser(_id: ID!, username: String!, email: String!, goodVibesList: String): User
    removeUser(_id: ID!): User
    addgoodVibes(savedgoodVibes: goodVibesInput): goodVibes
}

type Query {
    user(_id: ID): User
    allUsers: [User]!
    allgoodVibes: [goodVibes]
    goodVibe(_id: ID): goodVibes
}
`
module.exports = typeDefs;
