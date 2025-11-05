'use client';
import { useQuery } from '@tanstack/react-query';
import { TokenInfoCard, LocksSection, AllocationChart, AuditCard, ContractBox, PageHeader, FootNotes } from "@/components/transparency";
import { fetchTokenInfo, fetchLocks, fetchAllocation, fetchAudit } from "@/lib/api/transparency";

export default function TransparencyPage() {
  const tokenQ = useQuery({ queryKey: ['tokenInfo'], queryFn: fetchTokenInfo, staleTime: 5 * 60_000 });
  const locksQ = useQuery({ queryKey: ['locks'], queryFn: fetchLocks, refetchInterval: 10 * 60_000 });
  const allocQ = useQuery({ queryKey: ['allocation'], queryFn: fetchAllocation });
  const auditQ = useQuery({ queryKey: ['audit'], queryFn: fetchAudit });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <PageHeader />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-9 space-y-6">
          <TokenInfoCard data={tokenQ.data} loading={tokenQ.isLoading} error={tokenQ.error} />
          <LocksSection data={locksQ.data} loading={locksQ.isLoading} error={locksQ.error} />
          <AllocationChart data={allocQ.data} loading={allocQ.isLoading} error={allocQ.error} />
        </div>
        <aside className="xl:col-span-3 space-y-6">
          <AuditCard data={auditQ.data} loading={auditQ.isLoading} />
          <ContractBox />
        </aside>
      </div>
      <FootNotes />
    </div>
  );
}
