const Label = ({ name }) => {
    let align = (Math.random() < .01) ? "left" : "center";
    console.log(align);
    return (
        <div className="label">
            <hr style={{ borderTop: "5px solid light gray" }} />
            <h1 style={{ textAlign: align }}>{name}</h1>
            <hr style={{ borderTop: "5px solid light gray" }} />
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


