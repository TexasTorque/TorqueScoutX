import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
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
    const [checked, setChecked] = useState(false);
    const [team, setTeam] = useState(0);
    const [match, setMatch] = useState("");
    const [alliance, setAlliance] = useState("Red");

    // const [report, setReport] = useState([]);

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
        if (!checked) {
            alert("Plase double check your input fields.");
            setChecked(true);
            return;
        }
        if (!window.confirm("Are you sure you want to submit?")) return;
        if (team === 0 || match === "") {
            alert("Please fill out team and match fields.");
            return;
        }

        //if(user == sarang) alert(ARE YOU SURE YOU WANT TO SUBMIT SARANG)

        // setReport(report.concat({ name: "Team", value: team })
        //     .concat({ name: "Match", value: match })
        //     .concat({ name: "Alliance", value: alliance })
        //     .concat({ name: "Scouter", value: name }),
        //     () => { console.log("FINAL REPORT: " + report); });

        // setReport(report.concat({ name: "Team", value: team }));
        // setReport(report.concat({ name: "Match", value: match }));
        // setReport(report.concat({ name: "Alliance", value: alliance }));
        // setReport(report.concat({ name: "Scouter", value: name }));

        //big bug, widgets of the same name, lower(auto) and lower(teleop) will overwrite each other, maybe add a unique id to each widget
        //push(schemaname, report)
    };

    return (!(Object.keys(activeSchema).length === 0)) ? (
        <div className="scout">
            <div className="container mt-4">
                <Group name="Scouting">
                    <TextField name="Scouter" callback={(_) => _} readonly={name ?? ""} />
                    <ButtonFull name="Submit" callback={() => console.log("HELLO")} />
                </Group>

                {/* <TextField
                    name="Match"
                    type="number"
                    inputMode="decimal"
                    callback={(match) => setMatch(match)}
                />
                <TextField
                    name="Team"
                    type="number"
                    inputMode="decimal"
                    callback={(team) => setTeam(team)}
                />
                <Toggle
                    name="Alliance"
                    trueCol="primary"
                    falseCol="danger"
                    callback={(alliance) => setAlliance(alliance ? "Blue" : "Red")} //make this blue not green
                /> */}

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