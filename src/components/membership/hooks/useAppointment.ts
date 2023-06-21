import type { IFormField } from "@/types/forms/form";
import type { IService } from "@/types/models/service";

export const useAppointment = () => {
    const buildDropdownlists = (services: IService[]) => {
        const serviceDp: IFormField = {
            type: "checkbox",
            label: "Service",
            name: "service",
            required: true,
            options: services.map((service) => ({
                label: service.name,
                value: `${service.id}`,
            })),
        };

        return { serviceDp };
    };

    return {
        buildDropdownlists,
    };
};
