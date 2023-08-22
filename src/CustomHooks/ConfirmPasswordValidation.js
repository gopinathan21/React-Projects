import { useState, useEffect } from "react";

const usePasswordValidation = (newPassword) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  useEffect(() => {
    if (newPassword && confirmPassword) {
    const comparisonResult = newPassword.localeCompare(confirmPassword);
     setConfirmPasswordValid(comparisonResult === 0);
  }}, [newPassword, confirmPassword]);

  return {confirmPassword, confirmPasswordValid, handleConfirmPassword };
};

export default usePasswordValidation;
