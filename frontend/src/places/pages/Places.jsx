import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";
import useHttpClient from "../../shared/components/Hooks/hook-useHttpClient";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

function Places() {
  const userId = useParams().userId;

  const { isLoading, errorMessage, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(userId);
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        // console.log(responseData);
        setPlaces(responseData.places);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, userId]);
  // useEffect with [] parameter means run just once.

  if(!!errorMessage){
    return <div className="center"><Card> <h3>{ errorMessage } </h3> </Card></div>;
  }

  const eh_afterItemUpdate = (updated_placeId) => {
    // console.log("Here");
    setPlaces(prevPlaces => prevPlaces.filter(item => item.id !== updated_placeId));
  }

  return <React.Fragment>
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && <PlacesList items={places} afterItemUpdate={eh_afterItemUpdate}/>};
    </React.Fragment>  
};

export default Places;
// export {PLACES};
