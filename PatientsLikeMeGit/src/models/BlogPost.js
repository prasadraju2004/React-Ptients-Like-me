// models/BlogPost.js
import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  blog_id :{ type:String, required:true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema,"blogs");
