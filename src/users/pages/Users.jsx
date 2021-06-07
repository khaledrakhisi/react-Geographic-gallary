import React from "react";

import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "8678y",
    name: "khaled",
    imageUrl:
      "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
    places: 3,
  },
  {
    id: "98u98j",
    name: "fabian",
    imageUrl:
      "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg",
    places: 15,
  },
];

const Users = () => {
  return <UsersList items={USERS} />;
};

export default Users;
