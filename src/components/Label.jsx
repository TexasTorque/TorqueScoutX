const Label = ({ name }) => {
    return (
        <div className="label">
            <hr style={{ borderTop: "5px solid light gray" }} />
            <h1 style={{ textAlign: "left" }}>{name}</h1>
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


