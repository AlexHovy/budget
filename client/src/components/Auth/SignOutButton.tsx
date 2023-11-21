import React from "react";
import "./Auth.css";
import { AuthService } from "../../services/AuthService";

const SignOutButton: React.FC = () => {
  const authService = new AuthService();

  const handleSignOut = async () => {
    await authService.signOut();
  };

  return (
    <button className="button SignOut" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
