import React, { useEffect, useState } from "react";
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

const providerMap = {
  Email: new EmailAuthProvider(),
  Google: new GoogleAuthProvider(),
  GitHub: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
  Twitter: new TwitterAuthProvider(),
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailFromStorage = window.localStorage.getItem("emailForSignIn");
      if (emailFromStorage) {
        signInWithEmailLink(auth, emailFromStorage, window.location.href).catch(
          (error) => handleAuthError(error)
        );
      }
    }
  }, [auth]);

  const handleSignIn = async (provider: AuthProvider) => {
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
            window.localStorage.setItem("emailForSignIn", email);
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

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {Object.entries(providerMap).map(([providerName, provider]) => (
        <button key={providerName} onClick={() => handleSignIn(provider)}>
          Sign in with {providerName}
        </button>
      ))}
    </div>
  );
};

export default SignIn;
