import { getGlobalLeadership, getStrategyPage } from '@/lib/sanity';
import GlobalStrategyClient from '@/components/strategy/GlobalStrategyClient';
import { getORCIDWorks } from '@/lib/orcid';
import { valueFromSettled } from '@/lib/asyncUtils';

export const revalidate = 60;

export default async function GlobalStrategyPage() {
  const settled = await Promise.allSettled([
    getGlobalLeadership(),
    getORCIDWorks(),
    getStrategyPage(),
  ]);
  const leadership = valueFromSettled(settled[0], []);
  const orcidWorks = valueFromSettled(settled[1], []);
  const strategyPage = valueFromSettled(settled[2], null);
  return (
    <GlobalStrategyClient
      leadership={leadership}
      orcidWorks={orcidWorks}
      orcidCount={orcidWorks.length}
      strategyPage={strategyPage}
    />
  );
}
