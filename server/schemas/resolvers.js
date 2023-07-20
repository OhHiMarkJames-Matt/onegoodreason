const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { decodeToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allUser: async () => {
      return User.find();
    },

    user: async (parent, { _id }, context) => {
      return User.findOne({ _id: _id }).populate("goodVibesList");
    }
  },

  Mutation: {
    // ---------------------------------- User Mutations ----------------------------------
    createUser: async function (parent, { username, email, password }) {
      const user = await User.create({  username, email, password  });

      if (!user) {
        throw new Error("Failed to create user.");
      }
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async function (parent, args, context) {
      // Find and remove the user from the Users collection
      const removedUser = await User.findByIdAndDelete(args._id);
      if (!removedUser) {
        throw new Error("User not found");
      }
      return removedUser;
    },
    updateUser: async function (parent, args) {
      const { _id, username, email, goodvibesList } = args;
      const updateUser = await User.findByIdAndUpdate(
        _id,
        { username, email, goodvibesList },
        { new: true } // Return the updated document
      );

      if (!updateUser) {
        throw new Error("User not found");
      }

      return updateUser;
    },

 
    // ---------------------------------- Authentication Mutations ----------------------------------
    loginAsUser: async function (parent, args) {
      const user = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        throw new Error("Failed to login as user.");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
      }
      const token = signToken(user);
      return { token, user };
    },

  },
};

module.exports = resolvers;
