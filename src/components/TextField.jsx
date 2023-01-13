import React from "react";
import Form from "react-bootstrap/Form";

import Null from "./Null";

const TextField = ({
  name,
  callback,
  placeholder,
  readonly,
  type,
  inputMode,
}) => {
  return (
    <div className="numeric">
      <div className="row mt-4 mr-3">
        <h4 className="name-field ml-3 mt-2" style={{ width: "8rem" }}>
          {name || <Null />}
        </h4>
        <div className="ml-0 mt-1" style={{ width: "10rem" }}>
          <Form.Control
            disabled={readonly != null}
            onChange={(e) => callback(e.target.value)}
            className="w-100"
            type={type ?? "text"}
            placeholder={placeholder ?? readonly ?? ""}
            inputMode={inputMode}
          />
        </div>
      </div>
    </div>
  );
};

export const TextFieldWidget = {
  schemaFields: ["name"],
  schemaFieldsTypes: ["s"],
  widget: TextField,
};

export default TextField;
