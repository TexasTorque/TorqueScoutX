import React, { useEffect, useState } from "react";
import Group from "../../components/Group";
import ButtonFull from "../../components/ButtonFull";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AnalysisIndex = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [team, setTeam] = useState("");
    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, loading]);


    return (
        <div className="admin">
            <div className="container mt-4">
                <Group name="Analysis">
                    <ButtonFull name="Back to Home" callback={() => navigate("/dashboard")} />
                    <ButtonFull name="View Averages" callback={() => navigate("/analysis/averages")} />
                    <TextField name="Team" callback={(team) => setTeam(team)} type="number" inputMode="decimal" />
                    <ButtonFull name="View Team" callback={() => navigate("/analysis/team/" + team)} />

                </Group>
            </div>
        </div>
    );


};



export default AnalysisIndex;