// Comprehensive Turkish Crash Course Content - 3 Day Maximum Efficiency

export interface Phrase {
  turkish: string;
  english: string;
  pronunciation: string;
  context?: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  phrases: Phrase[];
  tips?: string[];
}

// DAY 1: SURVIVAL ESSENTIALS - The most critical words/phrases
export const day1Lessons: Lesson[] = [
  {
    id: 'greetings',
    title: 'Greetings & Basics',
    icon: '👋',
    phrases: [
      { turkish: 'Merhaba', english: 'Hello / Hi', pronunciation: 'mer-HA-ba' },
      { turkish: 'Günaydın', english: 'Good morning', pronunciation: 'gü-NAY-dın' },
      { turkish: 'İyi akşamlar', english: 'Good evening', pronunciation: 'ee-YI ak-SHAM-lar' },
      { turkish: 'İyi geceler', english: 'Good night', pronunciation: 'ee-YI ge-JE-ler' },
      { turkish: 'Hoş geldiniz', english: 'Welcome (to you)', pronunciation: 'hosh gel-DI-niz' },
      { turkish: 'Hoş bulduk', english: 'Nice to be here (response)', pronunciation: 'hosh bul-DOOK' },
      { turkish: 'Memnun oldum', english: 'Nice to meet you (masc)', pronunciation: 'mem-NOON ol-DOOM' },
      { turkish: 'Memnun oldum', english: 'Nice to meet you (fem)', pronunciation: 'mem-NOON ol-DOOM' },
      { turkish: 'Nasılsınız?', english: 'How are you? (formal)', pronunciation: 'na-sul-SUH-nuz?' },
      { turkish: 'İyiyim, teşekkürler', english: "I'm fine, thank you", pronunciation: 'ee-YI-yim, te-she-kür-LER' },
      { turkish: 'Görüşürüz', english: 'Goodbye / See you', pronunciation: 'gö-rü-SHÜR-üz' },
      { turkish: 'Allaha ısmarladık', english: 'Goodbye (leaving)', pronunciation: 'a-la ish-mar-la-DOOK' },
      { turkish: 'Evet', english: 'Yes', pronunciation: 'E-vet' },
      { turkish: 'Hayır', english: 'No', pronunciation: 'ha-YIR' },
      { turkish: 'Lütfen', english: 'Please', pronunciation: 'LÜT-fen' },
      { turkish: 'Teşekkürler', english: 'Thank you', pronunciation: 'te-she-kür-LER' },
      { turkish: 'Teşekkür ederim', english: 'Thank you (formal)', pronunciation: 'te-she-kür e-de-RIM' },
      { turkish: 'Özür dilerim', english: "I'm sorry", pronunciation: 'ö-ZÜR di-le-RIM' },
      { turkish: 'Rica ederim', english: "You're welcome", pronunciation: 'ri-JA e-de-RIM' },
      { turkish: 'Tamam', english: 'Okay / Done', pronunciation: 'ta-MAM' },
    ],
    tips: ['Use "sizin" (formal) with anyone older or in professional settings', 'Hoş geldiniz/Hoş bulduk pair is essential in Turkey']
  },
  {
    id: 'numbers-money',
    title: 'Numbers & Money',
    icon: '💰',
    phrases: [
      { turkish: 'Bir', english: '1 / One', pronunciation: 'bir' },
      { turkish: 'İki', english: '2 / Two', pronunciation: 'EE-ki' },
      { turkish: 'Üç', english: '3 / Three', pronunciation: 'üch' },
      { turkish: 'Dört', english: '4 / Four', pronunciation: 'dört' },
      { turkish: 'Beş', english: '5 / Five', pronunciation: 'besh' },
      { turkish: 'Altı', english: '6 / Six', pronunciation: 'al-tuh' },
      { turkish: 'Yedi', english: '7 / Seven', pronunciation: 'ye-di' },
      { turkish: 'Sekiz', english: '8 / Eight', pronunciation: 'se-kiz' },
      { turkish: 'Dokuz', english: '9 / Nine', pronunciation: 'do-kuz' },
      { turkish: 'On', english: '10 / Ten', pronunciation: 'on' },
      { turkish: 'Yirmi', english: '20 / Twenty', pronunciation: 'YIR-mi' },
      { turkish: 'Otuz', english: '30 / Thirty', pronunciation: 'o-tuz' },
      { turkish: 'Kırk', english: '40 / Forty', pronunciation: 'kırk' },
      { turkish: 'Elli', english: '50 / Fifty', pronunciation: 'e-li' },
      { turkish: 'Altmış', english: '60 / Sixty', pronunciation: 'alt-muş' },
      { turkish: 'Yetmiş', english: '70 / Seventy', pronunciation: 'yet-mish' },
      { turkish: 'Seksen', english: '80 / Eighty', pronunciation: 'sek-sen' }
    ]
  },
  {
    id: 'emergency',
    title: 'Emergency & Help',
    icon: '🚨',
    phrases: [
      { turkish: 'Yardım edin!', english: 'Help!', pronunciation: 'yar-DEEM e-DIN!' },
      { turkish: 'Acil Yardım!', english: 'Emergency help!', pronunciation: 'a-JIL yar-DEEM!' },
      { turkish: 'Ambulans çağırın!', english: 'Call an ambulance!', pronunciation: 'am-bu-LANS cha-ıh-RIN!' },
      { turkish: 'Polisi arayın!', english: 'Call the police!', pronunciation: 'po-li-SI a-ra-YIN!' },
      { turkish: 'Doktor!', english: 'Doctor!', pronunciation: 'doc-TOR!' },
      { turkish: 'Hastane nerede?', english: 'Where is the hospital?', pronunciation: 'has-ta-NE ne-RE-de?' },
      { turkish: 'Eczane nerede?', english: 'Where is the pharmacy?', pronunciation: 'ej-Za-NE ne-RE-de?' },
      { turkish: 'Hastaüyüm', english: "I'm sick", pronunciation: 'has-ta-YUH-yüm' },
      { turkish: 'Ağrım var', english: "I have pain", pronunciation: 'a-wuh-RIM var' },
      { turkish: 'Allerjim var', english: "I have allergies", pronunciation: 'a-ller-JI-im var' },
      { turkish: 'Kayboldum', english: "I'm lost", pronunciation: 'kai-BOL-doorn' },
      { turkish: 'Telefonumu bulamıyorum', english: "I can't find my phone", pronunciation: 'te-le-fo-NOO-mu bu-la-mi-YO-room' },
      { turkish: '112', english: 'Emergency number', pronunciation: 'yüz on iki' },
    ],
    tips: ['112 is Turkey\'s universal emergency number (police, ambulance, fire)']
  },
  {
    id: 'essential-verbs',
    title: 'Essential Verbs',
    icon: '🔤',
    phrases: [
      { turkish: 'Bilmek - Biliyorum', english: 'To know - I know', pronunciation: 'bil-MEK - bi-li-YO-rum' },
      { turkish: 'Gelmek - Geliyorum', english: 'To come - I am coming', pronunciation: 'gel-MEK - ge-li-YO-rum' },
      { turkish: 'Gitmek - Gidiyorum', english: 'To go - I am going', pronunciation: 'git-MEK - gi-di-YO-rum' },
      { turkish: 'Almak - Alıyorum', english: 'To buy/take - I take/buy', pronunciation: 'al-MAK - a-luh-YO-rum' },
      { turkish: 'Vermek - Veriyorum', english: 'To give - I give', pronunciation: 'ver-MEK - ve-ri-YO-rum' },
      { turkish: 'Anlamak - Anlıyorum', english: 'To understand - I understand', pronunciation: 'an-la-MAK - an-luh-YO-rum' },
      { turkish: 'Konuşmak - Konuşuyorum', english: 'To speak - I speak', pronunciation: 'ko-nush-MAK - ko-nu-shoo-YO-rum' },
      { turkish: 'Yazmak - Yazıyorum', english: 'To write - I write', pronunciation: 'yaz-MAK - ya-zuh-YO-rum' },
      { turkish: 'Okumak - Okuyorum', english: 'To read - I read', pronunciation: 'o-ku-MAK - o-koo-YO-rum' },
      { turkish: 'Bakmak - Bakıyorum', english: 'To look - I am looking', pronunciation: 'bak-MAK - ba-kuh-YO-rum' },
      { turkish: 'Beklemek - Bekliyorum', english: 'To wait - I am waiting', pronunciation: 'bek-le-MEK - bek-li-YO-rum' },
      { turkish: 'Sormak - Soruyorum', english: 'To ask - I ask', pronunciation: 'sor-MAK - so-roo-YO-rum' },
    ],
    tips: ['-yorum = I am doing (present tense). This ONE suffix covers most situations!']
  },
  {
    id: 'questions',
    title: 'Question Words',
    icon: '❓',
    phrases: [
      { turkish: 'Ne?', english: 'What?', pronunciation: 'Ne?' },
      { turkish: 'Nerede?', english: 'Where?', pronunciation: 'ne-RE-de?' },
      { turkish: 'Nasıl?', english: 'How?', pronunciation: 'na-SUHL?' },
      { turkish: 'Ne zaman?', english: 'When?', pronunciation: 'ne za-MAHN?' },
      { turkish: 'Neden/Niçin?', english: 'Why?', pronunciation: 'ne-DEN / ni-CHEEN?' },
      { turkish: 'Kaç tane?', english: 'How many?', pronunciation: 'kach ta-NE?' },
      { turkish: 'Kaç para?', english: 'How much money?', pronunciation: 'kach pa-RA?' },
      { turkish: 'Kim?', english: 'Who?', pronunciation: 'kim?' },
      { turkish: 'Hangi?', english: 'Which?', pronunciation: 'han-GI?' },
      { turkish: 'Bu ne?', english: 'What is this?', pronunciation: 'boo ne?' },
      { turkish: 'Bu nedir?', english: 'What is this? (formal)', pronunciation: 'boo ne-DIR?' },
      { turkish: 'Anlayamaz mıyız?', english: 'Can you repeat/Can we not understand?', pronunciation: 'an-lah-ya-maz muh-YUZ?' },
    ]
  }
];

