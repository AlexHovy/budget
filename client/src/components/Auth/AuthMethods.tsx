import React, { useEffect, useState } from "react";
import "./Auth.css";
import {
  AuthProvider,
  EmailAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { LocalStorageService } from "../../services/LocalStorageService";
import { LocalStorageKeys } from "../../constants/LocalStorageKeys";
import EmailSignIn from "./EmailSignIn";
import ProviderSignIn from "./ProviderSignIn";
import { AuthService } from "../../services/AuthService";

export const providerMap = {
  Google: new GoogleAuthProvider(),
  GitHub: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
  Twitter: new TwitterAuthProvider(),
  Email: new EmailAuthProvider(),
};

const AuthMethods: React.FC = () => {
  const authService = new AuthService();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    authService.checkSignInWithEmailLink();
  }, [authService]);

  const handleSignIn = async (provider: AuthProvider) => {
    LocalStorageService.set<string>(
      LocalStorageKeys.SignInProviderId,
      provider.providerId
    );
    if (provider.providerId === EmailAuthProvider.PROVIDER_ID) {
      if (password) {
        await authService.signInWithEmail(email, password);
      } else {
        await authService.sendSignInLink(email);
      }
    } else {
      await authService.signInWithProvider(provider);
    }
  };

  const previousProviderId = LocalStorageService.get<string>(
    LocalStorageKeys.SignInProviderId
  );
  const sortedProviderMap = Object.entries(providerMap)
    .filter(([key, val]) => val.providerId !== EmailAuthProvider.PROVIDER_ID)
    .sort(([keyA, valA], [keyB, valB]) =>
      valA.providerId === previousProviderId
        ? -1
        : valB.providerId === previousProviderId
        ? 1
        : 0
    );

  return (
    <div>
      <ProviderSignIn
        sortedProviderMap={sortedProviderMap}
        handleSignIn={handleSignIn}
      />
      <EmailSignIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSignIn={handleSignIn}
      />
    </div>
  );
};

export default AuthMethods;
