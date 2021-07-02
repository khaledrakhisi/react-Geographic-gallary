import React from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./NewPlace.css";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";


function NewPlace() {

  const [inputState, eh_input] = useFormValidity({
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
  }, false);

  const eh_form_submit = (event) => {
    // console.log(inputState.inputElements);

    event.preventDefault();
  }

  return (
    <form className="place-form" onSubmit={eh_form_submit}>
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
  );
}

export default NewPlace;
