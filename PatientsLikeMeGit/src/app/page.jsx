"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component
import styles from "./page.module.css";

const Page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
    console.log('button clicked');
  };

  return (
    <div className={styles.container}>
      {/* Add your logo or image here using the Image component */}
      <Image 
        src="/logo.png" // Path to your logo
        alt="Logo" 
        width={250} // Adjust the width as needed
        height={150} // Adjust the height as needed
        className={styles.logo} 
      />
      <div className={styles.buttonContainer}>
        <h1>Patients Like Me</h1>
        <button onClick={handleClick} className={styles.enterButton}>
          Enter Blog Page
        </button>
      </div>
    </div>
  );
};

export default Page;
