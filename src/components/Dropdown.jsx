import { default as BootstrapDropdown } from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';

const Dropdown = ({ name, prompt, options, callback, widgetCallback }) => {

    const [selected, setSelected] = useState(prompt || "Select an option");

    useEffect(() => {
        if (widgetCallback) {
            widgetCallback({ name: name, value: selected, });
        }
    }, [selected]);

    return (
        <BootstrapDropdown name={name}> {/* I dont know if this works, will check later */}
            <BootstrapDropdown.Toggle variant="primary" id="dropdown-basic" style={{ width: "18rem" }}>
                {selected}
            </BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu>
                {options.map((option) => (
                    <BootstrapDropdown.Item key={option} onClick={() => { callback(option); setSelected(option); }}> {option} </BootstrapDropdown.Item>
                ))}
            </BootstrapDropdown.Menu>
        </BootstrapDropdown>
    );
};

export const DropdownWidget = {
    schemaFields: ["name", "options"], // add prompt field later
    schemaFieldsTypes: ["s", [1]],
    widget: (props, widgetCallback) => {
        return <Dropdown {...{ widgetCallback, ...props }} />;
    },
};

export default Dropdown;