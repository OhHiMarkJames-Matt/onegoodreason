const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { decodeToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allUser: async () => {
      return User.find();
  
    },
  },

  Mutation: {
    // ---------------------------------- Volunteer Mutations ----------------------------------
    createUser: async function (parent, { username, email, password }) {
      const user = await User.create({  username, email, password  });

      if (!user) {
        throw new Error("Failed to create volunteer.");
      }
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async function (parent, args, context) {
      // Find and remove the event from the Events collection
      const removedUser = await User.findByIdAndDelete(args._id);
      if (!removedUser) {
        throw new Error("Event not found");
      }
      return removedUser;
    },

 
    // ---------------------------------- Authentication Mutations ----------------------------------
    loginAsUser: async function (parent, args) {
      const userv = await User.findOne({
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
        throw new Error("Failed to login as volunteer.");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
      }
      const token = signToken(user);
      return { token, user };
    },

   
    // ---------------------------------- Evnet Mutations -------------------------------------------
   
  },
};

module.exports = resolvers;
