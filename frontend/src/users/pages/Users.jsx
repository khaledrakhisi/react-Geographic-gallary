import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useHttpClient from "../../shared/components/Hooks/hook-useHttpClient";

function Users() {
  const { isLoading, errorMessage, sendRequest, clearError } = useHttpClient();
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/users");
        // console.log(responseData);
        setUsersList(responseData.users);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);
  // useEffect with [] parameter means run just once.

  return (
    <React.Fragment>
      {!!errorMessage && (
        <ErrorModal errorMessage={errorMessage} onClose={clearError} />
      )}
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && usersList && <UsersList items={usersList} />};
    </React.Fragment>
  );
}

export default Users;
