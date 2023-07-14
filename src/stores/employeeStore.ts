import { create } from "zustand";
import type { IEmployee } from "@/types/models/employee";

type EmployeeStoreProps = {
    loading: boolean;
    employee: IEmployee | null;
    setEmployee: (employee: IEmployee) => void;
};

export const useEmployeeStore = create<EmployeeStoreProps>((set, get) => ({
    loading: false,
    employee: null,
    setEmployee: (employee) => set({ employee, loading: false }),
}));
