import React from "react";

import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

function UsersList(props) {
  
  if (props.items.length === 0) {
    return (
      <Card>
        <h2>User list is empty!</h2>
      </Card>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((item) => (
        <UserItem
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          places={item.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
