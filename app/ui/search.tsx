'use client';
// файл використовує клієнтський код (client-side JavaScript)
// @file: /app/ui/search
// компонент для використання іконки лупи
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// хуки для роботи з параметрами пошуку, шляхом та маршрутизацією
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// для запобігання лишнім запитам дло бази даних
import { useDebouncedCallback } from 'use-debounce';

// компонент, який приймає пропс для тексту у полі введення
export default function Search({ placeholder }: { placeholder:string }) {
  // для отримання параметрів пошуку з URL
  const searchParams = useSearchParams();
  // для отримання шляху (URL-шлях без параметрів)
  const pathname = usePathname();
  // отримуємо метод хука об'єкту маршрутизації
  const { replace } = useRouter();

/*
    колбек огортає функцію пошуку і запускає код лише
	через певний час після того, як користувач
	припинить вводити текст (тут 300 мс)
  */
  const handleSearch = useDebouncedCallback( (term:string) => {
    console.log(`Searching... ${term}`);
    // створюємо об'єкт на основі поточних параметрів пошуку
    const params = new URLSearchParams(searchParams);
    // скидуємо на першу сторінку
	params.set('page', '1');
	if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
	// замінюємо поточний URL новим, який включає оновлені параметри пошуку
	replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
	  {/* лейбл, доступний лише для скрін рідерів (screen readers) */}
      <label htmlFor="search" className="sr-only">
        Search
      </label>
	  {/* поле введення для пошуку з обробником подій */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
		onChange={(e) => { handleSearch(e.target.value) }}
		defaultValue={searchParams.get('query')?.toString()}
      />
	  {/* іконка лупи, яка відображається зліва у полі введення */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