// DAY 2: DAILY LIFE - Transportation, Shopping, Food, Places
export const day2Lessons: Lesson[] = [
  {
    id: 'transportation',
    title: 'Transportation 🚌',
    icon: '🚌',
    phrases: [
      { turkish: 'Otobüs duragı nerede?', english: 'Where is the bus stop?', pronunciation: 'o-to-BÜS du-ra-gı ne-RE-de?' },
      { turkish: 'Metro istasyonu nerede?', english: 'Where is the metro station?', pronunciation: 'ME-tro i-sta-syo-NU ne-RE-de?' },
      { turkish: 'Tramvay nereden geçiyor?', english: 'Where does the tram pass?', pronunciation: 'tram-VAI ne-re-den ge-chi-YOR?' },
      { turkish: 'Taksi duragı nerede?', english: 'Where is the taxi stand?', pronunciation: 'tak-SI du-ra-gı ne-RE-de?' },
      { turkish: 'BiTaksi uygulamasını indirin', english: 'Download BiTaksi app (Uber equivalent)', pronunciation: 'bi-tak-si uy-gu-la-ma-sı-nın in-di-RIN' },
      { turkish: 'Havalimanına gitmek istiyorum', english: 'I want to go to the airport', pronunciation: 'ha-va-li-ma-nı-na git-MEK is-ti-YO-room' },
      { turkish: 'Tren istasyonuna nasıl giderim?', english: 'How do I get to the train station?', pronunciation: 'tren i-sta-syo-NU-na na-SUL gi-de-RIM?' },
      { turkish: 'İstanbulkart nereden alabilirim?', english: 'Where can I get Istanbul Card?', pronunciation: 'is-tan-BUL-kart ne-re-den a-na-bi-li-RIM?' },
      { turkish: 'Bu otobüs Taksime gider mi?', english: 'Does this bus go to Taksim?', pronunciation: 'boo o-to-BÜS tak-SI-me gi-der MI?' },
      { turkish: 'Sonraki durak hangisi?', english: 'Which is the next stop?', pronunciation: 'son-ra-KI du-rak han-GI-si?' },
      { turkish: 'İnecek var mı?', english: 'Is anyone getting off here? (to driver)', pronunciation: 'i-ne-CEK var MU?' },
      { turkish: 'Molada duracak mısınız?', english: 'Will you stop for a break?', pronunciation: 'mo-la-da du-ra-cek MI-si-niz?' },
      { turkish: 'Bilet ne kadar?', english: 'How much is the ticket?', pronunciation: 'bi-LET ne ka-dar?' },
      { turkish: 'İstanbulkartımı doldurmak istiyorum', english: 'I want to top up my Istanbul Card', pronunciation: 'is-tan-BUL-kar-tı-mı dol-dur-mak is-ti-YO-room' },
      { turkish: 'Aktarmalı mı?', english: 'Do I need to transfer?', pronunciation: 'ak-tar-ma-LI MI?' },
      { turkish: 'Kaç dakika sürer?', english: 'How many minutes does it take?', pronunciation: 'kach da-ki-ma sü-RER?' },
    ],
    tips: ['Get Istanbulkart immediately - it works for metro, bus, tram, ferry', 'Say "İnecek var mı" before your stop on buses', 'BiTaksi is the best taxi app in Turkey']
  },
  {
    id: 'shopping-paying',
    title: 'Shopping & Paying 💳',
    icon: '💳',
    phrases: [
      { turkish: 'Bu kaç para?', english: 'How much is this?', pronunciation: 'boo kach pa-RA?' },
      { turkish: 'Pahalı', english: 'Expensive', pronunciation: 'pa-ha-LUH' },
      { turkish: 'Ucuz', english: 'Cheap', pronunciation: 'u-JOOZ' },
      { turkish: 'İndirim var mı?', english: 'Is there a discount?', pronunciation: 'in-di-RIM var MI?' },
      { turkish: 'Kredi kartıyla ödeyebilir miyim?', english: 'Can I pay by credit card?', pronunciation: 'kre-DI kar-tıy-la ö-de-ye-bi-lir MI-yim?' },
      { turkish: 'Nakit ödeme yapabilirim', english: 'I can pay cash', pronunciation: 'na-kit ö-de-me ya-pa-bi-li-rim' },
      { turkish: 'Bozluk var mı?', english: 'Do you have change?', pronunciation: 'bol-ZOOK var MI?' },
      { turkish: 'Küçük bir banknot var mı?', english: 'Do you have smaller bills?', pronunciation: 'kü-CHÜK bir bank-not var MI?' },
      { turkish: 'Makbuz alabilir miyim?', english: 'Can I get a receipt?', pronunciation: 'mak-BOOZ a-na-bi-le-rim MI?' },
      { turkish: 'Fiş istiyorum', english: 'I want the receipt/bill', pronunciation: 'fish is-ti-YO-room' },
      { turkish: 'Pos cihazı çalışmıyor', english: 'The card machine isn\'t working', pronunciation: 'pos chi-ha-zı cha-lush-mo-YOR' },
      { turkish: 'Başka kart deneyelim', english: 'Let\'s try another card', pronunciation: 'bash-KA kart de-ne-ye-LIM' },
      { turkish: 'İade etmek istiyorum', english: 'I want to return/refund', pronunciation: 'i-A-de e-de-MEK is-ti-YO-room' },
      { turkish: 'Degiştirebilir miyim?', english: 'Can I exchange it?', pronunciation: 'de-i-sh-ti-re-bi-lir MI-yim?' },
      { turkish: 'Deneyebilir miyim?', english: 'Can I try it on?', pronunciation: 'de-ne-ye-bei-LIR MI-yim?' },
      { turkish: 'Fiyatı yazıyor mu?', english: 'Is the price marked/written?', pronunciation: 'fi-ya-tı ya-zı-YO-R moo?' },
    ],
    tips: ['Always carry some cash - many small places are card-free', '"Pos çalışmıyor" = universal excuse when card is rejected']
  },
  {
    id: 'receipt-reading',
    title: 'Reading Receipts 🧾',
    icon: '🧾',
    phrases: [
      { turkish: 'Toplam', english: 'Total amount', pronunciation: 'top-LAM' },
      { turkish: 'KDV', english: 'VAT/Tax', pronunciation: 'ka-de-VE' },
      { turkish: 'Ara toplam', english: 'Subtotal', pronunciation: 'a-ra top-LAM' },
      { turkish: 'İndirim', english: 'Discount', pronunciation: 'in-di-RIM' },
      { turkish: 'Nakit', english: 'Cash paid', pronunciation: 'na-kit' },
      { turkish: 'Kredi kartı', english: 'Credit card', pronunciation: 'kre-DI kar-tı' },
      { turkish: 'Para üstü', english: 'Change', pronunciation: 'pa-ra üs-TÜ' },
      { turkish: 'Adet', english: 'Quantity', pronunciation: 'a-DET' },
      { turkish: 'Birim fiyat', english: 'Unit price', pronunciation: 'bi-RIM fi-yat' },
      { turkish: 'Tarih', english: 'Date', pronunciation: 'ta-RIH' },
      { turkish: 'Saat', english: 'Time', pronunciation: 'sa-at' },
      { turkish: 'Fiş numarası', english: 'Receipt number', pronunciation: 'fish nu-ma-ra-sı' },
      { turkish: 'Garanti belgesi', english: 'Warranty certificate', pronunciation: 'ga-ran-TI bel-GE-si' },
      { turkish: 'İade koşulları', english: 'Return conditions', pronunciation: 'i-A-de kosh-ul-LAR-I' },
    ],
    tips: ['KDV is usually 18% or 8% included in price', 'Para üstü = change you receive back']
  },
  {
    id: 'food-ordering',
    title: 'Food & Ordering 🍽️',
    icon: '🍽️',
    phrases: [
      { turkish: 'Bir hesap lütfen', english: 'The check please', pronunciation: 'bir he-SAP LÜT-fen' },
      { turkish: 'Afiyet olsun', english: 'Enjoy your meal (say before eating)', pronunciation: 'af-fi-YET ol-SOON' },
      { turkish: 'Menüyü görebilir miyim?', english: 'Can I see the menu?', pronunciation: 'me-nü-YÜ gö-re-bi-lir MI-yim?' },
      { turkish: 'Su getirebilir misiniz?', english: 'Can you bring water?', pronunciation: 'su ge-ti-re-bi-lir mi-si-NIZ?' },
      { turkish: 'Vejeteryan bir yemek var mı?', english: 'Is there a vegetarian dish?', pronunciation: 've-jete-RI-an bir ye-mek var MI?' },
      { turkish: 'Acılı değil', english: 'Not spicy', pronunciation: 'a-JUH-LI de-GIL' },
      { turkish: 'Bol sosluya', english: 'With extra sauce', pronunciation: 'bol sos-lu-YA' },
      { turkish: 'Paket yapabilir misiniz?', english: 'Can you make it takeaway/to-go?', pronunciation: 'pa-KET ya-pa-bi-lir mi-si-NIZ?' },
      { turkish: 'Türk kahvesi', english: 'Turkish coffee', pronunciation: 'türk ka-he-ve-SI' },
      { turkish: 'Çay', english: 'Tea (most common drink)', pronunciation: 'chai' },
      { turkish: 'Şekerli', english: 'With sugar', pronunciation: 'she-ker-LI' },
      { turkish: 'Şekersiz', english: 'Without sugar', pronunciation: 'she-ker-SIZ' },
      { turkish: 'Lezzetli', english: 'Delicious', pronunciation: 'lez-ZET-li' },
      { turkish: 'Garson!', english: 'Waiter! (calling for service)', pronunciation: 'gar-SON!' },
      { turkish: 'Rezervasyon yaptırmak istiyorum', english: 'I want to make a reservation', pronunciation: 're-zer-va-SION yak-tur-mak is-ti-YO-room' },
    ],
    tips: ['Afiyet olsun before EVERY meal - Turks love hearing this', 'Çay is offered everywhere for free as hospitality']
  },
  {
    id: 'finding-places',
    title: 'Finding Places 📍',
    icon: '📍',
    phrases: [
      { turkish: 'Tuvalet nerede?', english: 'Where is the restroom/toilet?', pronunciation: 'tu-va-LET ne-RE-de?' },
      { turkish: 'Banka nerede?', english: 'Where is the bank?', pronunciation: 'ban-KA ne-RE-de?' },
      { turkish: 'ATM nerede?', english: 'Where is the ATM?', pronunciation: 'ATM ne-RE-de?' },
      { turkish: 'Market/Supermarket nerede?', english: 'Where is the supermarket?', pronunciation: 'mar-KET ne-RE-de?' },
      { turkish: 'Eczane nerede?', english: 'Where is the pharmacy?', pronunciation: 'ej-Za-NE ne-RE-de?' },
      { turkish: 'Nobetçi eczane', english: '24-hour/open late pharmacy', pronunciation: 'no-bet-CHI ej-Za-NE' },
      { turkish: 'Postane nerede?', english: 'Where is the post office?', pronunciation: 'pos-ta-NE ne-RE-de?' },
      { turkish: 'Kütüphane nerede?', english: 'Where is the library?', pronunciation: 'kü-tü-pha-NA ne-RE-de?' },
      { turkish: 'Camii nerede?', english: 'Where is the mosque?', pronunciation: 'ca-MII ne-RE-de?' },
      { turkish: 'Sola dön', english: 'Turn left', pronunciation: 'so-la DÖN' },
      { turkish: 'Sağa dön', english: 'Turn right', pronunciation: 'sa-ga DÖN' },
      { turkish: 'Düz devam et', english: 'Go straight ahead', pronunciation: 'düz da-vam ET' },
      { turkish: 'Buradan yakın mı?', english: 'Is it near from here?', pronunciation: 'bu-ra-DAN ya-kın MI?' },
      { turkish: 'Uzak mı?', english: 'Is it far?', pronunciation: 'u-ZAK MI?' },
      { turkish: 'Yürüme mesafesi mi?', english: 'Is it walking distance?', pronunciation: 'yü-rü-me me-sa-fe-SI MI?' },
      { turkish: 'Haritada gösterebilir misiniz?', english: 'Can you show me on map?', pronunciation: 'ha-ri-ta-da gös-te-re-bi-lir mi-si-NIZ?' },
    ],
    tips: ['Use Google Maps but always confirm verbally with locals', 'Nobetçi eczane = after-hours pharmacy - google it daily']
  }
];

