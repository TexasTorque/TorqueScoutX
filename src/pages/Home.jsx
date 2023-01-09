import React from "react";

import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="container mt-4">
        <Group name="Torque Scout">
          <ButtonFull name="Login" callback={() => navigate("/login")} />
          <ButtonFull name="Scout" callback={() => navigate("/scout")} />
          <ButtonFull name="Analysis" callback={() => navigate("/analysis")} />
        </Group>
      </div>
    </div>
  );
};

export default Home;