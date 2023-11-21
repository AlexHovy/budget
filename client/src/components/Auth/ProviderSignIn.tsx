import React from "react";
import { AuthProvider } from "firebase/auth";

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
        <button
          className={`button ${providerName}`}
          key={providerName}
          onClick={() => handleSignIn(provider)}
        >
          Sign in with {providerName}
        </button>
      ))}
    </div>
  );
};

export default ProviderSignIn;