// DAY 3: OFFICIAL MATTERS - University, Kimlik, Applications
export const day3Lessons: Lesson[] = [
  {
    id: 'university-enrollment',
    title: 'University Enrollment 🎓',
    icon: '🎓',
    phrases: [
      { turkish: 'Kayıt için geldim', english: 'I came for registration/enrollment', pronunciation: 'ka-yıt İ-ÇIN gel-DIM' },
      { turkish: 'Yabancı öğrenci ofisine gitmem gerekiyor', english: 'I need to go to international student office', pronunciation: 'ya-ban-JI ö-gen-ci o-fi-si-ne git-MEM ge-re-ki-YOR' },
      { turkish: 'YÖK denklik işlemleri', english: 'YÖK equivalence procedures', pronunciation: 'yök den-KLIK ish-le-ME-ri' },
      { turkish: 'Başvuru formunu doldurdum', english: 'I filled out the application form', pronunciation: 'bash-vu-RO for-mu-nu dol-DUR-doom' },
      { turkish: 'Gerekli belgeler nelerdir?', english: 'What documents are needed?', pronunciation: 'ge-rek-li bel-GE-ler ne-LER-dir?' },
      { turkish: 'Pasaport fotokopisi', english: 'Passport photocopy', pronunciation: 'pa-sa-port fo-to-ko-pi-si' },
      { turkish: 'Diploma apostilli mi olması gerekiyor?', english: 'Does diploma need apostille?', pronunciation: 'di-PLO-ma a-pos-TI-LI MI ol-ma-sı ge-re-ki-YOR?' },
      { turkish: 'Noter onayı', english: 'Notary approval/certification', pronunciation: 'no-TER o-na-YI' },
      { turkish: 'Yeminli tercüme', english: 'Sworn translation', pronunciation: 'ye-min-LI ter-cü-ME' },
      { turkish: 'Öğrenci kimliği', english: 'Student ID', pronunciation: 'ö-gen-ci kim-li-ĞI' },
      { turkish: 'Öğrenci belgesi', english: 'Student certificate', pronunciation: 'ö-gen-ci bel-GE-si' },
      { turkish: 'Danışmanım kim?', english: 'Who is my advisor?', pronunciation: 'dan-ish-ma-NIM kim?' },
      { turkish: 'Ders kaydı ne zaman?', english: 'When is course registration?', pronunciation: 'ders kay-DI ne za-MAHN?' },
      { turkish: 'Katalog/ders seçimi', english: 'Catalog/course selection', pronunciation: 'ka-ta-log / ders se-CHI-mi' },
      { turkish: 'Transkript istiyorum', english: 'I need my transcript', pronunciation: 'trans-krip-T is-ti-YO-room' },
      { turkish: 'Erasmus başvurusu yapmak istiyorum', english: 'I want to apply for Erasmus', pronunciation: 'e-raz-MUS bash-vu-su ya-pa-mak is-ti-YO-room' },
      { turkish: 'Burs/ bursluluk var mı?', english: 'Is there a scholarship?', pronunciation: 'bursh / bursh-lu-luk var MI?' },
      { turkish: 'Yurt odası istiyorum', english: 'I want a dormitory room', pronunciation: 'yurt o-da-sı is-ti-YO-room' },
    ],
    tips: ['YÖK equivalence is CRITICAL - start early (can take weeks)', 'Find Yabanci Öğrenci Ofisi immediately upon arrival']
  },
  {
    id: 'kimlik-residence',
    title: 'Kimlik & Residence Permit 🪪',
    icon: '🪪',
    phrases: [
      { turkish: 'İkamet izni başvurusu', english: 'Residence permit application', pronunciation: 'i-ka-MET iz-ni bash-vu-su' },
      { turkish: 'E-Devlet üzerinden başvuru', english: 'Application via E-Devlet (government portal)', pronunciation: 'e-de-VLET üs-te-den bash-vu-ru' },
      { turkish: 'İl Göç İdaresi Müdürlüğü', english: 'Provincial Directorate of Migration Management', pronunciation: 'il göch i-da-re-si mü-dür-lü-ğü' },
      { turkish: 'Randevu aldım', english: 'I got/have an appointment', pronunciation: 'ran-de-voo AL-dım' },
      { turkish: 'Randevu almadım, acil durum var', english: "I don't have appointment, emergency situation", pronunciation: 'ran-de-voo al-MA-dım, a-JIL doom var' },
      { turkish: 'Sağlık sigortası yaptım', english: 'I got health insurance', pronunciation: 'sa-LIK si-go-rta-sı yap-TIM' },
      { turkish: 'Adres kayıt sistemi', english: 'Address registration system (AKS)', pronunciation: 'a-dres kayıt sis-te-MI' },
      { turkish: 'Muhtarlıktan ikametgah belgesi', english: 'Residence certificate from headman office', pronunciation: 'muhtaar-lık-tan i-ka-met-gah bel-GE-si' },
      { turkish: '4 adet biyometrik fotoğraf', english: '4 biometric photos', pronunciation: 'dört a-det bi-yo-ME-trik fo-to-graf' },
      { turkish: 'Pasaport sureti', english: 'Passport copy', pronunciation: 'pa-sa-port su-re-TI' },
      { turkish: 'Öğrenci belgesi veya öğrenci kimliği', english: 'Student cert or ID', pronunciation: 'ö-gen-ci bel-GE-si YA-la ö-gen-ci kim-li-ĞI' },
      { turkish: 'Vergi numarası', english: 'Tax number (for foreigners)', pronunciation: 'ver-GI nu-ma-ra-sı' },
      { turkish: 'Kalacağım adres', english: 'Address where I will stay', pronunciation: 'ka-la-ca-gım a-dres' },
      { turkish: 'İkamet tezkiresi', english: 'Residence permit document', pronunciation: 'i-ka-MET tez-ki-re-si' },
      { turkish: 'Geçici kimlik belgesi', english: 'Temporary ID document', pronunciation: 'ge-CHI-ci kim-lik bel-GE-si' },
      { turkish: 'Yabancı kimlik numaram', english: 'My foreigner ID number', pronunciation: 'ya-ban-JI kim-lik nu-ma-RA-m' },
      { turkish: 'Kimlik kartını yenilemek istiyorum', english: 'I want to renew ID card', pronunciation: 'kim-lik kar-tı-nı ye-ni-le-MEK is-ti-YO-room' },
      { turkish: 'Kaç gün içinde alınır?', english: 'How many days to receive?', pronunciation: 'kach gün İ-ÇIN-de a-lı-NIR?' },
    ],
    tips: ['E-Devlet is essential - download the app and register', 'ALWAYS book appointment online first (e-ikamet.gov.tr)', 'Health insurance is mandatory for residence permit']
  },
  {
    id: 'official-conversations',
    title: 'Official Conversations 🏛️',
    icon: '🏛️',
    phrases: [
      { turkish: 'Randevum var', english: 'I have an appointment', pronunciation: 'ran-de-voom VAR' },
      { turkish: 'Sira numaram bu', english: 'This is my queue number', pronunciation: 'sı-ra nu-ma-ram BOO' },
      { turkish: 'Dosyam tamam mı?', english: 'Is my file complete?', pronunciation: 'do-sya-m ta-MAM MI?' },
      { turkish: 'Eksik evrak var mı?', english: 'Are there missing documents?', pronunciation: 'ek-SIK ev-rak var MI?' },
      { turkish: 'Ne kadar sürecek?', english: 'How long will it take?', pronunciation: 'ne ka-dar sü-re-CEK?' },
      { turkish: 'Bekleyebilir miyim?', english: 'Can I wait?', pronunciation: 'bek-le-ye-bi-lir MI-yim?' },
      { turkish: 'Oturma iznim onaylandı mı?', english: 'Was my residence permit approved?', pronunciation: 'o-tur-ma iz-nim onay-LAN-dı MI?' },
      { turkish: 'Hangi belge eksik?', english: 'Which document is missing?', pronunciation: 'han-GI bel-GE ek-SIK?' },
      { turkish: 'Tekrar gelmem gerek mi?', english: 'Do I need to come again?', pronunciation: 'te-kar gel-MEM ge-rek MI?' },
      { turkish: 'Ne zaman haber verirsiniz?', english: 'When will you inform me?', pronunciation: 'ne za-MAhn ha-BER ve-ri-si-NIZ?' },
      { turkish: 'Cep telefonumu güncellemem gerekiyor', english: 'I need to update my mobile number', pronunciation: 'cep te-le-fo-noo-mu gü-njel-le-mem ge-re-ki-YOR' },
      { turkish: 'Online takip edebilirim mi?', english: 'Can I track online?', pronunciation: 'on-line ta-KIP e-di-bi-lir-im MI?' },
      { turkish: 'Acil durumdaki başvuru', english: 'Emergency situation application', pronunciation: 'a-JIL doom-un-da-KI bash-vu-ru' },
      { turkish: 'İmza atmam gerek mi?', english: 'Do I need to sign?', pronunciation: 'im-ZA at-mam ge-rek MI?' },
      { turkish: 'Fotoğraf çektirdim', english: 'I had photos taken', pronunciation: 'fo-to-graf chek-tir-DIM' },
      { turkish: 'Parmak izi aldım', english: 'I gave fingerprints', pronunciation: 'par-mak ı-ZI al-DIM' },
    ],
    tips: ['Turks appreciate patience at government offices - never get angry', 'Bring copies of everything + originals', 'Arrive 15 min early for appointments']
  },
  {
    id: 'bank-finance',
    title: 'Banking & Finance 🏦',
    icon: '🏦',
    phrases: [
      { turkish: 'Banka hesabı açmak istiyorum', english: 'I want to open a bank account', pronunciation: 'ban-KA he-sa-bı a-CHAK is-ti-YO-room' },
      { turkish: 'Yabancılar için banka hesabı', english: 'Bank account for foreigners', pronunciation: 'ya-ban-JI-lar İ-ÇIN ban-KA he-sa-bı' },
      { turkish: 'Vergi numarası aldım', english: 'I got tax number', pronunciation: 'ver-GI nu-ma-ra-sı al-DIM' },
      { turkish: 'TC kimlik numarası yok', english: "I don't have TC ID (Turkish citizenship ID)", pronunciation: 'TC kim-lik nu-ma-ra-sı YOK' },
      { turkish: 'Pasaportla işlem yapılabilir mi?', english: 'Can I do transactions with passport?', pronunciation: 'pa-saport-la ish-LEM ya-pıl-a-bi-lir MI?' },
      { turkish: 'Banka kartı istiyorum', english: 'I want a debit card', pronunciation: 'ban-KA kar-tı is-ti-YO-room' },
      { turkish: 'Kredi kartı başvurusu', english: 'Credit card application', pronunciation: 'kre-DI kar-tı bash-vu-su' },
      { turkish: 'Maaş hesabı açmak', english: 'Open salary account', pronunciation: 'ma-aSH he-sa-bı a-CHAK' },
      { turkish: 'İnternet/mobile banking', english: 'Internet/Mobile banking', pronunciation: 'in-ter-net / mo-bil ban-KING' },
      { turkish: ' Havale/EFT yapmak istiyorum', english: 'I want to make transfer/EFT', pronunciation: 'ha-VA-le / EFT ya-pa-mak is-ti-YO-room' },
      { turkish: 'IBAN numarası', english: 'IBAN number', pronunciation: 'I-BAN nu-ma-ra-sı' },
      { turkish: 'Döviz bozdurmak istiyorum', english: 'I want to exchange currency', pronunciation: 'döv-vez bol-zur-MAK is-ti-YO-room' },
      { turkish: 'Günlük kur nedir?', english: 'What is today\'s rate?', pronunciation: 'gürn-lük KUR ne-DIR?' },
      { turkish: 'Para çekmek istiyorum', english: 'I want to withdraw money', pronunciation: 'pa-ra CHEK-mek is-ti-YO-room' },
      { turkish: 'Yatırma yapmak istiyorum', english: 'I want to deposit', pronunciation: 'ya-tir-MA ya-pa-mak is-ti-YO-room' },
    ],
    tips: ['Get tax number from any tax office first', '4 major banks for expats: Garanti BBVA, İş Bankası, Yapı Kredi, Akbank']
  },
  {
    id: 'renting-housing',
    title: 'Renting & Housing 🏠',
    icon: '🏠',
    phrases: [
      { turkish: 'Ev/Kira arıyorum', english: "I'm looking for apartment/rent", pronunciation: 'EVI / ki-RA a-ru-YO-room' },
      { turkish: 'Depozito ne kadar?', english: 'How much is the deposit?', pronunciation: 'de-po-zi-to ne ka-dar?' },
      { turkish: 'Kira dahil mi?', english: 'Is rent included?', pronunciation: 'ki-RA da-HIL MI?' },
      { turkish: 'Aidat dahil mi?', english: 'Is maintenance fee included?', pronunciation: 'a-i-DAT da-HIL MI?' },
      { turkish: 'Faturalar kimin?', english: 'Who pays utilities?', pronunciation: 'fu-ta-la-lar ki-MIN?' },
      { turkish: 'Mobilyalı mı?', english: 'Is it furnished?', pronunciation: 'mob-lya-LI MI?' },
      { turkish: 'Sözleşme imzalayabilir miyiz?', english: 'Can we sign the lease contract?', pronunciation: 'söz-le-sh-me im-za-la-ya-bi-liz MI?' },
      { turkish: 'Kira sözleşmesi', english: 'Lease agreement', pronunciation: 'ki-RA söz-le-sh-me-si' },
      { turkish: 'Noterde onaylatmak', english: 'Get it notarized', pronunciation: 'no-TER-de onay-la-MAK' },
      { turkish: '1+1 / 2+1 / 3+1', english: '1 bedroom / 2 bed / 3 bed (common notation)', pronunciation: 'bir art bir / iki art bir / üç art bir' },
      { turkish: 'Eşyalı/Eşyasız', english: 'Furnished / Unfurnished', pronunciation: 'esh-ya-LI / esh-ya-SUZ' },
      { turkish: 'Doğalgaz', english: 'Natural gas', pronunciation: 'do-gal-GAZ' },
      { turkish: 'Elektrik', english: 'Electricity', pronunciation: 'e-lek-trik' },
      { turkish: 'Su abonesi', english: 'Water subscription', pronunciation: 'SU a-bo-ne-si' },
      { turkish: 'İnternet bağlantısı var mı?', english: 'Is there internet connection?', pronunciation: 'in-ter-net bag-lan-tı-sı var MI?' },
      { turkish: 'Kiracı çıkarma bildirimi', english: 'Eviction notice (know your rights!)', pronunciation: 'ki-ra-ji chi-kar-ma bil-di-RI-mi' },
    ],
    tips: ['Use sahibinden.com for housing search', 'Never pay deposit without signed contract', 'Know tenant rights - 6-month minimum lease is standard']
    }
];

