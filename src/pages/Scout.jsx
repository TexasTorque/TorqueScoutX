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
import Label from "../components/Label";

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
            if (!window.confirm("DO YOU TRIPLE PINKIE SWEAR SARANG THIS IS THE RIGHT DATA???")) submit();
            alert("You can't triple pinkie swear dumbass, you only have two pinkies 🤡");
        }
        report.fields.forEach((field) => {  //bad guard clause will fix later
            if (field.value === "") {
                alert("Please fill out all fields.");
                return;
            }
        });

        console.log(report)
        let finalReport = {};
        for (let i = 0; i < report.fields.length; i++) {
            console.log(report.fields[i].name)
            if (["Team","Alliance","Name","Match"].includes(report.fields[i].name)) {
                finalReport[report.fields[i].name] = report.fields[i].value;
            } else {
                finalReport[report.fields[i].name] = {"value":report.fields[i].value, "points":report.fields[i].points}
            }
        }

        if (parseInt(finalReport["Team"]) < 148) {
            if (!window.confirm("Team number is unusually low. Are you sure you want to submit?")) return;
        }
        console.log(JSON.stringify(finalReport));
        pushReport(finalReport);
        //big bug, widgets of the same name, lower(auto) and lower(teleop) will overwrite each other, maybe add a unique id to each widget
    };

    return (!(Object.keys(activeSchema).length === 0)) ? (
        <div className="scout">
            <div className="container mt-4">
                <Group>
                    <Label name="Info">
                    </Label>
                    <TextField name="Name" readonly={name ?? ""} value={name} widgetCallback={(data) => modifyReport(data)}/>
                        <TextField name="Team" value="" widgetCallback={(data) => modifyReport(data)} />
                        <TextField name="Match" value="" widgetCallback={(data) => modifyReport(data)} />
                        <Toggle name="Alliance" widgetCallback={(data) => modifyReport(data)} />
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