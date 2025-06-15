import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // latestMessage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Message",
    // },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

chatSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
