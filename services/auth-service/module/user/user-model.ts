import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    userName: { type: String },
    password: { type: String },
  },
  {
    // Mongoose adds createdAt and updatedAt properties to your schema
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove the _id field and add the id field
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        // Remove the _id field and add the id field
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export default model('users', userSchema);
