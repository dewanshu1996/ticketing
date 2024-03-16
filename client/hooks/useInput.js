import { useState } from "react";

const useInput = (formContext, validateFunction) => {
  const { values, touched, errors, errMsg } = formContext;
  const [enteredValue, setEnteredValue] = useState(values);
  const [isTouched, setIsTouched] = useState(touched);
  const [hasError, setHasError] = useState(errors);
  const [errorMsg, setErrorMsg] = useState(errMsg);

  const valueChangeHandler = (name, event) => {
    setEnteredValue((prevState) => {
      if (isTouched[name] === false) {
        setIsTouched((prevState) => {
          return {
            ...prevState,
            [name]: true,
          };
        });
      }

      setHasError((prevState) => {
        return {
          ...prevState,
          [name]: false,
        };
      });

      setErrorMsg((prevState) => {
        return {
          ...prevState,
          [name]: undefined,
        };
      });
      // }

      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

  const blurEventHandler = (name, event) => {
    //console.log(name, event.target.value);
    setEnteredValue((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });

    if (isTouched[name] === false) {
      setIsTouched((prevState) => {
        return {
          ...prevState,
          [name]: true,
        };
      });
    }

    const { hasError: hasErrorReturn, errorMsg: errorMsgReturn } =
      validateFunction(name, event.target.value, enteredValue);

    setHasError((prevState) => {
      return {
        ...prevState,
        [name]: hasErrorReturn,
      };
    });

    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [name]: errorMsgReturn,
      };
    });
  };

  const clearInputValueByName = (name) => {
    setEnteredValue((prevState) => {
      return {
        ...prevState,
        [name]: "",
      };
    });

    setHasError((prevState) => {
      return {
        ...prevState,
        [name]: false,
      };
    });

    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [name]: "",
      };
    });

    setIsTouched((prevState) => {
      return {
        ...prevState,
        [name]: false,
      };
    });
  };

  const setInputField = (name, value) => {
    //console.log("input field " + isTouched[name]  + " " + name);
    setIsTouched((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });

    setEnteredValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const setErrorField = (fieldname, message) => {
    setHasError((prevState) => {
      return {
        ...prevState,
        [fieldname]: true,
      };
    });

    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [fieldname]: message,
      };
    });
  };

  const unBlurAllFields = (fieldNameArray) => {
    fieldNameArray.map((fieldName) => {
      const { hasError: hasErrorReturn, errorMsg: errorMsgReturn } =
        validateFunction(fieldName, enteredValue[fieldName], enteredValue);

      if (isTouched[fieldName] === false) {
        setIsTouched((prevState) => {
          return {
            ...prevState,
            [fieldName]: true,
          };
        });
      }

      setHasError((prevState) => {
        return {
          ...prevState,
          [fieldName]: hasErrorReturn,
        };
      });

      setErrorMsg((prevState) => {
        return {
          ...prevState,
          [fieldName]: errorMsgReturn,
        };
      });
    });
  };

  const clearErrorField = (fieldName) => {
    setHasError((prevState) => {
      return {
        ...prevState,
        [fieldName]: false,
      };
    });

    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [fieldName]: "",
      };
    });
  };

  const hideInput = (fieldName) => {
    setIsTouched((prevState) => {
      return {
        ...prevState,
        [fieldName]: true,
      };
    });

    setEnteredValue((prevState) => {
      return {
        ...prevState,
        [fieldName]: "",
      };
    });

    setHasError((prevState) => {
      return {
        ...prevState,
        [fieldName]: false,
      };
    });

    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [fieldName]: "",
      };
    });
  };

  const showInput = (fieldName) => {
    setIsTouched((prevState) => {
      return {
        ...prevState,
        [fieldName]: false,
      };
    });

    setEnteredValue((prevState) => {
      return {
        ...prevState,
        [fieldName]: "",
      };
    });

    setHasError((prevState) => {
      return {
        ...prevState,
        [fieldName]: false,
      };
    });

    setErrorMsg((prevState) => {
      return {
        ...prevState,
        [fieldName]: "",
      };
    });
  };

  return {
    enteredValue,
    isTouched,
    hasError,
    errorMsg,
    valueChangeHandler,
    blurEventHandler,
    clearInputValueByName,
    setInputField,
    setErrorField,
    unBlurAllFields,
    clearErrorField,
    hideInput,
    showInput,
  };
};

export default useInput;
