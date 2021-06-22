import React from "react";
import { useParams } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { PLACES } from "./Places";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";

function UpdatePlace() {
  const placeId = useParams().placeId;
  const place = PLACES.find((p) => p.id === placeId);

  let inputs = {
    input1: {
      value: place.title,
      isValid: true,
    },
    input2: {
      value: place.description,
      isValid: true,
    },
  };
  const [inputState, eh_input] = useFormValidity(inputs, false);

    console.log(inputState);
  const eh_form_submition = () => {};

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
