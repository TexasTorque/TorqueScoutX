import { ToggleWidget } from "./components/Toggle";
import { MutuallyExclusiveWidget } from "./components/MutuallyExclusive";
import { NumericWidget } from "./components/Numeric";
import { StopwatchWidget } from "./components/Stopwatch";
import { TextFieldWidget } from "./components/TextField";
import { DropdownWidget } from "./components/Dropdown";
import { LabelWidget } from "./components/Label";

export let widgetNames = {
    "Toggle": ToggleWidget, //done points
    "MutuallyExclusive": MutuallyExclusiveWidget, //done points
    "Numeric": NumericWidget, //done points
    "Stopwatch": StopwatchWidget, // doesn't need
    "TextField": TextFieldWidget, // doesn't need
    "Dropdown": DropdownWidget, //check this!!!
    "Label":!! LabelWidget // never used for points
};

let BreakException = {};

export default function schemaValidate(schemaObject) {
    if (!(schemaObject.widgets instanceof Array)) {
        alert("No widgets array!");
        throw BreakException;
    }

    let wN = [];
    for (let i = 0; i < schemaObject.widgets.length; i++) {
        if (wN.includes(schemaObject.widgets[i].name)) {
            alert("Widget " + schemaObject.widgets[i].name + " is duplicated!");
            throw BreakException;
        }
        wN.push(schemaObject.widgets[i].name);
    }

    for (let i = 0; i < schemaObject.widgets.length; i++) {
        if (!(Object.keys(widgetNames).includes(schemaObject.widgets[i].widget))) {
            alert("Widget " + schemaObject.widgets[i].widget + " not found!");
            throw BreakException;
        }

        let fields = widgetNames[schemaObject.widgets[i].widget].schemaFields;
        let fieldTypes = widgetNames[schemaObject.widgets[i].widget].schemaFieldsTypes;

        fields.forEach((field, index) => {
            if (!(Object.keys(schemaObject.widgets[i]).includes(field))) {
                alert("The field " + field + " in widget " + schemaObject.widgets[i].widget + " not found!");
                throw BreakException;
            }

            if (!(typeof schemaObject.widgets[i][field] === typeof fieldTypes[index])) {
                alert("The field " + field + " in widget " + schemaObject.widgets[i].widget + " has to be of " + typeof fieldTypes[index] + " type!");
                throw BreakException;
            }

        });

        Object.keys(schemaObject.widgets[i]).filter((field) => {
            if (!(fields.includes(field)) && !(field === "widget")) {
                alert("Extra field " + field + " in widget " + schemaObject.widgets[i].widget + "!");
                throw BreakException;
            }
        });
    }

    if (!(schemaObject.analysisGroups instanceof Array)) {
        alert("No analysis array!");
        throw BreakException;
    }

    for (let i = 0; i < schemaObject.analysisGroups.length; i++) {

        if (!(schemaObject.analysisGroups[i].name)) {
            alert("No name for analysis group at index " + i + "!");
            throw BreakException;
        }

        for (let j = 0; j < schemaObject.analysisGroups[i].fields.length; j++) {
            
        }

    }

    return true;

}
