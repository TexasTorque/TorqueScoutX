import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";
import Empty from "../components/Empty";
import { signOut } from "firebase/auth";

const Admin = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    
    useEffect(() => {
        if (!user) return navigate("/login");
      }, [user, loading]);

    return (
        <div className="admin">
          <div className="container mt-4">
            <Group name="Torque Scout">
              <ButtonFull name="Configure Schema" callback={() => navigate("/schema")} />
              <ButtonFull name="Manage Users" callback={() => navigate("/user-management")} />
            </Group>
          </div>
        </div>
      );
}

export default Admin;