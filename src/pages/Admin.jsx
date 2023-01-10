import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";
import Empty from "../components/Empty";
import { signOut } from "firebase/auth"; { }

const Admin = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) return navigate("/login");
    if (user && !(checkAdmin(user))) return navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="admin">
      <div className="container mt-4">
        <Group name="Torque Scout">
          <ButtonFull name="Configure Schema" callback={() => navigate("/schema")} />
          <ButtonFull name="Manage Users" callback={() => navigate("/admin/manageusers")} />
          <ButtonFull name="Back to Home" callback={() => navigate("/dashboard")} />
        </Group>
      </div>
    </div>
  );
};

const checkAdmin = (user) => {
  return user.email.split("@")[0] === "admin";
};

export default Admin;