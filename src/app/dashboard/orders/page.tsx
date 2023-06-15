import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { OrdersWithFilter } from "@/components/orders/OrdersWithFilter";

export default function OrdersPage() {
    return (
        <PageWrapper title="Orders">
            <OrdersWithFilter />
        </PageWrapper>
    );
}
