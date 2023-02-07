import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { ToggleWidget } from "./Toggle";
import { MutuallyExclusiveWidget } from "./MutuallyExclusive";
import { NumericWidget } from "./Numeric";
import { StopwatchWidget } from "./Stopwatch";
import { TextFieldWidget } from "./TextField";
import { DropdownWidget } from "./Dropdown";
import { LabelWidget } from "./Label";
import { SubgroupWidget } from "./Subgroup";

let widgetNames = {
  "Toggle": ToggleWidget,
  "MutuallyExclusive": MutuallyExclusiveWidget,
  "Numeric": NumericWidget,
  "Stopwatch": StopwatchWidget,
  "TextField": TextFieldWidget,
  "Dropdown": DropdownWidget,
  "Label": LabelWidget,
  "Subgroup": SubgroupWidget,
};

const Group = ({ name, children, manualChildren, onEvent }) => {

  useEffect(() => {
    console.log(manualChildren == null);
  }, [manualChildren]);
  return (
    <div className="row ml-2 mb-4">
      <Card>
        {name != null ? (
          <Card.Header>
            <h3>{name}</h3>
          </Card.Header>
        ) : (
          ""
        )}
        {
          manualChildren != null
            ?
            (<div className="ml-4 mr-4 mb-4">{
              manualChildren.map((widget) => {
                return (
                  <h1>{widgetNames[widget.widget].widget(widget, () => { console.log("Widget Called"); })}</h1>
                );
              })}</div>)
            :
            (<div className="ml-4 mr-4 mb-4">{children}</div>)
        }
      </Card>
    </div>
  );
};

export const GroupWidget = {
  schemaFields: ["name", "manualChildren", /*"onEvent"*/],
  schemaFieldsTypes: ["s", [1], /*[1]*/],
  widget: (props) => {
    return <Group {...props} />;
  }
};

export default Group;
