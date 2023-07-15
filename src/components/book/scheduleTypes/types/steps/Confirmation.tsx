import { useContext } from "react";
import { format } from "date-fns";
import { useToasts } from "react-toast-notifications";
import { useWizardStore } from "@/stores/appointmentWizardStore";
import { StepperActions } from "../childs/StepperActions";
import { useSuccesBookingStore } from "@/stores/bookingStore";
import { type WizarContextProps, WizardContext } from "../../WizardProvider";
import { useRegisterForm } from "@/components/register/hooks/useRegisterForm";
import { AppointmentService } from "@/services/appointment/AppointmentServices";

export const Confirmation = () => {
    const { addToast } = useToasts();
    const { boilerplate, selectedDay, formFields, timeOptions } = useContext(WizardContext) as WizarContextProps;
    const { buildAppointment } = useRegisterForm({ formFields });
    const { setAppointment } = useSuccesBookingStore((state) => state);
    const {
        step,
        setStep,
        info,
        time,
        service: serviceId,
        employee: employeeId,
    } = useWizardStore((state) => state);

    const hour = timeOptions.find((t) => t.value === time)?.label!;
    const employee = boilerplate.employees.elements.find((employee) => `${employee.id}` === employeeId);
    const service = boilerplate.services.elements.find((service) => `${service.id}` === serviceId);

    const handleClick = async () => {
        const appointment = buildAppointment(
            selectedDay!,
            timeOptions,
            {...info!, employee: employeeId, service: serviceId, time },
            boilerplate
        );

        const response = boilerplate?.appointment
            ? await AppointmentService().update(
                  boilerplate?.appointment.id,
                  appointment,
                  boilerplate.tenant.data.id
              )
            : await AppointmentService().create(
                  appointment,
                  boilerplate.tenant.data.id
              );

        if (response?.id) {
            setAppointment({ ...response });
            addToast("Appointment booked successfully", {
                appearance: "success",
                autoDismiss: true,
            });
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Confirm your appointment
            </h2>

            <p className="px-12">
                You are about to book an appointment with us. Please confirm the
                details below.
            </p>

            <ol className="my-2">
                <li>
                    <span className="font-bold">Name:</span> {info?.name}
                </li>
                <li>
                    <span className="font-bold">Email:</span> {info?.email}
                </li>
                <li>
                    <span className="font-bold">Phone:</span> {info?.phone}
                </li>
                <li>
                    <span className="font-bold">Day:</span>{" "}
                    <time dateTime={format(selectedDay!, "yyyy-MM-dd")}>
                        {format(selectedDay!, "MMM dd, yyy")}
                    </time>
                </li>
                <li>
                    <span className="font-bold">Hour:</span> {hour}
                </li>
                <li>
                    <span className="font-bold">Employee:</span>{" "}
                    {employee?.name}
                </li>
                <li>
                    <span className="font-bold">Service:</span> {service?.name}
                </li>
            </ol>

            <p className="px-12">
                If you need to change any of the details above, please go back,
                otherwise click on the{" "}
                <span className="font-bold">
                    {boilerplate?.appointment ? "Reschedule" : "Book now"}
                </span>{" "}
                button below to confirm your appointment.
            </p>

            <StepperActions
                className="w-full"
                step={step}
                handleBack={() => setStep(step - 1)}
            >
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded-lg text-sm px-5 py-5 text-center mr-2 mb-2"
                    // disabled={isSubmitting || !selectedDay}
                    onClick={() => handleClick()}
                >
                    {boilerplate?.appointment ? "Reschedule" : "Book now"}
                </button>
            </StepperActions>
        </div>
    );
};
