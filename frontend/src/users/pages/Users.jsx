import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

// const USERS = [
//   {
//     id: "8678y",
//     name: "khaled",
//     imageUrl:
//       "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
//     places: 3,
//   },
//   {
//     id: "98u98j",
//     name: "fabian",
//     imageUrl:
//       "https://cdn2.vectorstock.com/i/1000x1000/49/86/man-character-face-avatar-in-glasses-vector-17074986.jpg",
//     places: 15,
//   },
// ];

function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users");

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.msg);
        }

        setIsLoading(false);
        setUsersList(responseData.users);
        console.log(responseData);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setErrorMessage(
          err.message || "An Error Happend.Please check the console log."
        );
      }
    };
    fetchData();
  }, []);
  // useEffect with [] parameter means run just once.

  return (
    <React.Fragment>
      {isLoading && <div className="center"> <LoadingSpinner/></div>}
      {!!errorMessage && <ErrorModal errorMessage={errorMessage} onClear={()=>{setErrorMessage(null)}}/>}
      {!isLoading && usersList && <UsersList items={usersList} />};
    </React.Fragment>
  );
}

export default Users;
