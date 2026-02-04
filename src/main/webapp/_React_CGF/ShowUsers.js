"use strict";

const ShowUsers = MakeShowData({
  url: "webUser/getAll",
  title: "User List",
  keyProp: "webUserId",
  columns: [
    { name: "userEmail", label: "Email", type: "text" },
    { name: "userImage", label: "Image", type: "image" },
    { name: "birthday", label: "Birthday", type: "date" },
    { name: "membershipFee", label: "Membership Fee", type: "number" },
    { name: "userRoleType", label: "Role", type: "text" },
  ]
});