import { ToggleWidget } from "./components/Toggle";


let widgetNames = {
    "Toggle": ToggleWidget
};


export default function schemaValidate(schemaObject) {
    if (!(schemaObject.widgets instanceof Array)) {
        alert("No widgets array!");
        return;
    }

    for (let i = 0; i < schemaObject.widgets.length; i++) {
        if (!(Object.keys(widgetNames).includes(schemaObject.widgets[i].widget))) {

            alert("Widget not found!");
            return;

        }

        let fields = widgetNames[schemaObject.widgets[i].widget].schemaFields;

        fields.forEach((field) => {
            if (!(Object.keys(schemaObject.widgets[i]).includes(field))) {
                alert(field + " not found!");
                return;
            }
        });
    }


}
