import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { auth, getMatchesPerTeam } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";

const AnalysisIndex = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const { team } = useParams();
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, loading]);

    useEffect(() => {
        getMatchesPerTeam(team).then((data) => {
            populateColumns(data);
            setTeamData(processData(data));
            columns.forEach((column) => {
                console.log(JSON.stringify(column));
            });
        });
    }, [team]);

    const columns = [];
    const populateColumns = (data) => {
        Object.keys(data[0]).forEach((key) => {
            columns.push(makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), false));

        });
    };

    useEffect(() => {
        console.log("TEAM DATA BITCHES: " + JSON.stringify(teamData));
    }, [teamData]);

    const processData = (data) => {
        return data.map((row) => {
            let toReturn = {};

            Object.keys(row).forEach((name) => {
                toReturn[name.replace(/\s/g, '').replaceAll('.', '')] = row[name].value ?? row[name];
            });
            return toReturn;
        });
    };

    return (
        <div className="home">
            <div className="mt-4" style={{ width: "100rem" }}>
                <Group name={"Data for Team " + team} style={{ width: "100%" }}>
                    <ButtonFull name="Back to Analysis" callback={() => navigate("/analysis")} />
                    <br></br>
                    <div className="table-container">
                        <Table columns={columns} /> {/*// add default sortfield later*/}
                    </div>
                </Group>
            </div>
        </div>
    );


};



export default AnalysisIndex;