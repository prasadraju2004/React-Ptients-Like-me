import dbConnect from "@/lib/dbConnect.js";
import BlogPost from "@/models/BlogPost";

export default async function handler(req, res) {
    await dbConnect(); // Establish a connection to the database

    if (req.method === "GET") {
        const { blog_id } = req.query; // Get the blog_id from query parameters
        console.log('Fetching post with blog_id:', blog_id);

        try {
            const post = await BlogPost.findOne({ blog_id }); // Search for the blog post
            if (!post) {
                return res.status(404).json({ success: false, error: 'Blog post not found' });
            }
            res.status(200).json({ success: true, data: post }); // Return the found post
        } catch (error) {
            console.error("Error fetching blog post:", error); // Log the error for debugging
            res.status(500).json({ success: false, error: 'Failed to load blog post' });
        }
    } else if (req.method === "POST") {
        const { title, excerpt, content, tags, date } = req.body;

        // Validate the data
        if (!title || !excerpt || !content || !tags) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        // Process tags safely
        const tagsArray = Array.isArray(tags) 
            ? tags.map(tag => tag.trim()) 
            : typeof tags === 'string' 
                ? tags.split(",").map(tag => tag.trim()) 
                : []; // Default to an empty array if tags are not a valid string or array

        try {
            // Create a new blog post
            const newPost = new BlogPost({
                blog_id: `blog${Date.now()}`, // Assign a unique ID
                title,
                excerpt,
                content,
                tags: tagsArray,
                date: date || new Date(),
            });

            // Save the new post to the database
            await newPost.save();
            res.status(201).json({ success: true, data: newPost }); // Respond with the created post
        } catch (error) {
            console.error("Error creating blog post:", error);
            res.status(500).json({ success: false, error: 'Failed to create blog post' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
