import { getCategories } from "../../services/category.service";
import AuthProvider from "../Auth/SignInProvider";
import "./Main.css";

function Main() {
  return (
    <div className="App-main">
      <AuthProvider />
      <button onClick={getCategories}>Get Categories</button>
    </div>
  );
}

export default Main;
