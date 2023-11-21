import React from "react";
import "./Auth.css";
import { getAuth, signOut } from "firebase/auth";
import { handleAuthError } from "../../utils/error.handler";

const SignOut: React.FC = () => {
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth).catch((error) => handleAuthError(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="button" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
