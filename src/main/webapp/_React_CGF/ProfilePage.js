"use strict";

function UserInfoDisplay({ userData }) {
  if (!userData) return null;

  return React.createElement(
    "div",
    { className: "user-info" },
    React.createElement("h3", null, "Welcome ", userData.userEmail || (userData.firstName + " " + userData.lastName)),
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
  );
}

function ProfilePage() {
  const [userData, setUserData] = React.useState(null);
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const url = "/webUser/getProfileAPI";

    ajax_alt(
      url,
      function(obj) {
        console.log("API response:", obj);
        if (!obj || (obj.errorMsg && obj.errorMsg.length > 0)) {
          setMsg((obj && obj.errorMsg) || "Cannot show profile -- no user logged in");
          setUserData(null);
        } else {
          setUserData(obj);
          setMsg("");
        }
      },
      function(errMsg) {
        console.error("AJAX failure:", errMsg);
        setMsg("AJAX failure: " + errMsg);
      }
    );
  }, []);

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Profile"),
    msg && React.createElement("div", { className: "profile-msg" }, msg),
    userData && React.createElement(UserInfoDisplay, { userData: userData })
  );
}

ReactDOM.render(
  React.createElement(ProfilePage),
  document.getElementById("content")
);