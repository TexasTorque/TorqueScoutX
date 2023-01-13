import React from "react";

import Button from "react-bootstrap/Button";
import Null from "./Null";

const ButtonFull = ({ name, callback, variant }) => {
  return (
    <div className="click">
      <div className="row mt-4 mr-0 mb-0">
        <div className="ml-3 mt-0" style={{ width: "18rem" }}>
          <Button
            className="w-100"
            variant={variant ?? "primary"}
            size="md"
            onClick={() => callback()}
          >
            {name || <Null />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ButtonFullWidget = {
  schemaFields: ["name"],
  schemaFieldsTypes: ["s"],
  widget: ButtonFull,
};

export default ButtonFull;
