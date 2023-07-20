const { AuthenticationError } = require("apollo-server-express");
const { User, goodVibes} = require("../models");

const { signToken } = require("../utils/auth");
const { decodeToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },
    allUsers: async () => {
      return User.find();
    },
    allgoodVibes: async () => {
      return goodVibes.find();
    },
    goodVibe: async (parent, { _id }) => {
      return goodVibes.findById(_id);
    },

  },

  Mutation: {
    createUser: async function (parent, { username, email, password }) {
      const user = await User.create({  username, email, password });
      if (!user) {
        throw new Error("Failed to create user.");
      }
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async function(parent, { _id, username, email, goodVibesList }) {
      const user = await User.findByIdAndUpdate(_id, { username, email, goodVibesList }, { new: true });
      if (!user) {
        throw new Error("Failed to update user.");
      }
      return user;
    },

    removeUser: async function (parent, args, context) {
      const removedUser = await User.findByIdAndDelete(args._id);
      if (!removedUser) {
        throw new Error("User not found");
      }
      return removedUser;
    },
   

    loginAsUser: async function (parent, { username, password }) {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        throw new Error("Failed to login as user.");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password.");
      }
      const token = signToken(user);
      return { token, user };
    },

    addgoodVibes: async function(parent, { savedgoodVibes }) {
      const goodVibe = await goodVibes.create(savedgoodVibes);
      if (!goodVibe) {
        throw new Error("Failed to create good vibe.");
      }
      return goodVibe;
    },
  },
};

module.exports = resolvers;
