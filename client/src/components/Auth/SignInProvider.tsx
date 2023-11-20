import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  linkWithPopup,
  AuthProvider,
  getAuth,
  EmailAuthProvider,
  sendSignInLinkToEmail,
  TwitterAuthProvider,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const providerMap = {
  Email: new EmailAuthProvider(),
  Google: new GoogleAuthProvider(),
  GitHub: new GithubAuthProvider(),
  Facebook: new FacebookAuthProvider(),
  Twitter: new TwitterAuthProvider(),
};

const SignInProvider: React.FC = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      handleEmailSignIn();
    }
  }, []);

  const handleEmailSignIn = async () => {
    const emailFromStorage = window.localStorage.getItem("emailForSignIn");
    if (emailFromStorage) {
      try {
        await signInWithEmailLink(auth, emailFromStorage, window.location.href);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLinkingAccount = async (provider: AuthProvider) => {
    try {
      await linkWithPopup(auth.currentUser!, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async (provider: AuthProvider) => {
    if (provider.providerId === EmailAuthProvider.PROVIDER_ID) {
      await sendSignInLinkToEmail(auth, email, {
        handleCodeInApp: true,
        url: window.location.href,
      });
      window.localStorage.setItem("emailForSignIn", email);
    } else {
      try {
        await signInWithPopup(auth, provider);
      } catch (error: any) {
        if (error.code === "auth/account-exists-with-different-credential") {
          await handleLinkingAccount(provider);
        } else {
          console.error(error);
        }
      }
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
      {Object.entries(providerMap).map(([providerName, provider]) => (
        <button key={providerName} onClick={() => handleSignIn(provider)}>
          Sign in with {providerName}
        </button>
      ))}
    </div>
  );
};

export default SignInProvider;
