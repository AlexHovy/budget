import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const GithubAuth = () => {
  const auth = getAuth();

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <button onClick={signInWithGithub}>Sign in with GitHub</button>;
};

export default GithubAuth;
