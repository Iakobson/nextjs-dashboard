// @file: /app/dashboard/page.tsx

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// функція для отримання даних для <RevenueChart/>
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';

// тут дані отримують три компоненти
export default async function Page() {
  // інфо з бази: доходи по місяцях
  const revenue = await fetchRevenue();
  // інфо з бази: останні 5 рахунків
  const latestInvoices = await fetchLatestInvoices();
  // інфо з бази: статистика по рахунках та клієнтах
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Financial Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* графік доходів по місяцях /> */}
		<RevenueChart revenue={revenue} />
		{/* таблиця з останніх 5-ти рахунків /> */}
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
