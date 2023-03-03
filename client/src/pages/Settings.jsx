import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Group from "../components/Group";
import Button from "../components/ButtonFull";


const Settings = () => {
    
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, loading]);

    const handlePasswordResetEmail = () => {
        sendPasswordResetEmail(auth, user.email)
        .then(() => {
         // Password reset email sent!
            // ..
            alert("password reset email sent!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error)
             // ..
        });
    }

    return (
        <div className="Settings">
            <Group name="Settings">
                <Button name="Send Password Reset Email" callback={handlePasswordResetEmail} />
                <Button name="Back to Home" callback={() => navigate("/dashboard")} />
            </Group>
        </div>
    );

}

export default Settings;