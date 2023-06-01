import { PageWrapper } from "@/components/wrapper/PageWrapper";
import { ClientService } from "@/services/client/ClientService";
import { ClientsWithFilter } from "@/components/client/ClientsWithFilter";
import type { IMeta } from "@/types/models/generic";

export default async function ClientsPage() {
    const result = await ClientService().getByFilter(
        process.env.NEXT_APP_CLIENT_ID!,
        { offset: 0, limit: 10 }
    );

    return (
        <PageWrapper>
            <header className="w-full lg:flex lg:items-center lg:justify-between p-8 border-b border-gray-200">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Clients
                    </h2>
                </div>
            </header>

            <ClientsWithFilter
                clients={result?.data ?? []}
                meta={result?.meta ?? ({} as IMeta)}
            />
        </PageWrapper>
    );
}