// GRAMMAR QUICK REFERENCE
export const grammarTips = [
  {
    title: 'The MAGIC "-yorum" Pattern',
    content: '-yorum/-iyorum = "I am doing/I do". This single pattern covers present continuous and simple present!',
    examples: [
      { tr: 'Geliyorum', en: 'I am coming', tip: 'gel-MEK → geli-YORUM' },
      { tr: 'Yazıyorum', en: 'I am writing', tip: 'yaz-MAK → yaz-ı-YORUM' },
      { tr: 'Konuşuyorum', en: 'I am speaking', tip: 'konuş-MAK → konuşu-YORUM' }
    ]
  },
  {
    title: 'Suffix Order Rules',
    content: 'Turkish is agglutinative - suffixes stack in strict order!',
    examples: [
      { tr: 'Ev-ler-imiz-de', en: 'In our houses', tip: 'house-PLURAL-POSSESSIVE-LOCATIVE' },
      { tr: 'Gel-me-di-niz', en: 'You did not come', tip: 'come-NEGATIVE-PAST-2ndPL' }
    ],
    rule: 'Root + PLURAL + POSSESSIVE + CASE'
  },
  {
    title: 'Vowel Harmony (Crucial!)',
    content: 'Suffix vowels match the root vowel!',
    examples: [
      { tr: 'Ev-de', en: 'At home', tip: '(e) uses back vowel suffixes' },
      { tr: 'İş-te', en: 'At work', tip: '(i) uses front vowel suffixes' },
      { tr: 'Kitap-ta', en: 'In/on book', tip: '(a) follows its own pattern' }
    ],
    rule: 'a/ı/o/u use (a/ı), e/i/ö/ü use (e/i)'
  },
  {
    title: 'Personal Endings (Present Tense)',
    content: 'Attach these to verb stems:',
    examples: [
      { tr: 'Gel-iyorum', en: 'I come', tip: '(-yorum)' },
      { tr: 'Geliyorsun', en: 'You come (informal)', tip: '(-yorsun)' },
      { tr: 'Geliyor', en: 'He/she/it comes', tip: '' },
      { tr: 'Geliyoruz', en: 'We come', tip: '(-yoruz)' },
      { tr: 'Geliyorsunuz', en: 'You all come', tip: '(-yorsunuz)' },
      { tr: 'Geliyorlar', en: 'They come', tip: '(-lar)' }
    ]
  },
  {
    title: 'Questions with "mi"',
    content: 'Add -mi/mı/mu/mü (with harmony) - goes AFTER the word being asked about',
    examples: [
      { tr: 'Sen misin?', en: 'Is it YOU? (identifying)', tip: '' },
      { tr: 'Geliyor musun?', en: 'Are you coming?', tip: '' },
      { tr: 'Yok mu?', en: 'Isn\'t there any?', tip: '' }
    ]
  },
  {
    title: 'Essential Case Suffixes',
    content: 'These 5 cases handle almost all spatial/temporal relationships:',
    examples: [
      { tr: '-de/-da', en: 'In/at/on (locative)', tip: 'ev-DE (at home)' },
      { tr: '-e/-a', en: 'To/toward (dative)', tip: 'eve (TO home)' },
      { tr: '-den/-dan', en: 'From (ablative)', tip: 'ev-DEN (FROM home)' },
      { tr: '-i/-ı/-u/-ü', en: 'Direct object (accusative)', tip: 'gör-DÜ-ğ-Ü (what I saw)' },
      { tr: '-ın/-in/-un/-ün', en: 'Possessive (genitive)', tip: 'Ahmet-IN (of Ahmet)' }
    ]
  },
  {
    title: '"There is/Have" vs "There isn\'t/Don\'t Have"',
    content: 'var/yok is incredibly versatile!',
    examples: [
      { tr: 'Para var', en: 'I have money / There is money', tip: 'same structure!' },
      { tr: 'Zamanım yok', en: "I don't have time / There's no time", tip: '' },
      { tr: 'Sorun var mı?', en: 'Is there a problem?', tip: '' },
      { tr: 'Boş masa var mı?', en: 'Is there an empty table?', tip: '' }
    ]
  },
  {
    title: '"This/That" Demonstratives',
    content: 'Distance matters in Turkish pointing:',
    examples: [
      { tr: 'Bu', en: 'This (near speaker)', tip: '' },
      { tr: 'Şu', en: 'That (near listener)', tip: '' },
      { tr: 'O', en: 'That over there (far from both)', tip: '' },
      { tr: 'Bunlar', en: 'These (plural)', tip: '' },
      { tr: 'Onlar', en: 'Those (far plural)', tip: '' }
    ]
  },
  {
    title: '"To Be" Copula',
    content: 'Turkish has no real "to be" verb in present tense - use suffixes!',
    examples: [
      { tr: 'Ben öğrenci(y)im', en: 'I am a student', tip: 'ben...-(y)im' },
      { tr: 'Sen Türk\'sün', en: 'You are Turkish', tip: 'sen...-sin/sün' },
      { tr: 'O mutlu', en: 'He/she is happy', tip: 'o...[nothing]' },
      { tr: 'Biz arkadaşız', en: 'We are friends', tip: 'biz...-ız' },
      { tr: 'Onlar meşgül', en: 'They are busy', tip: 'onlar...-lar' }
    ]
  },
  {
    title: 'Negation with "-me/-ma"',
    content: 'Add -me/-ma BEFORE tense suffixes:',
    examples: [
      { tr: 'Gelmiyorum', en: 'I am NOT coming', tip: 'gel-ME-yorum' },
      { tr: 'Anlamadım', en: "I didn't understand", tip: 'ana-la-MA-dım' },
      { tr: 'Bilmiyorum', en: "I don't know", tip: 'bil-MI-yorum' }
    ]
  }
];

