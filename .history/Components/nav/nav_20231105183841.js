function NavComponent() {
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
