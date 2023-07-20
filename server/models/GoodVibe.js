const { Schema, DataTypes, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const goodVibeSchema = new Schema({
  reason: [
    {
      type: String,
      required: false
    },
  ],
  author_id: {
    type: DataTypes.ObjectId,
    required: true,
    references: {
      model: 'user',
      key: 'id',
    },
  },
});

const GoodVibe = model('GoodVibe', goodVibeSchema);

module.exports = GoodVibe;