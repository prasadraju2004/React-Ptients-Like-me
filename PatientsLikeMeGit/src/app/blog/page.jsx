"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

const Blog = () => {
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blog_id = localStorage.getItem("blog_id");
      console.log('blog_id is:', blog_id);

      if (blog_id) {
        fetch(`/api/blog?blog_id=${blog_id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Check for success and adjust the data extraction
            if (data && data.success) {
              setPost(data.data); // Assuming your API returns data in { success: true, data: post }
            } else {
              console.error('Blog post data is missing:', data);
            }
          })
          .catch(error => console.error('Error fetching blog post:', error));
      }
    }
  }, []);

  // Display loading or error state
  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* Image Placeholder */}
      <div className={styles.imageContainer}>
        <Image 
          src="/patient.png" 
          alt="Blog visual representation" 
          width={600} 
          height={200}
          className={styles.image} 
        />
        {/* Text Overlay */}
        <div className={styles.textOverlay}>
          {post.title}
        </div>
      </div>
      <p className={styles.date}>{new Date(post.date).toLocaleDateString()}</p>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <div className={styles.content}>{post.content}</div>
      <div className={styles.tags}>
        <strong>Tags:</strong>
        <ul className={styles.tagList}>
          {Array.isArray(post.tags) && post.tags.length > 0 ? (
            post.tags.map((tag, index) => (
              <li key={index} className={styles.tagItem}>#{tag}</li>
            ))
          ) : (
            <li>No tags available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
