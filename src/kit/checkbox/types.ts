import * as UiCheckbox from "@radix-ui/react-checkbox";

export type CheckboxProps = React.ComponentPropsWithoutRef<
    typeof UiCheckbox.Root
> & {
    children: React.ReactNode;
};
