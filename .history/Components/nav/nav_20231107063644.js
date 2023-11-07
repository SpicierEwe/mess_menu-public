"use client";

import Image from "next/image";

import styles from "./nav.module.css";

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MobileSideMenu from "./mobile_nav/mobile_nav";
import { HiMenuAlt3 } from "react-icons/hi";

function NavComponent(props) {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [is_mobile_menu_open, set_is_mobile_menu_open] = useState(false);

  const [is_dropdown_open, set_is_dropdown_open] = useState(false);
  const dropdownRef = useRef(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target !== document.querySelector(`.${styles.user_photo_container}`)
    ) {
      set_is_dropdown_open(false);
    }
  };

  // Attach click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={styles.nav_container}>
        <nav className={styles.nav}>
          <div className={styles.container_1}>
            <Link href={"/"}>
              <li>
                <Image
                  src="/images/logo/company_logo.png"
                  alt="logo"
                  height="70"
                  width="70"
                ></Image>
              </li>
            </Link>
            <li>
              <p className={styles.app_name}>MESS MENU</p>
            </li>
          </div>

          {/* CONTAINER 2  */}
          <div className={styles.container_2}>
            <div className={styles.desktop_buttons}>
              <Link href={"/"}>
                <li className={styles.button}>
                  <p>Home</p>
                </li>
              </Link>
              <Link href={"/legal/about_us"}>
                <li className={styles.button}>
                  <p>About us</p>
                </li>
              </Link>
            </div>

            {/* mobile side menu icon and menu */}
            {/* mobile side menu icon and menu */}
            <MobileSideMenu isMenuOpen={is_mobile_menu_open}></MobileSideMenu>
            <li>
              <HiMenuAlt3 size={25} />
            </li>
            <div className={styles.photo_and_drop_down_container}>
              <div
                className={styles.user_info_container}
                onClick={() => {
                  set_is_dropdown_open(!is_dropdown_open);
                }}
              >
                <li className={styles.user_photo_container}>
                  <Image
                    className={styles.user_photo}
                    src={user?.photoURL}
                    alt="user_photo"
                    height="50"
                    width="50"
                  ></Image>{" "}
                </li>

                <p className={styles.displayName}>{user["displayName"]}</p>
              </div>

              {/* LOGOUT DROPDOWN */}
              <div
                ref={dropdownRef}
                className={`${styles.drop_down_container} ${
                  is_dropdown_open ? styles.show_drop_down_container : null
                }`}
              >
                <p
                  onClick={() => {
                    auth.signOut();
                    set_is_dropdown_open(false);
                  }}
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className={styles.nav_bar_height_balancer}></div>
      {props.children}
    </div>
  );
}

export default NavComponent;
