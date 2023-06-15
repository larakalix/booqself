import { create } from "zustand";
import type { ITenantAttributes, ITenantBooking } from "@/types/models/tenant";

type TenantStoreProps = {
    loading: boolean;
    tenant: ITenantAttributes | null;
    isDashboard: boolean;
    setTenant: (tenant: ITenantAttributes, isDashboard: boolean) => void;
    setLoading: (loading: boolean) => void;
};

export const useTenantStore = create<TenantStoreProps>((set, get) => ({
    loading: false,
    tenant: null,
    isDashboard: false,
    setTenant: (tenant, isDashboard) => set({ tenant, loading: false, isDashboard }),
    setLoading: (loading) => set({ loading }),
}));
