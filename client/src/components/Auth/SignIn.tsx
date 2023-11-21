import React, { useEffect, useState } from "react";
import "./Auth.css";
import {
  AuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  linkWithPopup,
  EmailAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  ActionCodeSettings,
} from "firebase/auth";
import { handleAuthError } from "../../utils/error.handler";
import { LocalStorageService } from "../../services/local-storage.service";
import { LocalStorageKeys } from "../../constants/local-storage-keys";
import EmailSignIn from "./EmailSignIn";
import OtherProvidersSignIn from "./OtherProvidersSignIn";

export const providerMap = {
  Google: new GoogleAuthProvider(),
  GitHub: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
  Twitter: new TwitterAuthProvider(),
  Email: new EmailAuthProvider(),
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailFromStorage = LocalStorageService.get<string>(
        LocalStorageKeys.EmailForSignIn
      );
      if (emailFromStorage) {
        signInWithEmailLink(auth, emailFromStorage, window.location.href)
          .then((result) => {
            LocalStorageService.remove(LocalStorageKeys.EmailForSignIn);
          })
          .catch((error) => handleAuthError(error));
      }
    }
  }, [auth]);

  const handleSignIn = async (provider: AuthProvider) => {
    LocalStorageService.set<string>(
      LocalStorageKeys.SignInProviderId,
      provider.providerId
    );

    if (provider.providerId === EmailAuthProvider.PROVIDER_ID) {
      if (password) {
        signInWithEmailAndPassword(auth, email, password).catch((error) => {
          if (error.code === "auth/user-not-found") {
            createUserWithEmailAndPassword(auth, email, password).catch(
              (error) => handleAuthError(error)
            );
          } else {
            handleAuthError(error);
          }
        });
      } else {
        const actionCodeSettings: ActionCodeSettings = {
          handleCodeInApp: true,
          url: window.location.href,
        };
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
          .then((result) => {
            LocalStorageService.set<string>(
              LocalStorageKeys.EmailForSignIn,
              email
            );
          })
          .catch((error) => handleAuthError(error));
      }
    } else {
      signInWithPopup(auth, provider).catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          linkWithPopup(auth.currentUser!, provider).catch((error) =>
            handleAuthError(error)
          );
        } else {
          handleAuthError(error);
        }
      });
    }
  };

  const previousProviderId = LocalStorageService.get<string>(
    LocalStorageKeys.SignInProviderId
  );
  const sortedProviderMap = Object.entries(providerMap)
    .filter(([key, val]) => val.providerId != EmailAuthProvider.PROVIDER_ID)
    .sort(([keyA, valA], [keyB, valB]) =>
      valA.providerId === previousProviderId
        ? -1
        : valB.providerId === previousProviderId
        ? 1
        : 0
    );

  return (
    <div>
      <OtherProvidersSignIn
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

export default SignIn;
