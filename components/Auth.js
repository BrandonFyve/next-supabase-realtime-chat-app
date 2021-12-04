import React from "react";

const Auth = ({ supabase }) => {
  const signInWithGitHub = () => {
    supabase.auth.signIn({ provider: "github" });
  };

  return (
    <div>
      <button onClick={signInWithGitHub}>Sign in with GitHub</button>
    </div>
  );
};

export default Auth;
