import React, { useContext } from "react";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import "./PlacesList.css";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/components/context/Auth-context";

function PlacesList (props) {

  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found.</h2>
          <Button to="/places/new">Create One?</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((item) => (
        <PlaceItem
          key={item.id}
          id={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          address={item.address}
          description={item.description}
          userId={item.userId}
          coordinates={item.location}
          showEditButtons={auth.loggedinUser && auth.loggedinUser._id === item.userId}
          afterItemUpdate = {props.afterItemUpdate}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
