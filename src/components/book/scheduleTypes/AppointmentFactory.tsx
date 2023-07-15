import dynamic from "next/dynamic";
import { Loading } from "@/components/generic/Loading";
import { DynamicImportError } from "@/components/generic/DynamicImportError";
import type {
    AppointmentFormProps,
    ScheduleData,
    ScheduleType,
} from "@/types/forms/appointment.form";

const DynamicWizard = dynamic(
    () =>
        import("./types/AppointmentWizard").then(
            (mod) => mod.AppointmentWizard
        ),
    {
        loading(loadingProps) {
            if (loadingProps.error)
                return <DynamicImportError loadingProps={loadingProps} />;
            else return <Loading />;
        },
    }
);
const DynamicForm = dynamic(
    () => import("./types/AppointmentForm").then((mod) => mod.AppointmentForm),
    {
        loading(loadingProps) {
            if (loadingProps.error)
                return <DynamicImportError loadingProps={loadingProps} />;
            else return <Loading />;
        },
    }
);

type Props = {
    type: ScheduleType;
} & ScheduleData;

export const AppointmentFactory = ({
    boilerplate,
    selectedDay,
    timeOptions,
    formFields,
    loading,
    employees,
    services,
    type = "Form",
}: AppointmentFormProps & Props) => {
    const componentsMap = {
        Wizard: (
            <DynamicWizard
                loading={loading}
                boilerplate={boilerplate}
                selectedDay={selectedDay!}
                timeOptions={timeOptions}
                formFields={formFields.filter(
                    (field) =>
                        field.name !== "time" &&
                        field.name !== "employee" &&
                        field.name !== "service"
                )}
                employees={employees}
                services={services}
            />
        ),
        Form: (
            <DynamicForm
                loading={loading}
                boilerplate={boilerplate}
                selectedDay={selectedDay!}
                timeOptions={timeOptions}
                formFields={formFields}
            />
        ),
    };

    if (loading) return <div>Loading...</div>;

    return componentsMap[type] || UnknownTypeComponent;
};

const UnknownTypeComponent = () => {
    return <div>Unknown type</div>;
};
