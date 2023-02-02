import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, getMatchesPerTeam } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";
import Null from "../../components/Null";

const AnalysisIndex = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const { team } = useParams();
    const [teamData, setTeamData] = useState(null);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, loading]);

    useEffect(() => {
        getMatchesPerTeam(team).then((data) => {
            populateColumns(data);
            setTeamData(processData(data));

            console.log("COLUMNS ");
            columns.forEach((column) => {
                console.log(column);
            });
        });
    }, [team]);

    useEffect(() => {
        console.log("TEAM DATA BITCHES: " + JSON.stringify(teamData));
    }, [teamData]);

    const populateColumns = (data) => {
        let clmTemp = [];
        Object.keys(data[0]).forEach((key) => {
            clmTemp = [...clmTemp, makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), true)];
        });
        clmTemp = [...clmTemp, makeColumn("Points", "Points", false)];
        setColumns(clmTemp);
    };

    const processData = (data) => {
        return data.map((row) => {
            let toReturn = {};

            let points = 0;

            Object.keys(row).forEach((name) => {
                toReturn[name.replace(/\s/g, '').replaceAll('.', '')] = row[name].value ?? row[name];
                points += row[name].points ? row[name].points : 0; // remove undefines
                console.log(row[name].points);
            });
            toReturn["Points"] = points;
            return toReturn;
        });
    };

    return (
        columns.length > 5 && teamData && Object.keys(teamData).length !== 0 ?
            <div className="home">
                <div className="mt-4" style={{ width: "100rem" }}>
                    <Group name={"Data for Team " + team} style={{ width: "100%" }}>
                        <ButtonFull name="Back to Analysis" callback={() => navigate("/analysis/analysis-index")} />
                        <br></br>
                        <div className="table-container">
                            <Table json={teamData} columns={columns} style={{ width: "100%" }} excludingAccessorsArray={["Team"]} defaultSortField="Match" /> {/*// add default sortfield later*/}
                        </div>
                    </Group>
                </div>
            </div> : <Null />
    );


};



export default AnalysisIndex;