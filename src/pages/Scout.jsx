import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserFromID } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";
import Loader from "../components/Loader";
import TextField from "../components/TextField";
import { getActiveSchema } from "../firebase";

const Scout = () => {
    const navigate = useNavigate();
    const [activeSchema, setActiveSchema] = useState({});
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!user) return navigate("/login");
        getUserFromID(user.email.split("@")[0]).then(user => {
            setName(user["first"]);
        });
    }, [user, loading]);

    useEffect(() => {
        if (activeSchema === {}) return;
        async function waitForActiveSchema() {
            await getActiveSchema().then((schema) => {
                setActiveSchema(schema);
            });
        }
        waitForActiveSchema();
    }, [activeSchema]);

    return (
        <div className="scout">
            <div className="container mt-4">
                <Group name="Scouting">
                    <TextField name="Scouter" callback={(_) => _} readonly={name ?? ""} />
                    <ButtonFull name="Submit" callback={() => console.log("HELLO")} />
                </Group>
            </div>
        </div>
    );
};

export default Scout;