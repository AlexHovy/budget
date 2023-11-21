import { getCategories } from "../../services/CategoryService";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <button onClick={getCategories}>Get Categories</button>
    </div>
  );
}

export default Main;
