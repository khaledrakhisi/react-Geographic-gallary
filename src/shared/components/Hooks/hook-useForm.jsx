import React, { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
    // console.log(action.inputId);
    switch (action.type) {
      case "INPUT_CHANGE":
        let b_isFormValid = action.isValid;
        for (var input in state.inputElements) {
          if (input === action.inputId) {
            b_isFormValid = b_isFormValid && action.isValid;
          } else {
            b_isFormValid = b_isFormValid && state.inputElements[input].isValid;
          }
        }
        let newState = {
          ...state,
          inputElements: {
            ...state.inputElements,
            //override input object
            //remeber: the spread (...) operator does not add the {} into the object
            [action.inputId]: {
              value: action.value,
              isValid: action.isValid,
            },
          },
          isFormValid: b_isFormValid,
        };
        // console.log(newState.isFormValid);
        return newState;
  
      default:
        return state;
    }
  };

  function useFormValidity(inputElements, initialValidity) {

    const [inputState, dispatch] = useReducer(formReducer, {
        inputElements: inputElements,
        isFormValid: initialValidity,
      });

      const eh_input = useCallback((id, value, isValid) => {
        dispatch({
          type: "INPUT_CHANGE",
          inputId: id,
          value: value,
          isValid: isValid,
        });
        // console.log("value: ", value);
      }, []);
    
      return [inputState, eh_input];
  }

  export default useFormValidity;