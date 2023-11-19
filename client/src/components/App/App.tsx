import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import FirebaseConfig from "../../config/firebase.config";

class App extends React.Component {
  constructor(props: any) {
    super(props);

    new FirebaseConfig();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
