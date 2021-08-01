import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useHttpClient from "../../shared/components/Hooks/hook-useHttpClient";
import { AuthContext } from "../../shared/components/context/Auth-context";

function UpdatePlace() {
  const { isLoading, errorMessage, sendRequest, clearError } = useHttpClient();
  const [place, setPlace] = useState();
  const authentication = useContext(AuthContext);

  const placeId = useParams().placeId;
  const history = useHistory();

  let inputs = {
    input1: {
      value: "",
      isValid: false,
    },
    input2: {
      value: "",
      isValid: false,
    },
  };

  const [inputState, eh_input, setFormData] = useFormValidity(inputs, false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(placeId);
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        // console.log(responseData.place);
        setPlace(responseData.place);
        console.log(place);

        if (!place) {
          return (
            <div className="center">
              <Card>
                <h3>No place found.</h3>
              </Card>
            </div>
          );
        }

        // setFormData(
        //   {
        //     input1: {
        //       value: responseData.place.title,
        //       isValid: true,
        //     },
        //     input2: {
        //       value: responseData.place.description,
        //       isValid: true,
        //     },
        //   },
        //   true
        // );
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, placeId, setFormData]);
  // useEffect with [] parameter means run just once.

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <LoadingSpinner />
        </Card>
      </div>
    );
  }

  const eh_form_submition = async (event) => {
    event.preventDefault();    
    try {
      // console.log(inputState.inputElements.input1.value);
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: inputState.inputElements.input1.value,
          description: inputState.inputElements.input2.value,
        }),
        { "Content-Type": "application/json" }
      );
      // console.log(responseData);
      setPlace(responseData.place);
      history.push(`/places/user/${authentication.loggedinUser._id}`)
      //props.afterItemUpdate(place);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal errorMessage={errorMessage} onCancel={clearError} />
      {!isLoading && place && (
        <form className="place-form" onSubmit={eh_form_submition}>
          <Input
            id="input1"
            type="text"
            label="Title: "
            // placeholder="example: munich"
            errorText="Invalid title."
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={place.title}
            initialValidity={true}
            onInput={eh_input}
          />
          <Input
            id="input2"
            label="Description: "
            type="textarea"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Invalid Input"
            initialValue={place.description}
            initialValidity={true}
            onInput={eh_input}
          />
          <p>The address cannot be edited.</p>
          <Button disabled={!inputState.isFormValid}>Update</Button>
        </form>
      )}
    </React.Fragment>
  );
}

export default UpdatePlace;
