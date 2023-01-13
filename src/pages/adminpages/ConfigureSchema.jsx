import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, pushSchema, getStoredSchemas } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../../components/Group";
import ButtonFull from "../../components/ButtonFull";
import TextField from "../../components/TextField";
import schemaValidate from "../../Schema";

const ConfigureSchema = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    const [schemaText, setSchemaText] = useState("");
    const [schemaName, setSchemaName] = useState("");

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
        if (schemaName === "") {
            alert("Schema name cannot be empty");
            return;
        }
        pushSchema(schemaObject, schemaName);
        getStoredSchemas().then((schemas) => {
            schemas.forEach((element) => console.log(element));
        });
    }

    return (
        <div>
            <Group name="Configure Schema">
                <TextField name="Schema Name" callback={(name) => setSchemaName(name)}></TextField>
                <textarea rows="100" cols="100" autoCorrect="false" spellCheck="false" wrap="off" onChange={(value) => { schemaChange(value); }}>

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