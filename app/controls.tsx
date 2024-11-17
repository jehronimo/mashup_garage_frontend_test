import Select from "react-select";
import { User } from "./types/user";

export type ControlsProps = {
  setSortField: (field: keyof User) => void;
  setSortDirection: (direction: "ascending" | "descending" | undefined) => void;
};

const Controls = ({setSortField, setSortDirection}: ControlsProps) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select onChange={e => setSortField(e!.value as keyof User)} options={fieldOptions} inputId="sort-field" className="input" />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          onChange={e => setSortDirection(e!.value as "ascending" | "descending")}
          options={directionOptions}
          inputId="sort-direction"
          className="input"
        />
      </div>
    </div>
  );
};

export default Controls;
