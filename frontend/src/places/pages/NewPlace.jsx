import React, { useContext } from "react";
import { useHistory } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./NewPlace.css";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";
import useHttpClient from "../../shared/components/Hooks/hook-useHttpClient";
import { AuthContext } from "../../shared/components/context/Auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function NewPlace() {
  const _authContext = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, errorMessage, sendRequest, clearError } = useHttpClient();
  const [inputState, eh_input] = useFormValidity(
    {
      input1: {
        value: "",
        isValid: false,
      },
      input2: {
        value: "",
        isValid: false,
      },
      input3: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const eh_form_submit = async (event) => {
    event.preventDefault();
    //console.log(inputState.inputElements);
    // console.log(_authContext.userId);    
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: inputState.inputElements.input1.value,
          description: inputState.inputElements.input2.value,
          address: inputState.inputElements.input3.value,
          userId: _authContext.loggedinUser._id,
        }),
        { "Content-Type": "Application/json" }
      );
      history.push("/");
    } catch (err) {}    
  };

  return (
    <React.Fragment>
      <ErrorModal errorMessage={errorMessage} onClose={clearError} />
      
      <form className="place-form" onSubmit={eh_form_submit}>
      {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="input1"
          label="New place name: "
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Invalid Input"
          onInput={eh_input}
        />
        <Input
          id="input2"
          label="Description: "
          type="textarea"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Invalid Input"
          onInput={eh_input}
        />
        <Input
          id="input3"
          label="Address: "
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Invalid Input"
          onInput={eh_input}
        />
        <Button disabled={!inputState.isFormValid}>Add place</Button>
      </form>
    </React.Fragment>
  );
}

export default NewPlace;
