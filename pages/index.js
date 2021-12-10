import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Auth from "../components/Auth";
import Chat from "../components/Chat";

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
        {loggedIn ? (
          <Chat session={session} supabase={supabase} />
        ) : (
          <Auth supabase={supabase} />
        )}
      </main>
    </div>
  );
}
