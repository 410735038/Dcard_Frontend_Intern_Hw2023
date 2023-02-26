import { useEffect } from "react";
import "./App.css";

const CLIENT_ID = "118237d1625ed4d4c851";
function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
  }, []);
  const loginGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };
  return (
    <div>
      <header>
        <button onClick={loginGithub}>Login</button>
      </header>
    </div>
  );
}

export default App;
