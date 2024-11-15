"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const BlogForm = ({ onClose }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To track error messages
  const [successMessage, setSuccessMessage] = useState(""); // To track success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    const newPost = {
      blog_id: `blog${Date.now()}`, // Simple unique ID
      title,
      excerpt,
      content,
      tags: tags.split(",").map(tag => tag.trim()), // Convert comma-separated tags into an array
      date: new Date(),
    };

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Blog post created successfully!"); // Set success message
        handleCancel(); // Close the form after submission
      } else {
        setErrorMessage(data.error || "Failed to create blog post."); // Set error message
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      setErrorMessage("An error occurred while creating the blog post."); // Set error message
    }
  };

  const handleCancel = () => {
    router.push("/home"); // Redirect to home page if needed
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add a New Blog Post</h2>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Excerpt:</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.formButton}>Submit</button>
        <button type="button" className={styles.formButton} onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default BlogForm;
