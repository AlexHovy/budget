import React, { useCallback, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleSuccessfulAuthentication = useCallback(() => {
    navigate("/protected");
  }, [navigate]);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailFromStorage = LocalStorageService.get<string>(
        LocalStorageKeys.EmailForSignIn
      );
      if (emailFromStorage) {
        signInWithEmailLink(auth, emailFromStorage, window.location.href)
          .then((result) => {
            LocalStorageService.remove(LocalStorageKeys.EmailForSignIn);
            handleSuccessfulAuthentication();
          })
          .catch((error) => handleAuthError(error));
      }
    }
  }, [auth, handleSuccessfulAuthentication]);

  const handleSignIn = useCallback(async (provider: AuthProvider) => {
    LocalStorageService.set<string>(
      LocalStorageKeys.SignInProviderId,
      provider.providerId
    );

    if (provider.providerId === EmailAuthProvider.PROVIDER_ID) {
      if (password) {
        signInWithEmailAndPassword(auth, email, password)
          .then((result) => handleSuccessfulAuthentication())
          .catch((error) => {
            if (error.code === "auth/user-not-found") {
              createUserWithEmailAndPassword(auth, email, password)
                .then((result) => handleSuccessfulAuthentication())
                .catch((error) => handleAuthError(error));
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
      signInWithPopup(auth, provider)
        .then((result) => handleSuccessfulAuthentication())
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            linkWithPopup(auth.currentUser!, provider)
              .then((result) => handleSuccessfulAuthentication())
              .catch((error) => handleAuthError(error));
          } else {
            handleAuthError(error);
          }
        });
    }
  }, [auth, email, password, handleSuccessfulAuthentication]);

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
