import dbConnect from "@/lib/dbConnect.js";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
  // Connect to the database
  await dbConnect();

  // Handle GET requests
  if (req.method === "GET") {
    const { tag, query } = req.query; // Destructure tag and query from request parameters

    const filter = {}; // Initialize filter object for querying

    // Add filters based on query parameters
    if (tag) {
      filter.tags = tag; // Filter by specific tag
    }
    if (query) {
      filter.title = new RegExp(query, "i"); // Create a case-insensitive regex for title search
    }

    try {
      // Fetch blog posts from the database based on the filters
      const blogPosts = await BlogPost.find(filter);

      // Respond with success and the fetched blog posts
      return res.status(200).json({ success: true, data: blogPosts });
    } catch (error) {
      console.error("Error fetching blog posts:", error); // Log error for debugging
      return res.status(500).json({ success: false, message: "Failed to load blog posts" });
    }
  }

  // Handle unsupported HTTP methods
  res.setHeader("Allow", ["GET"]); // Specify allowed methods
  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
