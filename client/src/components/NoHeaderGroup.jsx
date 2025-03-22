import React from "react";
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

const NoHeaderGroup = ({ children, manualChildren, widgetCallback }) => {

  return (
    <div className="row ml-2 mb-4">
      <Card>
        
        <div className="ml-4 mr-4 mb-4">{
          manualChildren != null ?
            manualChildren.map((widget) => {
              return (
                <h1>{widgetNames[widget.widget].widget({ widgetCallback, ...widget })}</h1>
              );
            }
            ) : children}
        </div>
      </Card>
    </div>
  );
};

/* When report is initially defined in Scout.jsx, the inner component fields of each Group might not get added when the program loads */

export default NoHeaderGroup;
