import React from "react";

import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="container mt-4">
        <Group name="Page Not Found">
          <ButtonFull name="Back to home" callback={() => navigate("/dashboard")} />
        </Group>
      </div>
    </div>
  );
};

export default NotFound;