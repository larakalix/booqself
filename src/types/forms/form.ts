interface ILabelable {
    id?: string;
    label: string;
}

interface ICommon extends ILabelable {
    name: string;
    required?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    parentId?: string | number;
    validateWithField?: { name: string; value: string | number } | undefined;
}

export type IFormField =
    | IFormTextInput
    | IFormDropdown
    | IFormCheckboxGroup
    | IFormSwitchInput
    | IFormRadioGroup
    | IDatePickerForm;

export interface IFormSelections extends ILabelable {
    value: string;
    disabled?: boolean;
    description?: string;
}

export interface IRegexable {
    regex?: RegExp;
}

export interface IFormTextInput extends ICommon, IRegexable {
    type: "text";
}

export interface IOptionable {
    options: IFormSelections[];
}

export interface IFormDropdown extends ICommon, IOptionable {
    type: "dropdown";
}

export interface IFormCheckboxGroup extends ICommon, IOptionable {
    type: "checkbox";
}

export interface IFormSwitchInput extends ICommon {
    type: "switch";
}

export interface IFormRadioGroup extends ICommon, IOptionable {
    type: "radio";
}

export interface IDatePickerForm extends ICommon {
    type: "date";
}
