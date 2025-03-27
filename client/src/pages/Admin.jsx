import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";

const Admin = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user) return navigate("/login");
    if (user && !(checkAdmin(user))) return navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <div className="admin">
      <div className="container mt-4">
        <Group name="Torque Scout">
          <ButtonFull name="Configure Schema" callback={() => navigate("/admin/schema")} />
          <ButtonFull name="Manage Users" callback={() => navigate("/admin/manageusers")} />
          <ButtonFull name="Scout" callback={() => navigate("/scout")} />
          <ButtonFull name="AI Summarize" callback={() => navigate("/admin/aisummarize")} />
          <ButtonFull name="Back to Home" callback={() => navigate("/dashboard")} />
        </Group>
      </div>
    </div>
  );
};

const checkAdmin = (user) => {
  return user.email.split("@")[0] === "admin" || user.email.split("@")[0] === "lead";
};

export default Admin;