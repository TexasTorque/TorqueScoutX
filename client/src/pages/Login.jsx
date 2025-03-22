import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";

import ButtonFull from "../components/ButtonFull";
import Group from "../components/Group";
import TextField from "../components/TextField";

const Login = () => {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const login = () => {
    const email = id + "@scout.texastorque.org";
    logInWithEmailAndPassword(email, password);
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="container mt-4">
        <Group name="Login">
          <TextField name="Username" callback={(e) => setID(e)} />
          <TextField
            name="Password"
            callback={(e) => setPassword(e)}
            type="password"
          />
          <ButtonFull name="Login" callback={() => login()} />
        </Group>
      </div>
    </div>
  );
};

export default Login;