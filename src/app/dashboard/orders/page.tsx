import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { OrdersWithFilter } from "@/components/orders/OrdersWithFilter";

export default function OrdersPage() {
    return (
        <PageWrapper>
            <header className="w-full lg:flex lg:items-center lg:justify-between p-6">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Orders
                    </h2>
                </div>
            </header>

            <OrdersWithFilter />
        </PageWrapper>
    );
}
