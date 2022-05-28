/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

export const View = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log("-----api called");
    // fetch("/api").then((data) => {
    //   console.log("-----data", data);
    //   return setData(data);
    // });
    axios
      .post(
        "/api",
        { name: "anshuman", age: 25 },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        console.log("------data", data);
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data.user}</p>
      </header>
    </div>
  );
};
