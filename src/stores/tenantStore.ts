import { create } from "zustand";
import type { ITenantAttributes, ITenantBooking } from "@/types/models/tenant";

type TenantStoreProps = {
    loading: boolean;
    tenant: ITenantAttributes | null;
    setTenant: (tenant: ITenantAttributes) => void;
    setLoading: (loading: boolean) => void;
};

export const useTenantStore = create<TenantStoreProps>((set, get) => ({
    loading: false,
    tenant: null,
    setTenant: (tenant) => set({ tenant, loading: false }),
    setLoading: (loading) => set({ loading }),
}));
