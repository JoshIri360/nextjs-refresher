import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
