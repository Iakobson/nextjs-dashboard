// @file: /app/ui/dashboard/revenue-chart
import { lusitana } from '@/app/ui/fonts';
import { CalendarIcon } from '@heroicons/react/24/outline';
// функція для генерації даних для вісі Y графіка на основі надходжень
import { generateYAxis } from '@/app/lib/utils';
// типізація для Дохід
import { Revenue } from '@/app/lib/definitions';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

// основний компонент, який відображає графік надходжень
export default async function RevenueChart({revenue}: {
  revenue: Revenue[];
}) {
  // висота графіка
  const chartHeight = 350;
  // генерація даних для вісі Y
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  // якщо немає даних, виводить повідомлення
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  // відображення графіка та інформації про дохід
  return (
    <div className="w-full md:col-span-4">
	  {/* заголовок графіка // шрифт Lusitana */}
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
       {/* контейнер для графіка */}
       <div className="rounded-xl bg-gray-50 p-4">
        {/* головна сітка графіка з віссю Y та колонками для кожного місяця */}
		<div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* вісь Y з підписами */}
		  <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          {/* колонки для кожного місяця на графіку */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              {/* колонка графіка з висотою, залежною від доходу за місяць */}
			  <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              {/* підпис місяця, обернений на 90 градусів */}
			  <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
		{/* інформація про період часу, для якого виводиться графік */}
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
