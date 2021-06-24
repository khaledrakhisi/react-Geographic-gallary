import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./Auth.css";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";

function Auth() {
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

  const [inputState, eh_input] = useFormValidity(inputs, false);

  const eh_form_submittion = (event)=>{

    console.log(inputState.inputElements);
    event.preventDefault();
  }

  return (
    <Card className="authentication">
    <h3>Authentication required</h3>
    <hr />
      <form onSubmit={eh_form_submittion}>
        <Input
          id="input1"
          type="text"
          label="E-mail: "
          placeholder="i.e: khaledrakhisi@gmail.com"
          validators={[VALIDATOR_EMAIL()]}
          errorText="invalid email"
          onInput={eh_input}
        />
        <Input
          id="input2"
          type="password"
          label="password: "
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="invalid password"
          onInput={eh_input}
        />
        <Button disabled={!inputState.isFormValid}>Login</Button>
      </form>
    </Card>
  );
}

export default Auth;
