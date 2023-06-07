import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AuthParamProps } from "@/types/auth/auth";

type AuthStoreProps = {
    params: AuthParamProps | null;
    setParams(params: AuthParamProps): void;
    removeSession(): void;
};

export const useAuthStore = create(
    persist<AuthStoreProps>(
        (set, get) => ({
            params: null,
            setParams: (params) => set({ params }),
            removeSession: () => set({ params: null }),
        }),
        {
            name: "authStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
