import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  linkWithPopup,
  AuthProvider,
  getAuth,
  signOut,
} from "firebase/auth";
import { LocalStorageService } from "./LocalStorageService";
import { LocalStorageKeys } from "../constants/LocalStorageKeys";
import { handleError } from "../utils/ErrorHandlerUtil";

export class AuthService {
  private auth = getAuth();
  private navigate = useNavigate();

  handleSuccessfulAuthentication = () => {
    this.navigate("/protected");
  };

  signOut = async () => {
    try {
      await signOut(this.auth);
      this.navigate("/");
    } catch (error: any) {
      handleError(error);
    }
  };

  signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.handleSuccessfulAuthentication();
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        await this.createUser(email, password);
      } else {
        handleError(error);
      }
    }
  };

  createUser = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.handleSuccessfulAuthentication();
    } catch (error: any) {
      handleError(error);
    }
  };

  sendSignInLink = async (email: string) => {
    const actionCodeSettings = {
      handleCodeInApp: true,
      url: window.location.href,
    };
    try {
      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
      LocalStorageService.set<string>(LocalStorageKeys.EmailForSignIn, email);
    } catch (error: any) {
      handleError(error);
    }
  };

  signInWithProvider = async (provider: AuthProvider) => {
    try {
      await signInWithPopup(this.auth, provider);
      this.handleSuccessfulAuthentication();
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential") {
        await this.linkWithProvider(provider);
      } else {
        handleError(error);
      }
    }
  };

  linkWithProvider = async (provider: AuthProvider) => {
    try {
      await linkWithPopup(this.auth.currentUser!, provider);
      this.handleSuccessfulAuthentication();
    } catch (error: any) {
      handleError(error);
    }
  };

  checkSignInWithEmailLink = async () => {
    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      const emailFromStorage = LocalStorageService.get<string>(
        LocalStorageKeys.EmailForSignIn
      );
      if (emailFromStorage) {
        try {
          await signInWithEmailLink(
            this.auth,
            emailFromStorage,
            window.location.href
          );
          LocalStorageService.remove(LocalStorageKeys.EmailForSignIn);
          this.handleSuccessfulAuthentication();
        } catch (error: any) {
          handleError(error);
        }
      }
    }
  };
}
