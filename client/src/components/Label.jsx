const Label = ({ name }) => {
    const splitText = name.split(",,").map((line, index) => (
        <div key={index} style={{ textAlign: "center", wordBreak: "break-word" }}>{line}</div>
    ));

    return (
        <div 
            className="label" 
            style={{ 
                fontSize: "1rem",
                padding: "2px 2px",  
                maxWidth: "fit-content",
                display: "inline-block",
                textAlign: "center"
            }}
        >
            <hr style={{ borderTop: "1px solid lightgray", margin: "2px 0" }} />
            {splitText}
            <hr style={{ borderTop: "1px solid lightgray", margin: "2px 0" }} />
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
