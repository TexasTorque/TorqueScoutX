import React from "react";

const Subgroup = ({ name, alias }) => {
    return (
        <div>
            {name && <h2 style={{ fontSize: "1.8rem" }}>{alias ?? name}</h2>}
            <hr style={{ borderTop: "5px solid light gray" }} />
        </div>
    );
};

export const SubgroupWidget = {
    schemaFields: ["name"],
    schemaFieldsTypes: ["s"],
    widget: (props) => {
        return <Subgroup {...props} />;
    }
};

export default Subgroup;