// LEARNING TIPS & TRICKS
export const learningTips = [
  {
    category: '🧠 Memory Hacks',
    tips: [
      'Connect Turkish to English: "Elma" (apple) sounds like "elbow" holding apple',
      '"Kitap" (book) = imagine keeping a tap on a book',
      '"Gel" (come) = gelatinous substance coming towards you',
      '"Git" (go) = GIT commit pushing code away',
      'Use body movement: point forward saying "GEL!", point backward saying "GIT!"',
      'Create mental images with sound-alike associations for every new word'
    ]
  },
  {
    category: '⚡ Efficiency Strategies',
    tips: [
      'Learn 50 high-frequency words = understand 50% of everyday speech',
      'Focus on QUESTION WORDS first - you can communicate needs without knowing answers',
      'Master "var/yok" and "iste/istemem" (want/don\'t want) - covers huge ground',
      'Learn complete PHRASES before grammar rules - brain patterns language holistically',
      'Use SPACED REPETITION: review Day 1 words while learning Day 2',
      'Sleep after studying vocabulary - memory consolidation happens during sleep!'
    ]
  },
  {
    category: '🇹🇷 Cultural Context',
    tips: [
      'Turks value RELATIONSHIP before transaction - always greet warmly first',
      'Use titles: Bey (Mr.) for men, Hanım (Ms.) for women in formal contexts',
      'Offer tea/coffee context - refusing is okay, but offer reciprocation gesture',
      'Age hierarchy matters: younger people must show respect to older',
      '"İnşallah" (God willing) - learn to recognize, used frequently like "hopefully"',
      'Physical touch: same-gender hand-holding/platonic kissing cheek normal among friends'
    ]
  },
  {
    category: '🗣️ Speaking Confidence',
    tips: [
      'PERFECTION IS THE ENEMY - Turks appreciate effort more than accuracy',
      'Use hand gestures freely - communication transcends perfect grammar',
      '"Anlamadım" (I didn\'t understand) is POWERFUL - use it shamelessly',
      'Repeat what you heard back for confirmation: "Şöyle mi?" (Like this?)',
      'Learn fillers: "eee..." "yani..." (like...) buys thinking time',
      'Smile and maintain eye contact even when struggling'
    ]
  },
  {
    category: '📱 Practical Tech Tips',
    tips: [
      'Install Google Translate + download Turkish offline pack',
      'Use Yandex Translate for better Turkish results sometimes',
      'YouTube: "Turkish with Murat", "Merhaba Türkçe" channels excellent',
      'Tandem / HelloTalk apps find Turkish conversation partners FREE',
      'Turkish TV series with English subtitles (subtitles in Turkish later)',
      'Duolingo good for basics but add speaking practice separately'
    ]
  },
  {
    category: '⏰ 3-Day Schedule',
    tips: [
      'DAY 1 MORNING: Master greetings + numbers 1-20 + question words',
      'DAY 1 AFTERNOON: Emergency phrases + basic verbs (-yorum)',
      'DAY 1 EVENING: Sleep-review flashcards, watch Turkish video',
      'DAY 2 MORNING: Transportation vocabulary + directions',
      'DAY 2 AFTERNOON: Shopping/payment/receipt reading + food ordering',
      'DAY 2 EVENING: Practice conversations aloud, record yourself',
      'DAY 3 MORNING: Official/university terms (most complex day)',
      'DAY 3 AFTERNOON: Kimlik/residence process vocabulary',
      'DAY 3 EVENING: Review ALL days, test yourself, celebrate!'
    ]
  }
];

