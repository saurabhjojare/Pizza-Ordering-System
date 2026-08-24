import { useEffect, useState } from "react";
import { Labels } from "../../../common/enums/labels.enums";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../common/enums/routes.enum";
import { saveToken, useRedirectIfUserAuthenticated } from "../../../common/utils/authentication.utils";
import { loginUser } from "../../../common/services/user.service";

export const useLogin = () => {
  useRedirectIfUserAuthenticated(Routes.ROOT);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { document.title = Labels.LOGIN; }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      saveToken(await loginUser(email, password));
      navigate(Routes.ROOT, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return { email, password, error, setEmail, setPassword, handleLogin };
};