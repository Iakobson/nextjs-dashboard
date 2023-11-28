'use server';
// @path: @/app/lib/actions.ts
// для визначення схеми об'єкта форми та валідації її даних
import { z } from 'zod';
// для роботи з базою даних PostgreSQL
import { sql } from '@vercel/postgres';

// визначення схеми форми за допомогою zod
const FormSchema = z.object( {
  id: z.string(),
  customerId: z.string(),
  // забезпечує перетворення значення на число
  amount: z.coerce.number(),
  // перевірка, що значення є одним із заданих переліком
  status: z.enum(['pending', 'paid']),
  date: z.string(),
} );
// визначення окремої схеми для створення рахунку, виключаючи id і date
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// додає дані щодо нового рахунку в базу даних
export async function createInvoice(formData:FormData) {
  // витягуємо необхідні дані з форми та валідуємо їх
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // переводимо суму рахунку з доларів в центи
  const amountInCents = amount * 100;
  // отримуємо поточну дату у форматі ISO та відділяємо час від дати
  const date = new Date().toISOString().split('T')[0];
  // test it out:
  console.log(`amountInCents: ${amountInCents} on ${date}.`);
  // використовуємо sql-запит для вставки нового рахунку в базу даних
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
}

