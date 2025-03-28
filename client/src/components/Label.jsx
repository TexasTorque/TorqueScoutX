const Label = ({ name }) => {
    const splitText = name.split(",,").map((line, index) => (
        <div key={index} style={{ textAlign: "center", wordWrap: "break-word" }}>{line}</div>
    ));

    return (
        <div className="label" style={{ fontSize: "1.3rem", padding: "5px" }}>
            <hr style={{ borderTop: "3px solid lightgray" }} />
            {splitText}
            <hr style={{ borderTop: "3px solid lightgray" }} />
        </div>
    );
};

export const LabelWidget = {
    schemaFields: ["name"],
    schemaFieldsTypes: ["s"],
    widget: function (props) {
        return <Label {...props} />;
    },
};

export default Label;
