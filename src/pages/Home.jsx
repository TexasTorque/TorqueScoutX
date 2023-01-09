import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) return navigate("/dashboard"); 
    else return navigate("/login/dashboard");
  }, [user, loading]);
  
  return (
    <div className="home">
    </div>
  );
};

export default Home;