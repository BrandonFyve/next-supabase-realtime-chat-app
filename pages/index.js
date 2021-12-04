import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({ session, supabase }) {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    setLoggedIn(!!session);
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Supabase chat app</title>
      </Head>

      <main className={styles.main}>
        {loggedIn ? <span>Logged in</span> : <span>Not logged in</span>}
      </main>
    </div>
  );
}
