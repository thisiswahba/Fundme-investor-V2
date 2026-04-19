export interface BankAccount {
  id: number;
  bank: string;
  bankEn: string;
  iban: string;
  primary: boolean;
}

export const bankAccounts: BankAccount[] = [
  { id: 1, bank: 'البنك الأهلي', bankEn: 'Al Ahli Bank', iban: 'SA•••• •••• •••• ١٢٣٤', primary: true },
  { id: 2, bank: 'بنك الراجحي', bankEn: 'Al Rajhi Bank', iban: 'SA•••• •••• •••• ٥٦٧٨', primary: false },
  { id: 3, bank: 'بنك الرياض', bankEn: 'Riyad Bank', iban: 'SA•••• •••• •••• ٩٠١٢', primary: false },
  { id: 4, bank: 'البنك السعودي الفرنسي', bankEn: 'Banque Saudi Fransi', iban: 'SA•••• •••• •••• ٣٤٥٦', primary: false },
];
