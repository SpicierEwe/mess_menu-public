import React from "react";
import styles from "./about_us.module.css";
import NavComponent from "@/Components/nav/nav";
import Image from "next/image";
import { GoPerson } from "react-icons/go";

function AboutUsComponent() {
  const creators = [
    {
      name: "Hammad Bin Tayyab",
      role: "Project Manager",
      image: "",
    },
  ];
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
            by letting students collectively decide their meals. This eleminates
            any sort of bias and ensures that the menu is fair for everyone.
          </p>
          <h2>Creators</h2>
          <div className={styles.creator}>
            <div className={styles.creator_1} key={0}>
              <Image
                src={creators[0].image}
                alt={creators[0].name}
                height={100}
                width={100}
                className={styles.creatorImage}
              />
              <div className={styles.creator_info}>
                <p className={styles.creator_name}>{creators[0].name}</p>
                <p className={styles.creator_role}>-{creators[0].role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsComponent;
