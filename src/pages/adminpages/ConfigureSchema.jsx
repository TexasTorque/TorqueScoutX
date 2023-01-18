import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, pushSchema, getStoredSchemas, setActiveSchema, getActiveSchema, getSchemaByName } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../../components/Group";
import ButtonFull from "../../components/ButtonFull";
import TextField from "../../components/TextField";
import Loader from "../../components/Loader";
import Dropdown from "../../components/Dropdown";
import Label from "../../components/Label";
import schemaValidate from "../../Schema";

const ConfigureSchema = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

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
    }

    return (
        <div style={{ marginBottom: "40px" }}>
            <Group name="Configure Schema">
                <TextField name="Schema Name" callback={(name) => setSchemaName(name)}></TextField>
                <textarea value={schemaText} rows="100" cols="100" autoCorrect="false" spellCheck="false" wrap="off" onChange={(value) => { schemaChange(value); }} />
                <ButtonFull name="Save Schema" callback={saveSchema}></ButtonFull>
            </Group>
            <Group name="Set Active Schema">
                <br />
                Active Schema: {currentSchema.name}
                <Dropdown name="Active Schemas" options={storedSchemas} callback={(value) => { setSelectedSchema(value); }}></Dropdown>
                <ButtonFull name="Set Active" callback={() => { setActiveSchema(selectedSchema); setCurrentSchema(selectedSchema); }}></ButtonFull>
                <ButtonFull name="View Schema" callback={() => { setSchemaByName(selectedSchema); }}></ButtonFull>
            </Group>
            <div style={{ marginLeft: "33px" }}>
                <ButtonFull name="Back to Admin" callback={() => navigate("/admin")}></ButtonFull>
            </div>
        </div>
    );
};

const checkAdmin = (user) => {
    return user.email.split("@")[0] === "admin";
};

export default ConfigureSchema;