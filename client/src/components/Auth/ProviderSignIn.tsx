import React from "react";
import { AuthProvider } from "firebase/auth";
import Button from "../Button/Button";

interface ProviderSignInProps {
  sortedProviderMap: [string, AuthProvider][];
  handleSignIn: (provider: AuthProvider) => Promise<void>;
}

const ProviderSignIn: React.FC<ProviderSignInProps> = ({
  sortedProviderMap,
  handleSignIn,
}) => {
  return (
    <div className="provider-sign-in">
      {sortedProviderMap.map(([providerName, provider]) => (
        <Button
          key={providerName}
          className={`sign-in-button ${providerName}`}
          onClick={() => handleSignIn(provider)}
        >
          Sign in with {providerName}
        </Button>
      ))}
    </div>
  );
};

export default ProviderSignIn;
