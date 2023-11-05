"use client";

import { initFirebase } from "@/Firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInComponent from "../sign_in/sign_in";
import LoadingScreenComponent from "@/components/loading_screen/loading_screen";

import {
  getDatabase,
  ref,
  set,
  update,
  push,
  child,
  get,
} from "firebase/database";

// Create an HOC named "withAuth" to handle authentication check
// and pass the authenticated state as a prop to the wrapped component.

export default function AuthValidatorWrapper(props) {
  const app = initFirebase();
  const auth = getAuth();
  const db = getDatabase();

  const save_user_info = (user) => {
    get(ref(db, "users/" + user.uid + "/user_info")).then((snapshot) => {
      if (snapshot.exists()) {
        // if the user info is not updated in the database, then update it
        const data = snapshot.val();
        if (
          data.name !== user.displayName ||
          data.email !== user.email ||
          data.photoUrl !== user.photoURL ||
          data.uid !== user.uid
        ) {
          set(ref(db, "users/" + user.uid + "/user_info"), {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            uid: user.uid,
          });
        }
      }
      // if the user info is not present in the database, then add it
      else {
        set(ref(db, "users/" + user.uid + "/user_info"), {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          uid: user.uid,
        });
      }
    });
  };

  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <LoadingScreenComponent />;
  }
  if (error) {
    return <div>error...</div>;
  }
  if (!user) {
    return <SignInComponent />;
  }
  if (user) {
    save_user_info(user);
    return <div>{props.children}</div>;
  }
}
