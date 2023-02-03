import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, getActiveSchema, getMatchesPerTeam, getTeamReports } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";
import Null from "../../components/Null";

const Averages = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [allData, setAllData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, loading]);


    useEffect(() => {
        getTeamReports().then((data) => {
            processData(data);

        });
    }, [allData]); //maybe remove this lmao

    const populateColumns = (data) => {
        let clmTemp = [];
        Object.keys(data[0]).forEach((key) => {
            clmTemp = [...clmTemp, makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), true)];
        });
        clmTemp = [...clmTemp, makeColumn("Points", "Points", true)];
        setColumns(clmTemp);
    };

    const processData = (data) => {
        for (let i = 0; i < data.length; i++) {
            for (const [key, value] of Object.entries(data[i])) {
                let teamAvgObj = {};
                for (let j = 0; j < value.reports.length; j++) {
                    for (const [key2, value2] of Object.entries(value.reports[j])) {
                        if (typeof value2.value === 'number') {
                            if (teamAvgObj[key2]) {
                                teamAvgObj[key2] += value2.value;
                            } else {
                                teamAvgObj[key2] = value2.value;
                            }
                        }
                    }
                }
                for (const [key3, value3] of Object.entries(teamAvgObj)) {
                    teamAvgObj[key3] = value3 / value.reports.length;
                }
                teamAvgObj["Team"] = key;
                console.log("teamAvgObj: " + key + "\n " + JSON.stringify(teamAvgObj));
                allData.push(teamAvgObj);
                console.log("allData: " + JSON.stringify(allData));
            }
        }
        populateColumns(allData);
    };

    return (
        columns.length > 0 ?
            <div className="home">
                <div className="mt-4" style={{ width: "200%" }}>
                    <Group name="Averages">
                        <ButtonFull name="Back to Analysis" callback={() => navigate("/analysis/analysis-index")} />
                        <br></br>
                        <div className="table-container">
                            <Table json={allData} defaultSortField="Team" columns={columns} />
                        </div>
                    </Group>
                </div>
            </div> : <Null />
    );

};

export default Averages;