// CONVERSATION SCENARIOS FOR VOICE TRANSLATOR
export interface ConversationScenario {
  scenario: string;
  userPhrases: Phrase[];
  likelyResponses: Phrase[];
}

export const scenarios: ConversationScenario[] = [
  {
    scenario: 'At Restaurant 🍽️',
    userPhrases: [
      { turkish: 'Ması istiyorum', english: 'I want a table', pronunciation: 'ma-sı is-ti-YO-room' },
      { turkish: 'Menüyü görebilir miyim?', english: 'Can I see the menu?', pronunciation: 'me-nü-YÜ gö-re-bi-lir MI-yim?' },
      { turkish: 'Su lütfen', english: 'Water please', pronunciation: 'su LÜT-fen' },
    ],
    likelyResponses: [
      { turkish: 'Kaç kişisiniz?', english: 'How many people?', pronunciation: 'kach ki-shi-si-NIZ?' },
      { turkish: ' Buyruk / Tabii / Elbette', english: 'At your service / Of course / Certainly', pronunciation: 'buy-ruk / ta-bii / el-bet-TE' },
      { turkish: 'Hemen getiriyorum', english: 'Bringing right away', pronunciation: 'HE-men ge-ti-ri-YO-room' },
    ]
  },
  {
    scenario: 'Taking Taxi 🚕',
    userPhrases: [
      { turkish: '[location] gitmek istiyorum', english: 'I want to go to [place]', pronunciation: '... git-MEK is-ti-YO-room' },
      { turkish: 'Ne kadar tutar?', english: 'How much will it cost?', pronunciation: 'ne ka-dar tu-TAR?' },
      { turkish: 'Kartla ödeyebilir miyim?', english: 'Can I pay by card?', pronunciation: 'kar-tLA ö-de-ye-bi-lir MI-yim?' },
    ],
    likelyResponses: [
      { turkish: 'Binin lütfen', english: 'Please get in', pronunciation: 'bi-NIN lüt-fen' },
      { turkish: ' Yaklaşık ...TL olur', english: 'It will be around ... TL', pronunciation: 'yak-la-shik ... TL o-LUR' },
      { turkish: 'Nakit sadece', english: 'Cash only', pronunciation: 'na-kit sa-de-se' },
    ]
  },
  {
    scenario: 'At Government Office 🏛️',
    userPhrases: [
      { turkish: 'Randevum var', english: 'I have an appointment', pronunciation: 'ran-de-voom VAR' },
      { turkish: 'Sira numaramı almak istiyorum', english: 'I want to get a queue number', pronunciation: 'sı-ra nu-ma-ra-mı a-MAK is-ti-YO-room' },
      { turkish: 'Ne kadar beklemeliyim?', english: 'How long should I wait?', pronunciation: 'ne ka-dar bek-le-me-li-YIM?' },
    ],
    likelyResponses: [
      { turkish: 'TC kimlik numaranızı girin', english: 'Enter your TC ID number', pronunciation: 'TC kim-lik nu-ma-ra-nı-ZI gi-RIN' },
      { turkish: 'Lütfen oturun', english: 'Please sit down', pronunciation: 'lüt-fen o-tu-run' },
      { turkish: '... dakika sonra sıra sizde', english: 'Your turn in ... minutes', pronunciation: '... da-ki-ma so-nra sı-ra siz-de' },
    ]
  },
  {
    scenario: 'Shopping at Market 🛒',
    userPhrases: [
      { turkish: 'Bu kaç para?', english: 'How much is this?', pronunciation: 'boo kach pa-RA?' },
      { turkish: 'Daha ucuzu var mı?', english: 'Is there a cheaper one?', pronunciation: 'da-HA u-zoo var MI?' },
      { turkish: 'Poşet istiyorum', english: 'I want a bag', pronunciation: 'po-SHET is-ti-YO-room' },
    ],
    likelyResponses: [
      { turkish: '...TL abi/abla', english: '...TL brother/sister (casual)', pronunciation: '...TL abi/abla' },
      { turkish: 'Kalite product, ucuz değil', english: 'Quality product, not cheap', pronunciation: 'ka-li-te pro-duct, u-JOOZ de-GIL' },
      { turkish: 'Poşet paralı', english: 'Bag costs extra', pronunciation: 'po-shet pa-RA-lı' },
    ]
  },
  {
    scenario: 'Asking Directions 🗺️',
    userPhrases: [
      { turkish: '... nerede?', english: 'Where is ...?', pronunciation: '... ne-RE-de?' },
      { turkish: 'Buradan uzak mı?', english: 'Is it far from here?', pronunciation: 'bu-ra-DAN u-ZAK MI?' },
      { turkish: 'Yürüyerek gidilir mi?', english: 'Can I walk there?', pronunciation: 'yü-rü-ye-rek gi-di-LIR MI?' },
    ],
    likelyResponses: [
      { turkish: 'Düz gidin, sol tarafta', english: 'Go straight, on the left side', pronunciation: 'düz gi-DIN, sol ta-raf-TA' },
      { turkish: '5 dakika yürüme mesafesi', english: '5 minute walk distance', pronunciation: 'bes da-ki-ma yü-rü-me me-sa-fe-si' },
      { turkish: 'Otobüsle daha iyi', english: 'Better to take bus', pronunciation: 'o-to-BÜS-le da-HA ee-YI' },
    ]
  },
  {
    scenario: 'At Pharmacy 💊',
    userPhrases: [
      { turkish: 'Baş ağrısı için ilaç istiyorum', english: 'I want medicine for headache', pronunciation: 'bash a-wuh-RU-sı İ-ÇIN i-laç is-ti-YO-room' },
      { turkish: 'Reçetesiz satılır mı?', english: 'Is it sold without prescription?', pronunciation: 're-che-te-SIZ sa-tuh-LIR MI?' },
      { turkish: 'Nasıl kullanmalıyım?', english: 'How should I use it?', pronunciation: 'na-SUL kul-la-ma-LI-yım?' },
    ],
    likelyResponses: [
      { turkish: 'Bu reçeteli, doktora görünün', english: 'This requires prescription, see doctor', pronunciation: 'boo re-che-te-LI, doc-tora gönü-nün' },
      { turkish: 'Günde iki kez, yemeklerden sonra', english: 'Twice a day, after meals', pronunciation: 'gün-DE i-KI keez, ye-mek-ler-den so-nra' },
      { turkish: 'Soğukta tutun', english: 'Keep it cold/in fridge', pronunciation: 'so-GOOK-da tu-tun' },
    ]
  },
  {
    scenario: 'University/Admin Office 🎓',
    userPhrases: [
      { turkish: 'Yabancı öğrenci ofisi nerede?', english: 'Where is foreign student office?', pronunciation: 'ya-ban-JI ö-gen-ci o-fi-si ne-RE-de?' },
      { turkish: 'Belgelerim tam mıdır?', english: 'Are my documents complete?', pronunciation: 'bel-GE-ler-im tam mı-DIR?' },
      { turkish: 'Ders programını görebilir miyim?', english: 'Can I see course schedule?', pronunciation: 'ders pro-gramı-nı gö-re-bi-lir MI-yim?' },
    ],
    likelyResponses: [
      { turkish: '3. kat, sağ koridor', english: '3rd floor, right corridor', pronunciation: 'ü-chü kat, sahsh ko-ri-dor' },
      { turkish: 'Eksik: noter onaylı pasaport', pronunciation: 'ek-sik: no-ter o-na-yı pa-saport', english: 'Missing: notarized passport' },
      { turkish: 'Online sisteme bakabilirsiniz', english: 'You can check online system', pronunciation: 'on-line sis-te-me ba-ka-bi-li-si-NIZ' },
    ]
  }
];

