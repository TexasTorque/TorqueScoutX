import { default as BootstrapDropdown } from 'react-bootstrap/Dropdown';
import { useState } from 'react';

const Dropdown = ({ prompt, options, callback }) => {

    const [selected, setSelected] = useState(prompt || "Select an option");
    return (
        <BootstrapDropdown>
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
    schemaFields: ["name", "options"],
    schemaFieldsTypes: ["s", [1]],
    widget: Dropdown,
};

export default Dropdown;