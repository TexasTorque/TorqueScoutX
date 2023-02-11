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
import NoHeaderGroup from "../components/NoHeaderGroup";
import AllianceInfoToggle from "../components/AllianceInfoToggle";

const Scout = () => {
    const navigate = useNavigate();
    const [activeSchema, setActiveSchema] = useState({});
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState("");

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
            if (!window.confirm("DO YOU TRIPLE PINKIE SWEAR SARANG THIS IS THE RIGHT DATA???")) submit();
            alert("You can't triple pinkie swear dumbass, you only have two pinkies 🤡");
        }
        report.fields.forEach((field) => {  //bad guard clause will fix later
            if (field.value === "") {
                alert("Please fill out all fields.");
                return;
            }
        });

        let finalReport = {};
        for (let i = 0; i < report.fields.length; i++) {
            if (["Team", "Alliance", "Scouter", "Match"].includes(report.fields[i].name)) {
                finalReport[report.fields[i].name] = report.fields[i].value;
            } else {
                finalReport[report.fields[i].name] = { "value": report.fields[i].value, "points": report.fields[i].points };
            }
        }

        if (finalReport["Team"] < 118) {
            if (!window.confirm("Team number is unusually low. Are you sure you want to submit?")) return;
        }
        finalReport.Alliance = finalReport.Alliance === "true" ? "Red" : "Blue";
        let points = 0;
        Object.keys(finalReport).forEach((field) => {
            points += finalReport[field].points ?? 0;
        });
        finalReport["Points"] = points;
        pushReport(finalReport).then(() => {
            navigate("/dashboard");
        });
    };

    return (!(Object.keys(activeSchema).length === 0)) ? (
        <div className="scout">
            <div className="container mt-4">
                <Group name="Scouting">
                    <TextField name="Scouter" readonly={name ?? ""} value={name} widgetCallback={(data) => modifyReport(data)} />
                    <ButtonFull name="Back" callback={() => navigate("/dashboard")} />
                </Group>
                <Group name="Info">
                    <TextField name="Team" value="" type="number" inputMode="decimal" widgetCallback={(data) => modifyReport(data)} />
                    <TextField name="Match" value="" type="number" inputMode="decimal" widgetCallback={(data) => modifyReport(data)} />
                    <AllianceInfoToggle name="Alliance" colorTrue="rgb(0,101,179)" colorFalse="rgb(220,53,69)" widgetCallback={(data) => modifyReport(data)} />
                </Group>
                {activeSchema.schema.widgets.map((widget) => {
                    return (
                        <h1>{widgetNames[widget.widget].widget({ widgetCallback: modifyReport, ...widget })}</h1>
                    );
                })}
                <NoHeaderGroup>
                    <ButtonFull name="Submit Report" callback={() => submit()} />
                </NoHeaderGroup>
                <br />
            </div>
        </div>
    ) : <Loader />;
};


export default Scout;