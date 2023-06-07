import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthParamProps } from "@/types/auth/auth";

type AuthStoreProps = {
    params: AuthParamProps | null;
    setParams(params: AuthParamProps): void;
};

export const useAuthStore = create(
    persist<AuthStoreProps>(
        (set, get) => ({
            params: null,
            setParams: (params) => set({ params }),
        }),
        {
            name: "authStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
