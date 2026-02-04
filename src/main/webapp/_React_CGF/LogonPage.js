"use strict";

function LogonPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [userData, setUserData] = React.useState(null);

  function logonClick() {
    const url =
      "/webUser/logonAPI?email=" +
      encodeURIComponent(email) +
      "&password=" +
      encodeURIComponent(password);

    ajax_alt(
      url,
      function (obj) {
        if (obj.errorMsg && obj.errorMsg.length > 0) {
          setMsg(obj.errorMsg);
          setUserData(null);
        } else {
          setMsg("Logged in successfully!");
          setUserData(obj);
        }
      },
      function (errMsg) {
        setMsg("AJAX failure: " + errMsg);
      }
    );
  }

  return React.createElement(
    "div",
    { className: "logon-container" },
    React.createElement("h2", null, "Log On"),
    React.createElement("label", null, "Email"),
    React.createElement("input", {
      type: "email",
      placeholder: "Enter your email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    }),
    React.createElement("label", null, "Password"),
    React.createElement("input", {
      type: "password",
      placeholder: "Enter your password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    }),
    React.createElement("button", { onClick: logonClick }, "Log In"),
    msg && React.createElement("div", { className: "logon-msg" }, msg),
    userData &&
      React.createElement(
        "div",
        { className: "user-info" },
        React.createElement("h3", null, "Welcome ", userData.userEmail),
        React.createElement(
          "ul",
          null,
          Object.entries(userData).map(([key, value]) => {
            if (key === "userImage") return null;
            return React.createElement("li", { key }, key + ": " + value);
          })
        ),
        userData.userImage &&
          React.createElement("img", {
            src: userData.userImage,
            alt: "Profile",
            style: { maxWidth: "150px", marginTop: "10px" },
          })
      )
  );
}