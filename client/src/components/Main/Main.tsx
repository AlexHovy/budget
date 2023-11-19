import { getCategories } from "../../services/category.service";
import EmailAuth from "../Auth/EmailAuth";
import GithubAuth from "../Auth/GithubAuth";
import GoogleAuth from "../Auth/GoogleAuth";
import "./Main.css";

function Main() {
  return (
    <div className="App-main">
      <EmailAuth />
      <GithubAuth />
      <GoogleAuth />
      <button onClick={getCategories}>Get Categories</button>
    </div>
  );
}

export default Main;
