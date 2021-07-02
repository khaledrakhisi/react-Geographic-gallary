import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./Auth.css";
import useFormValidity from "../../shared/components/Hooks/hook-useForm";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/components/context/Auth-context";

function Auth() {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const auth = useContext(AuthContext);

  let inputElements = {
    input2: {
      value: "",
      isValid: false,
    },
    input3: {
      value: "",
      isValid: false,
    },
  };
  //   if (isSignupMode) {
  //     inputElements = {
  //       ...inputElements,
  //       input1: {
  //         value: "",
  //         isValid: false,
  //       },
  //     };
  //   }

  const [inputState, eh_input, setFormData] = useFormValidity(
    inputElements,
    false
  );

  const eh_form_submittion = (event) => {
    // console.log(isSignupMode, inputState.inputElements);
    if(isSignupMode){

    }else{
        auth.login();
    }

    event.preventDefault();
  };

  const eh_link_signup_click = () => {
    //preparing to switch to signup mode
    setFormData(
      {
        ...inputState.inputElements,
        input1: {
          value: "",
          isValid: false,
        },
      },
      false
    );
    // console.log(inputState.inputElements);
    setIsSignupMode(true);
  };

  const eh_link_login_click = () => {
    setFormData(
      {
        ...inputState.inputElements,
        input1: undefined,
      },
      inputState.inputElements.input2.isValid &&
        inputState.inputElements.input3.isValid
    );

    setIsSignupMode(false);
  };

  return (
    <Card className="authentication">
      {isSignupMode ? (
        <h3>Signing new user up</h3>
      ) : (
        <h3>Authentication required</h3>
      )}
      <hr />
      <form
        onSubmit={eh_form_submittion}
        onClick={() => {
          //👇 it seems that it take a little while to modification to be applied to inputState!!
          console.log(inputState.inputElements);
        }}
      >
        {isSignupMode && (
          <Input
            id="input1"
            type="text"
            label="name: "
            placeholder="i.e: khaled"
            validators={[VALIDATOR_REQUIRE]}
            errorText="required"
            onInput={eh_input}
          />
        )}

        <Input
          id="input2"
          type="text"
          label="E-mail: "
          placeholder="i.e: khaledrakhisi@gmail.com"
          validators={[VALIDATOR_EMAIL()]}
          errorText="invalid email"
          onInput={eh_input}
        />

        <Input
          id="input3"
          type="password"
          label="password: "
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="invalid password"
          onInput={eh_input}
        />

        <Button type="submit" disabled={!inputState.isFormValid}>
          {isSignupMode ? "Signup" : "Login"}
        </Button>

        {!isSignupMode ? (
          <p>
            Don't have an account?{" "}
            <Link to="#" onClick={eh_link_signup_click}>
              Signup
            </Link>
          </p>
        ) : (
          <p>
            You've already signed up?{" "}
            <Link to="#" onClick={eh_link_login_click}>
              Login
            </Link>
          </p>
        )}
      </form>
    </Card>
  );
}

export default Auth;
