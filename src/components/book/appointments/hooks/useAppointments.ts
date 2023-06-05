import type { IFormField } from "@/types/forms/form";
import type { IFlatAppointment } from "@/types/models/appointment";
import type { IOptionable } from "@/types/models/generic";
import type { ITenantBooking } from "@/types/models/tenant";
import { format, intlFormat } from "date-fns";

export const useAppointments = ({
    timeOptions,
    appointments,
    selectedDay,
}: {
    timeOptions: IOptionable[];
    appointments: IFlatAppointment[];
    selectedDay: Date | null;
}) => {
    const generateOptionsByAppointments = (): IOptionable[] => {
        if (!appointments || !selectedDay) return timeOptions;

        const existingTimes = appointments
            .filter(({ appointmentDay }) =>
                appointmentDay.startsWith(format(selectedDay, "yyyy-MM-dd"))
            )
            .map(({ appointmentDay }) =>
                intlFormat(new Date(appointmentDay), {
                    hour: "numeric",
                    minute: "numeric",
                })
            );

        const filteredTimes = timeOptions.filter(
            (option) =>
                !existingTimes.some(
                    (time) =>
                        time.replace(/\s/g, "") ===
                        option.label.replace(/\s/g, "")
                )
        );

        return filteredTimes;
    };

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

        const timeOptions = generateOptionsByAppointments();

        return { timeOptions, employeeDp, serviceDp };
    };

    return { buildDropdownlists };
};
