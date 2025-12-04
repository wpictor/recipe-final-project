import mongoose, { Schema } from 'mongoose'
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: { type: String },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
)
export const Post = mongoose.model('post', postSchema)
