import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserFromID } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import ButtonFull from "../components/ButtonFull";
import Loader from "../components/Loader";
import TextField from "../components/TextField";
import { getActiveSchema } from "../firebase";
import { widgetNames } from "../Schema";

const Scout = () => {
    const navigate = useNavigate();
    const [activeSchema, setActiveSchema] = useState({});
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!user) return navigate("/login");
        setName(user.email.split("@")[0]);
        getActiveSchema().then((schema) => {
            setActiveSchema(schema);
            console.log("NORMAL SCHEMA: " + JSON.stringify(schema));
            console.log("ACTIVE SCHEMA: " + JSON.stringify(activeSchema));
        });
    }, [user, loading]);

    return (!(Object.keys(activeSchema).length === 0)) ? (
        <div className="scout">
            <div className="container mt-4">
                <Group name="Scouting">
                    <TextField name="Scouter" callback={(_) => _} readonly={name ?? ""} />
                    <ButtonFull name="Submit" callback={() => console.log("HELLO")} />
                </Group>
                <Group>
                    <h1>{JSON.stringify(activeSchema.schema.widgets[0].widget)}</h1>
                </Group>
            </div>
        </div>
    ) : <Loader />;
};

export default Scout;