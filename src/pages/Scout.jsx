import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, pushReport } from "../firebase";
import { useNavigate } from "react-router-dom";
import Group from "../components/Group";
import Toggle from "../components/Toggle";
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
    const [team, setTeam] = useState(0);
    const [match, setMatch] = useState("");
    const [alliance, setAlliance] = useState("Red");

    let report = { "fields": [] };

    useEffect(() => {
        if (!user) return navigate("/login");
        setName(user.email.split("@")[0]);
        getActiveSchema().then((schema) => {
            setActiveSchema(schema);
        });
    }, [user, loading]);

    const modifyReport = (data) => {
        for (let i = 0; i < report.fields.length; i++) {
            if (report.fields[i].name === data.name) {
                report.fields = Object.assign([], report.fields, { [i]: data });
                console.log(report); //this works
                return;
            }
        }
        report.fields = report.fields.concat(data);
    };

    const submit = () => {
        if (!window.confirm("Are you sure you want to submit?")) return;
        if (user.email.split("@")[0] === "sarang") {
            if (!window.confirm("Are you sure you want to submit SARANG NAIR???")) submit();
            if (!window.confirm("ARE YOU SURE YOU WANT TO SUBMIT SARANG NAIR???")) submit();
        }
        report.fields.forEach((field) => {  //bad guard clause will fix later
            if (field.value === "") {
                alert("Please fill out all fields.");
                return;
            }
        });

        report.fields.forEach((field) => {
            console.log(JSON.stringify(field));
        });

        let finalReport = {};
        for (let i = 0; i < report.fields.length; i++) {
            finalReport[report.fields[i].name] = report.fields[i].value;
        }

        if (parseInt(finalReport["Team"]) < 148) {
            if (!window.confirm("Team number is low. Are you sure you want to submit?")) return;
        }
        console.log(finalReport);
        pushReport(finalReport);
        //big bug, widgets of the same name, lower(auto) and lower(teleop) will overwrite each other, maybe add a unique id to each widget
    };

    return (!(Object.keys(activeSchema).length === 0)) ? (
        <div className="scout">
            <div className="container mt-4">
                <Group>
                    {activeSchema.schema.widgets.map((widget) => {
                        return (
                            <h1 key={Math.random() * 1007 % 432}>{widgetNames[widget.widget].widget(widget, modifyReport)}</h1>
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