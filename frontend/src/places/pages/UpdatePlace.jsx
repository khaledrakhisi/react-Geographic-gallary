import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { PLACES } from "./Places";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";
import Card from "../../shared/components/UIElements/Card";

function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

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

  const place = PLACES.find((p) => p.id === placeId);
  const [inputState, eh_input, setFormData] = useFormValidity(inputs, false);

  useEffect(() => {
    if (!place) {
      return (
        <div className="center">
          <Card>
            <h3>No data found.</h3>
          </Card>
        </div>
      );
    }

    inputs = {
        input1: {
          value: place.title,
          isValid: true,
        },
        input2: {
          value: place.description,
          isValid: true,
        },
      };
    
    setFormData(inputs, true);

    setIsLoading(false); //data has been loaded here
  }, [setFormData, place]);

  //   console.log(inputState);
  const eh_form_submition = () => {};

  if (isLoading) {
    return (
      <div className="center">
        <Card>
          <h3>Loading...</h3>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={eh_form_submition}>
      <Input
        id="input1"
        type="text"
        label="Title: "
        // placeholder="example: munich"
        errorText="Invalid title."
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={inputState.inputElements.input1.value}
        initialValidity={inputState.inputElements.input1.isValid}
        onInput={eh_input}
      />
      <Input
        id="input2"
        label="Description: "
        type="textarea"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Invalid Input"
        initialValue={inputState.inputElements.input2.value}
        initialValidity={inputState.inputElements.input2.isValid}
        onInput={eh_input}
      />
      <p>The address cannot be edited.</p>
      <Button disabled={!inputState.isFormValid}>Update</Button>
    </form>
  );
}

export default UpdatePlace;
