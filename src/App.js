import { useEffect, useState } from "react";
import "./App.css";

const CLIENT_ID = "118237d1625ed4d4c851";
function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
          method: "GET",
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender((prev) => !prev);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
      });
  }

  const loginGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };
  return (
    <div>
      <header>
        {localStorage.getItem("accessToken") ? (
          <>
            <h1>Token!</h1>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                setRerender(!rerender);
              }}
            >
              Logout
            </button>
            <h3>Get user data</h3>
            <button onClick={getUserData}>Get Data</button>
            {Object.keys(userData).length !== 0 ? (
              <>
                <h4>Hey! {userData.login}</h4>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <h3>plz login first</h3>
            <button onClick={loginGithub}>Login</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
