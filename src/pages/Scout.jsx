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
    const [checked, setChecked] = useState(false);

    let report = [];

    useEffect(() => {
        if (!user) return navigate("/login");
        setName(user.email.split("@")[0]);
        getActiveSchema().then((schema) => {
            setActiveSchema(schema);
        });
    }, [user, loading]);

    const modifyReport = (data) => {
        for (let i = 0; i < report.length; i++) {
            if (report[i].name === data.name) {
                report = Object.assign([], report, { [i]: data });
                console.log(report);
                return;
            }
        }
        report = report.concat(data);
        console.log(report);
    };

    const submit = () => {
        if (!checked) {
            alert("Plase double check your input fields.");
            setChecked(true);
            return;
        }
        if (!window.confirm("Are you sure you want to submit?")) return;

        const report = {}; // use Redux https://stackoverflow.com/a/45534197/15973528
        activeSchema.schema.widgets.forEach((widget) => {
            if (widget.name !== "Label") { }
            // report[widget.name] = widgetNames[widget.widget].value;
            // console.log(widgetNames[widget.widget].getWidgetState);
        }
        );
        // console.log(report);
    };

    return (!(Object.keys(activeSchema).length === 0)) ? (
        <div className="scout">
            <div className="container mt-4">
                <Group name="Scouting">
                    <TextField name="Scouter" callback={(_) => _} readonly={name ?? ""} />
                    <ButtonFull name="Submit" callback={() => console.log("HELLO")} />
                </Group>
                <Group>
                    {activeSchema.schema.widgets.map((widget) => {
                        return (
                            <h1 key={widget.name}>{widgetNames[widget.widget].widget(widget, modifyReport)}</h1>
                        );
                    })}
                </Group>
                <ButtonFull name="Submit Report" callback={() => submit()} />
                <ButtonFull name="Back To Dashboard" callback={() => navigate("/dashboard")} />
                <br />
            </div>
        </div>
    ) : <Loader />;
};


export default Scout;