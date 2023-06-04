import type { IFormField } from "@/types/forms/form";
import type { ITenantBooking } from "@/types/models/tenant";

export const useAppointments = () => {
    // const timeOptions = generateTimeArray<IFormSelections>(
    //     "9:00 AM",
    //     "4:00 PM",
    //     60
    // );

    const buildDropdownlists = (tenant: ITenantBooking) => {
        const employeeDp: IFormField = {
            type: "dropdown",
            label: "Service Technician",
            name: "employee",
            required: true,
            options: tenant.employees.map((employee) => ({
                label: employee.name,
                value: `${employee.id}`,
            })),
        };

        const serviceDp: IFormField = {
            type: "dropdown",
            label: "Service",
            name: "service",
            required: true,
            options: tenant.services.map((service) => ({
                label: service.name,
                value: `${service.id}`,
            })),
        };

        return { employeeDp, serviceDp };
    };

    return { buildDropdownlists };
};
