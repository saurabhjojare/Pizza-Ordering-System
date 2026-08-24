import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Labels } from "../../../common/enums/labels.enums";
import { Routes } from "../../../common/enums/routes.enum";
import { SignUp } from "../../../common/interfaces/user.interface";
import { signUpUser } from "../../../common/services/user.service";
import { useRedirectIfUserAuthenticated } from "../../../common/utils/authentication.utils";

export const useSignUp = () => {
  const navigate = useNavigate();
  useRedirectIfUserAuthenticated(Routes.MY_PROFILE);


  const [formData, setFormData] = useState<SignUp>({
    first_name: "", last_name: "", email_address: "", phone_number: "", address: "", password: "", confirm_password: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    document.title = Labels.SIGN_UP;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpUser(formData);
      navigate(Routes.LOGIN);
    } catch {
      setError("Sign up failed.");
    }
  };

  return { formData, error, handleChange, handleSubmit };
};