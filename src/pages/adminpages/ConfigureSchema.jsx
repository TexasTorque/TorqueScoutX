import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../../components/Group";
import ButtonFull from "../../components/ButtonFull";
import Empty from "../../components/Empty";
import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import schemaValidate from "../../Schema";
import { toggleWidget } from "../../components/Toggle";

const ConfigureSchema = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const [schemaText, setSchemaText] = useState("");

    useEffect(() => {
        if (!user) return navigate("/login");
        if (user && !(checkAdmin(user))) return navigate("/dashboard");
    }, [user, loading]);

    function schemaChange(value) {
        setSchemaText(value.target.value);
    }

    function saveSchema() {
        let schemaObject;
        try {
            schemaObject = JSON.parse(schemaText);
        } catch (e) {
            alert("Invalid JSON\n" + e);
            return;
        }
        if (!schemaValidate(schemaObject)) {
            return;
        }
        alert("Schema saved");
    }

    return (
        <div>
            <Group name="Configure Schema">
                <textarea rows="100" cols="100" autoCorrect="false" spellcheck="false" wrap="off" onChange={(value) => { schemaChange(value); }}>

                </textarea>
                <ButtonFull name="Save Schema" callback={saveSchema}></ButtonFull> <ButtonFull name="Back to Admin" callback={() => navigate("/admin")}></ButtonFull>
            </Group>
        </div>
    );
};

const checkAdmin = (user) => {
    return user.email.split("@")[0] === "admin";
};

export default ConfigureSchema;