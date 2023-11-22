import React, { useState } from "react";
import { AuthProvider } from "firebase/auth";
import { providerMap } from "./AuthMethods";
import Button from "../Button/Button";
import Input from "../Input/Input";

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

  const isSignInDisabled = email === "" || (usePassword && password === "");

  return (
    <div className="provider-sign-in">
      <Input
        className="sign-in-input-field"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      {usePassword && (
        <Input
          className="sign-in-input-field"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      )}
      <Button
        className="sign-in-button Email"
        onClick={() => handleSignIn(providerMap.Email)}
        disabled={isSignInDisabled}
      >
        {usePassword
          ? "Sign in/up with Email and Password"
          : "Sign in with Email"}
      </Button>
      <Button className="sign-in-button toggle" onClick={togglePasswordMode}>
        {usePassword ? "Use Email-only Sign In" : "Use Password Sign In/Up"}
      </Button>
    </div>
  );
};

export default EmailSignIn;
