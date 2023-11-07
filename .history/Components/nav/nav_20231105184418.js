import Image from "next/image";

import styles from "./nav.module.css";

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { initFirebase } from "@/Firebase/firebase";

function NavComponent() {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
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

        <li className={styles.user_photo_container}>
          <Image
            className={styles.user_photo}
            src={user.photoURL}
            alt="user_photo"
            height="50"
            width="50"
          ></Image>
        </li>
      </nav>
    </div>
  );
}

export default NavComponent;
