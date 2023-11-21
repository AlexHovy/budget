import React, { useState } from "react";
import { AuthProvider } from "firebase/auth";
import { providerMap } from "./SignIn";

interface EmailSignInProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSignIn: (provider: AuthProvider) => Promise<void>;
}

const EmailSignIn: React.FC<EmailSignInProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
}) => {
  const [usePassword, setUsePassword] = useState(false);

  const togglePasswordMode = () => {
    setUsePassword(!usePassword);
    setPassword("");
  };

  return (
    <div className="other-providers-sign-in">
      <input
        className="input-field"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {usePassword && (
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <button
        className="button Email"
        onClick={() => handleSignIn(providerMap.Email)}
      >
        {usePassword
          ? "Sign in/up with Email and Password"
          : "Sign in with Email"}
      </button>
      <button className="button toggle" onClick={togglePasswordMode}>
        {usePassword ? "Use Email-only Sign In" : "Use Password Sign In/Up"}
      </button>
    </div>
  );
};

export default EmailSignIn;
