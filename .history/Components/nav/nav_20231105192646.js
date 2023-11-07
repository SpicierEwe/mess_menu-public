import Image from "next/image";

import styles from "./nav.module.css";

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/Firebase/firebase";
import { useState, useRef, useEffect } from "react";

function NavComponent() {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [is_dropdown_open, set_is_dropdown_open] = useState(false);
  const dropdownRef = useRef(null);

  // Function to handle clicks outside the dropdown
  if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target) &&
    event.target !== document.querySelector(`.${styles.user_photo}`)
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
      <nav className={styles.nav}>
        <li>LOGO</li>

        <li>
          <button
            onClick={() => {
              auth.signOut();
            }}
          >
            LOG OUT
          </button>
        </li>

        <div className={styles.photo_and_drop_down_container}>
          <li
            className={styles.user_photo_container}
            onClick={() => {
              set_is_dropdown_open(!is_dropdown_open);
            }}
          >
            <Image
              className={styles.user_photo}
              src={user.photoURL}
              alt="user_photo"
              height="50"
              width="50"
            ></Image>
          </li>

          {/* LOGOUT DROPDOWN */}
          <div
            ref={dropdownRef}
            className={`${styles.drop_down_container} ${
              is_dropdown_open ? styles.show_drop_down_container : null
            }`}
          >
            <p>Log Out</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavComponent;
