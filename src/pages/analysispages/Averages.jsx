import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getTeamReports } from "../../firebase";
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

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, loading]);


    useEffect(() => {
        getTeamReports().then((data) => {
            processData(data);

        });
    }, [allData]);

    const populateColumns = (data) => {
        let clmTemp = [];
        Object.keys(data[0]).forEach((key) => {
            clmTemp = [...clmTemp, makeColumn(key, key.replace(/\s/g, '').replaceAll('.', ''), true)];
        });
        setColumns(clmTemp);
    };

    const processData = (data) => {
        for (let i = 0; i < data.length; i++) {
            for (const [key, value] of Object.entries(data[i])) {
                let teamAvgObj = {};
                for (let j = 0; j < value.reports.length; j++) {
                    for (const [key2, value2] of Object.entries(value.reports[j])) {
                        let checkVal = value2.value ? value2.value : value2;
                        checkVal = (typeof checkVal === 'string') ? (value2.points ? value2.points : checkVal) : checkVal;
                        console.log("KEY: ", key2, "VALUE: ", checkVal, "TYPE: ", typeof checkVal, "\n");
                        checkVal = (typeof checkVal === 'boolean') ? (checkVal ? 1 : 0) : checkVal;
                        if (typeof checkVal === 'number') {
                            if (teamAvgObj[key2]) {
                                teamAvgObj[key2] += checkVal;
                            } else {
                                teamAvgObj[key2] = checkVal;
                            }
                        }
                    }
                }
                for (const [key3, value3] of Object.entries(teamAvgObj)) {
                    teamAvgObj[key3] = (value3 / value.reports.length).toFixed(2);
                }
                teamAvgObj["Team"] = key;
                let teamAvgObjTrimmed = {};
                for (const [key4, value4] of Object.entries(teamAvgObj)) {
                    teamAvgObjTrimmed[key4.replace(/\s/g, '').replaceAll('.', '')] = value4;
                }
                allData.push(teamAvgObjTrimmed);
            }
        }
        // console.log("allData: \n", allData);
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
                            <Table json={allData} defaultSortField="Points" columns={columns} />
                        </div>
                    </Group>
                </div>
            </div> : <Null />
    );

};

export default Averages;