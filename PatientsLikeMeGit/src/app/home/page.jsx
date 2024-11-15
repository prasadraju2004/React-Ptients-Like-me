"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function BlogDashboard() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [tag, setTag] = useState(""); // State for selected tag
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const router = useRouter();

  useEffect(() => {
    fetchBlogPosts(); // Fetch blog posts when the component mounts
  }, []); // Empty dependency array ensures this runs once

  const fetchBlogPosts = async () => {
    try {
      // Construct the URL based on tag and searchQuery
      const queryParams = [];
      if (tag) queryParams.push(`tag=${tag}`);
      if (searchQuery) queryParams.push(`query=${searchQuery}`);

      const url = queryParams.length > 0 ? `/api/blogposts?${queryParams.join("&")}` : "/api/blogposts";

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBlogPosts(data.data); // Set the fetched blog posts to state
      } else {
        setBlogPosts([]); // Reset blog posts if fetching failed
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error); // Log any errors
      setBlogPosts([]); // Reset blog posts on error
    }
  };

  const handleRead = (post) => {
    localStorage.setItem("blog_id", post.blog_id); // Store the blog ID in local storage
    router.push(`/blog?blog_id=${post.blog_id}`); // Redirect to the blog post page
  };

  const handleAddBlog = () => {
    router.push("/blogform"); // Navigate to the blog form page
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Blog Dashboard</h1>
      </header>

      {/* Search and Filter Section */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <select value={tag} onChange={(e) => setTag(e.target.value)}> // Update tag state
          <option value="">All Tags</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Mental Health">Mental Health</option>
          {/* Add more tags as needed */}
        </select>
        <button onClick={fetchBlogPosts}>Search</button>
      </div>

      {/* Button to Open the Blog Form */}
      <button className={styles.addBlogButton} onClick={handleAddBlog}>
        Add Your Own Blog
      </button>

      {/* Blog Posts List */}
      <div className={styles.blogList}>
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post._id} className={styles.blogItem}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span>Tags: {post.tags.join(", ")}</span>
              <button onClick={() => handleRead(post)}>Read More</button>
            </div>
          ))
        ) : (
          <p>No blog posts found</p>
        )}
      </div>
    </div>
  );
}