// HIGH FREQUENCY WORDS LIST
export interface HighFreqWord {
  word: string;
  meaning: string;
  usage: string;
  pronunciation?: string;
}

export const highFrequencyWords: HighFreqWord[] = [
  { word: 've', meaning: 'and', usage: '...ve...' },
  { word: 'çok', meaning: 'very/much/many', usage: 'çok güzel (very beautiful)' },
  { word: 'bu', meaning: 'this', usage: 'bu ne? (what is this?)' },
  { word: 'ben', meaning: 'I/me', usage: 'ben... (I am...)' },
  { word: 'sen', meaning: 'you (informal)', usage: 'sen... (you are...)' },
  { word: 'o', meaning: 'he/she/it/that', usage: 'o gidiyor (s/he is going)' },
  { word: 'biz', meaning: 'we', usage: 'biz gidiyoruz (we are going)' },
  { word: 'siz', meaning: 'you (formal/plural)', usage: 'siz gidiyorsunuz' },
  { word: 'onlar', meaning: 'they', usage: 'onlar gidiyor' },
  { word: 'nerede', meaning: 'where', usage: '...nerede? (where is...?)' },
  { word: 'ne', meaning: 'what', usage: 'ne yapıyorsun? (what are you doing?)' },
  { word: 'nasıl', meaning: 'how', usage: 'nasıl gidersin? (how are you?)' },
  { word: 'ne zaman', meaning: 'when', usage: 'ne zaman geleceksin?' },
  { word: 'kim', meaning: 'who', usage: 'o kim? (who is that?)' },
  { word: 'hangi', meaning: 'which', pronunciation: 'han-GI', usage: 'hangisi istiyorsun?' },
  { word: 'var', meaning: 'there is/have', usage: 'para var (there is money)' },
  { word: 'yok', meaning: 'there isn\'t/don\'t have', usage: 'para yok (no money)' },
  { word: 'değil', meaning: 'not/isn\'t', usage: 'ben öğrenci değilim (I\'m not student)' },
  { word: 'mi/mı', meaning: '(question particle)', usage: 'var mı? (is there?)' },
  { word: 'icin', meaning: 'for', pronunciation: 'İ-ÇIN', usage: 'senin için (for you)' },
  { word: 'ile', meaning: 'with', usage: 'arkadaşım ile (with my friend)' },
  { word: 'ama', meaning: 'but', usage: 'güzel ama pahalı (beautiful but expensive)' },
  { word: 'çünkü', meaning: 'because', pronunciation: 'chün-kü', usage: 'yorgunum çünkü çok çalıştım' },
  { word: 'da/de', meaning: 'also/too/at/in', usage: 'ben de (me too) / evde (at home)' },
  { word: 'bi', meaning: 'one/a', usage: 'bi tane (one piece)' },
  { word: 'iş', meaning: 'work/business/thing', usage: 'işim var (I have work)' },
  { word: 'zaman', meaning: 'time', usage: 'zamanın var mı? (do you have time?)' },
  { word: 'gün', meaning: 'day', usage: 'bugün (today)' },
  { word: 'saat', meaning: 'hour/time/clock', usage: 'saat kaç? (what time is it?)' },
  { word: 'yeni', meaning: 'new', usage: 'yeni ev (new house)' },
  { word: 'eski', meaning: 'old', usage: 'eski arkadas (old friend)' },
  { word: 'iyi', meaning: 'good', usage: 'iyi günler (good day)' },
  { word: 'kotü/fena', meaning: 'bad', usage: 'fena değil (not bad)' },
  { word: 'büyük', meaning: 'big/large', usage: 'büyük soru (big question)' },
  { word: 'küçük', meaning: 'small', usage: 'küçük bir şey (a small thing)' },
  { word: 'ilk', meaning: 'first', usage: 'ilk kez (first time)' },
  { word: 'son', meaning: 'last/final/end', usage: 'son olarak (finally)' },
];
