interface ILabelable {
    id?: string;
    label: string;
}

interface ICommon extends ILabelable {
    name: string;
    required?: boolean;
}

export type IFormField =
    | IFormTextInput
    | IFormDropdown
    | IFormCheckboxGroup
    | IFormSwitchInput
    | IFormRadioGroup;

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
