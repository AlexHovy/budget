import React from "react";
import { AuthProvider } from "firebase/auth";

interface OtherProvidersSignInProps {
  sortedProviderMap: [string, AuthProvider][];
  handleSignIn: (provider: AuthProvider) => Promise<void>;
}

const OtherProvidersSignIn: React.FC<OtherProvidersSignInProps> = ({
  sortedProviderMap,
  handleSignIn,
}) => {
  return (
    <div className="other-providers-sign-in">
      {sortedProviderMap.map(([providerName, provider]) => (
        <button className={`button ${providerName}`} key={providerName} onClick={() => handleSignIn(provider)}>
          Sign in with {providerName}
        </button>
      ))}
    </div>
  );
};

export default OtherProvidersSignIn;
