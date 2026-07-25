import { ReceiptField } from '../types';

export const interactiveReceipt: ReceiptField[] = [
  {
    id: 'rc-1',
    turkishTerm: 'MİGROS TİCARET A.Ş. / KADIKÖY ŞUBESİ',
    literalEnglish: 'Migros Commerce Corporation / Kadikoy Branch',
    meaning: 'The corporate merchant identity and specific local store branch name.',
    value: 'MERCHANT HEADER',
    category: 'header',
    cashierDialogue: '"Hoşgeldiniz efendim, Money Kartınız var mı?" (Welcome sir/maam, do you have a Migros club card?)'
  },
  {
    id: 'rc-2',
    turkishTerm: 'TARİH: 14/10/2026 SAAT: 19:35 FİŞ NO: 0048',
    literalEnglish: 'DATE: 14/10/2026 TIME: 19:35 RECEIPT NO: 0048',
    meaning: 'Fiş No (Receipt ID) is essential if you ever need to make a product return or refund at Customer Service (Danışma).',
    value: 'METADATA',
    category: 'header',
    cashierDialogue: '"İade için bu fişi 30 gün içinde atmayın lütfen." (Please do not discard this receipt for 30 days for return rights.)'
  },
  {
    id: 'rc-3',
    turkishTerm: '1 AD x SU 1.5 L (PET)               *14.50',
    literalEnglish: '1 Unit (ADET) x Water 1.5 Liter       14.50 TL',
    meaning: '"AD" or "ADET" stands for quantity count. Asterisk indicates item successfully registered to electronic fiscal cash register.',
    value: '14.50 TL',
    category: 'item'
  },
  {
    id: 'rc-4',
    turkishTerm: '1 AD x ÇAYKUR RİZE ÇAY 1000G      *185.00',
    literalEnglish: '1 Unit x Rize Black Tea 1kg            185.00 TL',
    meaning: 'Black tea (Çay) is Turkey’s national fuel. Grocery tea packs are tax category %01 or %10 staple food.',
    value: '185.00 TL',
    category: 'item',
    cashierDialogue: '"Çayda indirim var, ikinci paketi yarım fiyata almak ister misiniz?" (Discount on tea, want 2nd pack at half price?)'
  },
  {
    id: 'rc-5',
    turkishTerm: '2 AD x POŞET BEDELİ (50 KURUSH)    *1.00',
    literalEnglish: '2 Units x Plastic Shopping Bag Fee     1.00 TL',
    meaning: 'By environmental protection law in Turkey, supermarkets must charge exactly 50 Kuruş (half a lira) per plastic carrier bag ("Poşet").',
    value: '1.00 TL',
    category: 'item',
    cashierDialogue: '"Poşet ister misiniz? Kaç tane olsun?" (Do you want carrier bags? How many should it be?)'
  },
  {
    id: 'rc-6',
    turkishTerm: 'ARA TOPLAM (SUBTOTAL)             200.50',
    literalEnglish: 'INTERMEDIATE TOTAL (Subtotal)        200.50 TL',
    meaning: 'Ara (in-between / middle) + Toplam (Sum). This is your bill amount before discounts or itemized tax breakdown.',
    value: '200.50 TL',
    category: 'total'
  },
  {
    id: 'rc-7',
    turkishTerm: 'KDV %10 DAHİL (VAT TAX INCLUDED)   18.22',
    literalEnglish: 'Katma Değer Vergisi (Value Added Tax) Included',
    meaning: 'KDV is Turkey’s VAT tax. In standard shopping & restaurant dining, KDV is ALWAYS legally included in the sticker tag price! Never let anyone charge 20% on top of an adisyon menu price!',
    value: '18.22 TL',
    category: 'tax',
    cashierDialogue: '"Fiyatlarımıza KDV dahildir efendim." (Our displayed prices already include VAT tax, sir/maam).'
  },
  {
    id: 'rc-8',
    turkishTerm: 'TOPLAM (GRAND TOTAL)              200.50',
    literalEnglish: 'FINAL SUM TOTAL                      200.50 TL',
    meaning: 'The undisputed total you must hand over in Turkish Lira banknotes or credit debit card.',
    value: '200.50 TL',
    category: 'total',
    cashierDialogue: '"Toplam iki yüz lira elli kuruş. Nasıl ödeyeceksiniz?" (Total is 200 lira 50 kurus. How will you pay?)'
  },
  {
    id: 'rc-9',
    turkishTerm: 'NAKİT (CASH GIVEN)                250.00',
    literalEnglish: 'CASH HANDED IN BY CUSTOMER           250.00 TL',
    meaning: '"Nakit" means physical banknotes & metal coins. Conversely, "Kredi Kartı / Temassız" signifies POS electronic payment.',
    value: '250.00 TL',
    category: 'payment',
    cashierDialogue: '"İki yüz elli lira nakit aldım, buyrun para üstünüz." (I received 250 TL cash, here is your change.)'
  },
  {
    id: 'rc-10',
    turkishTerm: 'PARA ÜSTÜ (CHANGE DUE TO YOU)      49.50',
    literalEnglish: 'MONEY ABOVE / OVERPLUS (Change)       49.50 TL',
    meaning: '"Para" (Money) + "Üstü" (Over/Above remainder). This is your change! Always count this before stepping away from the register or cab.',
    value: '49.50 TL',
    category: 'payment',
    cashierDialogue: '"Para üstü 49 Buçuk lira, teşekkür ederiz, tekrar bekleriz!" (Change is 49 and half lira, thank you, we await you again!)'
  },
  {
    id: 'rc-11',
    turkishTerm: 'MALİ DEĞERİ VARDIR / KASİYER: ELİF K.',
    literalEnglish: 'HAS FISCAL VALIDITY VALUE / CASHIER: ELIF K.',
    meaning: '"Mali Değeri Vardır" verifies this printout is an official tax-registered receipt under Turkish Ministry of Finance (Hazine ve Maliye Bakanlığı).',
    value: 'FISCAL SEAL',
    category: 'footer'
  }
];

export const paymentVocabulary = [
  { turkish: 'Temassız var mı?', english: 'Is there contactless pay (Apple/Google Pay / Tap)?', hint: 'The smartest 2-word phrase to avoid counting physical change.' },
  { turkish: 'Para üstü eksik galiba.', english: 'I believe the change is incomplete/short.', hint: 'Use "galiba" (I presume/think) to avoid direct accusation while getting your cash back.' },
  { turkish: 'Adisyonda bu kalem ne, hocam?', english: 'What is this charge item on the restaurant bill, master?', hint: 'Kalem (literally pen/pencil) also means "line-item charge" in business Turkish!' },
  { turkish: 'Kuver / Servis Ücreti', english: 'Cover charge (bread/table setting) / Service tip percentage', hint: 'Some tourist dining rooms add 10% "Servis Ücreti" or 30 TL per-seat "Kuver". Always inspect your Adisyon!' },
  { turkish: 'Fatura kestirebilir miyim?', english: 'Can I get a formal commercial invoice issued?', hint: 'Used for corporate expense reimbursements or university scholarship filings.' },
  { turkish: 'Bozuk para var mı? / Yüz lira bozar mısın?', english: 'Do you have small coins? / Can you break a 100 lira note?', hint: 'Bozuk (broken) in money contexts means small spare coins / pocket change.' }
];
