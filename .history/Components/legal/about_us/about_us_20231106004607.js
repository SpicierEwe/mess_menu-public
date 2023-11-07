import React from "react";
import styles from "./about_us.module.css";
import NavComponent from "@/Components/nav/nav";
import Image from "next/image";

function AboutUsComponent() {
  return (
    <div className={styles.bg}>
      <NavComponent />
      <div className={styles.aboutProjectPage}>
        <div className={styles.header}>
          <h1>MESS MENU</h1>
        </div>
        <div className={styles.content}>
          <p>
            Welcome to our &quot;Mess Menu&quot; project! We&apos;re excited to
            share our innovative solution for helping college students choose
            their daily meals more conveniently.
          </p>
          <h2>Mess Menu Poll</h2>
          <p>
            Mess Menu Poll is a web application that allows students to vote on
            the daily cafeteria menu. It simplifies the decision-making process
            by letting students collectively decide what&apos;s for lunch or
            dinner. This eleminates any sort of bias and ensures that the menu
            is fair for everyone.
          </p>
          <h2>Creators</h2>
          <div className={styles.creator}>
            <Image
              src="/creator1.jpg"
              alt="Creator 1"
              height={100}
              width={100}
              className={styles.creatorImage}
            />
            <p>
              John Doe
              <br />
              Software Engineer
            </p>
          </div>
          <div className={styles.creator}>
            <img
              src="creator2.jpg"
              alt="Creator 2"
              className={styles.creatorImage}
            />
            <p>
              Jane Smith
              <br />
              UI/UX Designer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsComponent;
