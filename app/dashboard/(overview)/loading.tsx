// @file: /app/dashboard/loading.tsx
// заготовка для попереднього UI
import DashboardSkeleton from '@/app/ui/skeletons';


export default function Loading() {
  return (
    <>
      <DashboardSkeleton />
	  <div>Loading...</div>
	</>  
  );
}

