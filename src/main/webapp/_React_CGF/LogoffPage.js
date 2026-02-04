"use strict";

function LogoffPage() {
  const [msg, setMsg] = React.useState("");

  React.useEffect(() => {
    const url = "/webUser/logoffAPI";

    ajax_alt(
      url,
      function(obj) {
        setMsg(obj.errorMsg);
      },
      function(errMsg) {
        setMsg("AJAX failure: " + errMsg);
      }
    );
  }, []);

  return (
    React.createElement("div", null,
      React.createElement("h2", null, "Log Out"),
      msg && React.createElement("div", null, msg)
    )
  );
}