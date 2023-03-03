import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, pushSchema, getStoredSchemas, setActiveSchema, getActiveSchema, getSchemaByName } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../../components/Group";
import ButtonFull from "../../components/ButtonFull";
import TextField from "../../components/TextField";
import Dropdown from "../../components/Dropdown";
import schemaValidate from "../../Schema";

const ConfigureSchema = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    const [schemaText, setSchemaText] = useState("");
    const [schemaName, setSchemaName] = useState("");
    const [storedSchemas, setStoredSchemas] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState({});
    const [currentSchema, setCurrentSchema] = useState({});

    useEffect(() => {
        if (!user) return navigate("/login");
        if (user && !(checkAdmin(user))) return navigate("/dashboard");
    }, [user, loading]);

    useEffect(() => {
        async function waitForSchemas() {
            await getStoredSchemas().then((schemas) => {
                setStoredSchemas(schemas);
            });
        }
        waitForSchemas();
    }, [storedSchemas]);

    useEffect(() => {
        if (selectedSchema === {}) return;
        async function waitForActiveSchema() {
            await getActiveSchema().then((schema) => {
                setCurrentSchema(schema);
            });
        }
        waitForActiveSchema();
    }, [selectedSchema, currentSchema]);

    function schemaChange(value) {
        setSchemaText(value.target.value);
    }

    function setSchemaByName(name) {
        async function waitForSchema() {
            await getSchemaByName(name).then((schema) => {
                setSchemaText(JSON.stringify(schema));
            });
        }
        return waitForSchema();
    }

    function saveSchema() {
        let schemaObject;
        // if (schemaName === "" || storedSchemas.includes(schemaName)) {
        //     alert("Schema name is invalid or already exists");
        //     return;
        // }
        try {
            schemaObject = JSON.parse(schemaText);
        } catch (e) {
            alert("Invalid JSON\n" + e);
            return;
        }
        if (!schemaValidate(schemaObject)) {
            return;
        }
        pushSchema(schemaObject, schemaName);
    }

    return (
        <div style={{ marginBottom: "40px" }}>
            <Group name="Configure Schema">
                <ButtonFull name="Back to Admin" callback={() => navigate("/admin")}></ButtonFull>
                <Dropdown name="" elements={storedSchemas} callback={(value) => { setSelectedSchema(value); }}></Dropdown>
                <ButtonFull name="Set Active" callback={() => { setActiveSchema(selectedSchema); setCurrentSchema(selectedSchema); }}></ButtonFull>
                <ButtonFull name="View Schema" callback={() => { setSchemaByName(selectedSchema); }}></ButtonFull>
                <TextField name="Name" callback={(name) => setSchemaName(name)}></TextField>
                <ButtonFull name="Push Schema" callback={saveSchema}></ButtonFull>
                <br />
                <textarea value={schemaText} rows="100" cols="100" autoCorrect="false" spellCheck="false" wrap="off" onChange={(value) => { schemaChange(value); }} />
            </Group>
        </div>
    );
};

const checkAdmin = (user) => {
    return user.email.split("@")[0] === "admin";
};

export default ConfigureSchema;