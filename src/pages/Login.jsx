import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";

import ButtonFull from "../components/ButtonFull";
import Group from "../components/Group";
import TextField from "../components/TextField";


const Login = ({}) => {
  const { redirect } = useParams();

  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

useEffect(() => {
    if (user) navigate("/" + redirect ?? "/");
  }, [user, loading]);

  const login = () => {
    const email = id + "@scout.texastorque.org";
    logInWithEmailAndPassword(email, password);
    navigate("/login/" + redirect ?? "/dashboard");
  };

  return (
    <div className="login">
      <div className="container mt-4">
        <Group name="Login">
          <ButtonFull name="Back to home" callback={() => navigate("/")} />
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