import { getCategories } from "../../services/category.service";
import SignIn from "../Auth/SignIn";
import "./Main.css";

function Main() {
  return (
    <div className="App-main">
      <SignIn />
      <button onClick={getCategories}>Get Categories</button>
    </div>
  );
}

export default Main;
