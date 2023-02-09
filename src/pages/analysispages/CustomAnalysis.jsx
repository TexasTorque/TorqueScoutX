import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getTeamReports } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Table, { makeColumn } from "../../components/Table";
import ButtonFull from "../../components/ButtonFull";
import Group from "../../components/Group";
import Null from "../../components/Null";
import { getActiveSchema } from "../../firebase";
import { averagePoints } from "../../Custom";

const CUFS = {
    "averagePoints": averagePoints,
};

const CustomAnalysis = () => {

    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [allData, setAllData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [activeSchema, setActiveSchema] = useState({});

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user, loading]);


    useEffect(() => {
        getActiveSchema().then((schema) => {
            setActiveSchema(schema);
        });
    }, []);

    useEffect(() => {
        if (Object.keys(activeSchema).length === 0) return;

        getTeamReports().then((data) => {
            processData(data);
        });
    }, [activeSchema]);

    const populateColumns = (data) => {

    };

    const processData = (data) => {
        console.log(data);

        let analysisGroups = activeSchema.schema.analysisGroups;
        console.log(analysisGroups);

        for (let i = 0; i < analysisGroups.length; i++) {
            CUFS[analysisGroups[i].mode](data, analysisGroups[i]);

        }

    };

    return (
        columns.length > 0 ?
            <div className="home">
                <div className="mt-4" style={{ width: "200%" }}>
                    <Group name="Custom Averages">
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

export default CustomAnalysis;