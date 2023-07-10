import { useCallback, useState } from "react";

export function useFormAndValidation (inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsvalid] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsvalid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newErrors = {}, newIsValid = false) => {
    setValues(inputValues);
    setErrors(newErrors);
    setIsvalid(newIsValid);
  }, [setValues, setErrors, setIsvalid]);

  return { values, errors, isValid, handleChange, resetForm, setValues, setIsvalid}
}
