import { DialogueCategory } from '../types';

export const conversationCategories: DialogueCategory[] = [
  {
    id: 'kimlik-bureaucracy',
    title: 'Kimlik & Göç İdaresi Bureaucracy',
    turkishTitle: 'İkamet İzni ve Nüfus Müdürlüğü',
    icon: 'FileCheck',
    description: 'Master residence permits (İkamet), biometric fingerprint appointments, address registrations, and government office interactions without anxiety.',
    badge: 'Crucial Survival',
    color: 'bg-red-500',
    dialogues: [
      {
        id: 'goc-randevu',
        title: 'At the Immigration Counter (Göç İdaresi)',
        scenario: 'You are at your assigned time window at the Migration Management office to submit your student residence permit folder.',
        lines: [
          {
            speaker: 'Immigration Officer',
            role: 'official',
            turkish: 'Sıradaki numara! Buyrun, ne için geldiğinizi belirtin.',
            english: 'Next number! Go ahead, state why you came.',
            pronunciation: 'Suh-rah-dah-kee nu-mah-rah! Buy-run, neh ee-chin gel-dee-yuh-nee-zi beh-leer-tin.'
          },
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Kolay gelsin efendim. Öğrenci ikamet izni için saat 10 randevum vardı. Buyrun evrak dosyam.',
            english: 'May your work come easy sir/ma’am. I had a 10:00 AM appointment for a student residence permit. Here is my document folder.',
            pronunciation: 'Ko-lye gel-seen eh-fen-dee-m. Oh-ree-en-jı ee-kaa-met eez-nee ee-cheen sah-at on ran-deh-vum var-duh. Buy-run ev-rak dos-yam.',
            grammarNote: '"Buyrun evrak dosyam" is the most professional and crisp way to present paperwork.'
          },
          {
            speaker: 'Immigration Officer',
            role: 'official',
            turkish: 'Evraklarınızı inceleyelim... Sağlık sigortanız ve öğrenci belgeniz aslı mı? Fotokopi mi?',
            english: 'Let us inspect your documents... Are your health insurance and student certificate original or photocopy?',
            pronunciation: 'Ev-rak-lah-ruh-nuh-zuh een-jeh-ley-yeh-leem... Sag-luk see-gor-ta-nuhz veh oh-ren-jee bel-geh-neez as-luh muh? Fo-to-ko-pi mee?'
          },
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'İkisi de üniversiteden onaylı ıslak imzalı orijinal aslıdır efendim.',
            english: 'Both are wet-signed originals approved by the university, sir/ma’am.',
            pronunciation: 'Ee-ki-si deh u-ni-ver-si-tey-den o-nye-li us-lak im-zalı o-rii-jee-nal as-li-dir eh-fen-deem.',
            grammarNote: '"Islak imzalı" (wet signed / authentic ink pen signature + stamp) is gold standard in Turkish institutions.'
          },
          {
            speaker: 'Immigration Officer',
            role: 'official',
            turkish: 'Harika. Şimdi sağ alt kattaki odaya gidip parmak izi verin. Kargo adresiniz kayıtlı mı?',
            english: 'Great. Now go to the room on the bottom right floor and provide your fingerprints. Is your shipping address registered?',
            pronunciation: 'Haa-ri-ka. Shim-di saa alt kat-tah-kee o-day-a gee-diip par-mak ee-zee ve-riin. Kar-go ad-re-seen-eez kahy-uhz-li mi?'
          },
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Evet efendim, üniversite yurdu olarak kaydetti. Çok teşekkür ederim, kolay gelsin!',
            english: 'Yes sir/ma’am, it was registered as the university dormitory. Thank you very much, have easy work!',
            pronunciation: 'Eh-vet eh-fen-dim, u-ni-ver-si-teh yur-doo oh-lah-rag khay-det-tuh. Chok teh-shek-kur eh-de-reem, ko-lye gel-seeen!'
          }
        ],
        keyPhrases: [
          { turkish: 'Islak imzalı aslıdır', english: 'It is a wet-signed original document', why: 'Prevents rejection due to digital printout queries.' },
          { turkish: 'Parmak izi verme odayı arıyorum', english: 'I am looking for the fingerprinting room', why: 'Essential for completing biometric registration on-site.' },
          { turkish: 'İkametgah kaydım e-devlette hazır', english: 'My address registration is ready in e-Government system', why: 'Proves residential compliance.' }
        ]
      },
      {
        id: 'vergi-nufus',
        title: 'Getting Your Tax Number & Bank Setup',
        scenario: 'To open a Turkish bank account or pay university tuition/residence fees, you need a Vergi Numarası (Tax ID) from the tax office or digital portal.',
        lines: [
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Merhaba, yabancılar için vergi kimlik numarası başvurusunda bulunmak istiyorum.',
            english: 'Hello, I want to make an application for a Foreigner Tax ID number.',
            pronunciation: 'Mer-ha-ba, ya-bahn-jee-la-r ee-cheen ver-gee keem-leeq noo-mah-rah-suh bash-voo-roos-un-da bu-lun-makh ees-tee-yor-oom.'
          },
          {
            speaker: 'Tax Desk Official',
            role: 'official',
            turkish: 'Pasaportunuz ve fotokopisini uzatın lütfen. Telefon numaranız nedir?',
            english: 'Hand over your passport and its photocopy please. What is your phone number?',
            pronunciation: 'Pas-ah-port-oo-nuz veh fo-tö-ko-pi-sin-i ooh-za-tin lyut-feen. Te-le-foon nu-mah-ran-uz ne-deer?'
          },
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Buyrun pasaportum. Numaram sıfır beşyüz otuz iki... İşlem ücretli mi?',
            english: 'Here is my passport. My number is zero five hundred thirty two... Is there an operational fee?',
            pronunciation: 'Buy-run pas-ah-port-oom. Nu-ma-rah-m suh-fur besh-yooz oh-too-z ee-kee... Ees-lhem yuj-ret-li mi?'
          },
          {
            speaker: 'Tax Desk Official',
            role: 'official',
            turkish: 'Hayır, tamamen ücretsiz. İşte çıktınız, vergi numaranız buradaki 10 haneli rakam.',
            english: 'No, completely free of charge. Here is your printout, your tax number is the 10-digit figure here.',
            pronunciation: 'Hahy-uhr, tah-mah-men uj-reh-ziz. Eesh-teh chick-ti-nız, ver-ghee nu-ma-rah-nız buu-rah-da-kee on ha-neh-lee rah-kah-m.'
          }
        ],
        keyPhrases: [
          { turkish: 'Vergi kimlik numarası', english: 'Tax ID Number', why: 'Required to open accounts at Ziraat Bankası, İş Bankası, etc.' },
          { turkish: 'İşlem ücretsiz midir?', english: 'Is the process free of charge?', why: 'Good to clarify government fees vs tax stamps (Harç).' }
        ]
      }
    ]
  },
  {
    id: 'university-life',
    title: 'University Enrollment & Campus Life',
    turkishTitle: 'Üniversite Kayıt ve Öğrenci İşleri',
    icon: 'GraduationCap',
    description: 'Conquer Öğrenci İşleri (Student Affairs), transcript requests, library cards, student dormitory check-ins, and talking to Professors.',
    badge: 'Student Essential',
    color: 'bg-indigo-600',
    dialogues: [
      {
        id: 'ogrenci-isleri',
        title: 'At the Student Affairs Office (Öğrenci İşleri)',
        scenario: 'Requesting your official enrollment certificate (Öğrenci Belgesi) for transit card student discount and residence permit.',
        lines: [
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Kolay gelsin efendim, yeni kabul aldım. Resmi öğrenci belgesi ve indirimli akbil formu almak istiyorum.',
            english: 'Hello sir/ma’am (may your work come easy), I am newly accepted. I want to get my official student certificate and discount transit card form.',
            pronunciation: 'Ko-lye gel-sin eh-fen-diim, ye-ni kah-bu-l al-duhm. Res-mi oh-ren-jee bel-gey-su ve een-dir-eey-mlee ak-bil for-mooh ah-l-mahk is-tee-yor-u-m.'
          },
          {
            speaker: 'University Registrar',
            role: 'staff',
            turkish: 'Hoşgeldiniz. Öğrenci numaranızı veya pasaportunuzu rica edeyim. Lise diploma denkliği getirdiniz mi?',
            english: 'Welcome. May I request your student ID number or passport? Did you bring high school diploma equivalency?',
            pronunciation: 'Hosh-geld-eey-niz. Oh-ree-en-jı nuh-mah-rah-nuh-zı vey-a pas-ah-po-rto-nuz-u rıyja eh-day-ym. Lee-suh dip-lo-maa deey-nk-li-yi gyee-teey-rd-iniz mi?'
          },
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Evet, denklik evrağım burada. Öğrenci numaram iki binden başlıyor. İngilizce versiyonu da var mı?',
            english: 'Yes, my equivalency document is here. My student ID starts with two thousand. Is there also an English version?',
            pronunciation: 'Eh-vet, de-nk-leeq ev-raa-um boo-ra-da. Oh-ren-ju nu-mah-ram ee-ki been-dan bash-luh-yor. Eey-ngli-zi je ver-si-yo-nu da var muh?'
          },
          {
            speaker: 'University Registrar',
            role: 'staff',
            turkish: 'Tabii, hem Türkçe hem İngilizce basıyorum. Bu belgeyle Metro İstanbula gidip öğrenci kartı çıkarabilirsiniz.',
            english: 'Of course, I am printing both Turkish and English. With this document you can go to Metro Istanbul and issue a discounted student pass.',
            pronunciation: 'Ta-byy, hem Turu-kjheh hem Eeng-li-ji basee-yor-um. Bu bel-gay-lay Meh-t-roh ees-tahn-bu-la gee-dip oh-ree-en-jee kar-tuh chi-kar-ab-ilu-rusu-nz.'
          }
        ],
        keyPhrases: [
          { turkish: 'Öğrenci Belgesi almak istiyorum', english: 'I want to obtain a Student Certificate', why: 'Your Golden Ticket to half-price metro rides and legal status.' },
          { turkish: 'Ders seçimi ve kayıt onaylama', english: 'Course selection and enrollment approval', why: 'Essential vocabulary during semester drop-add week.' },
          { turkish: 'Hocam, danışmanlık saatinde görüşebilir miyiz?', english: 'Professor (My Teacher), can we meet during office advisory hours?', why: 'In Turkey, address professors respectfully as "Hocam" (My Teacher/Master).' }
        ]
      },
      {
        id: 'yurt-dorm',
        title: 'Checking into the Student Dormitory (Yurt)',
        scenario: 'Arriving at the dormitory reception to get your room key and clarify meal times.',
        lines: [
          {
            speaker: 'You (Student)',
            role: 'user',
            turkish: 'Merhaba iyi günler, yurt kaydım yapılmıştı. Oda anahtarımı ve giriş kartımı teslim almak istiyorum.',
            english: 'Hello good afternoon, my dorm reservation was made. I want to take delivery of my room key and entry badge.',
            pronunciation: 'Mer-hah-baa ee-yi gun-ler, yoort kaye-dım ya-pul-mısh-tuh. O-dah ah-nahy-tarı-mı veh gee-rish kar-tiu-mı tess-leem almak eess-teyh-rum.'
          },
          {
            speaker: 'Dorm Manager',
            role: 'staff',
            turkish: 'Hoş geldin, oda 304 senin. Akşam yemeği saat 18 ile 20 arası yemekhanede servis edilir.',
            english: 'Welcome, room 304 is yours. Dinner is served in the cafeteria between 18:00 and 20:00.',
            pronunciation: 'Hosh gel-deeyn, o-dah eej-yuz dohrth say-nin. Ak-sham ye-meh-yuh sa-at on sehk-izz eee-lay yeer-mee ahy-ree-su ye-meey-kahn-eda seh-ver-is eh-dy-luh.'
          }
        ],
        keyPhrases: [
          { turkish: 'Yemekhane hangi saatler arası açık?', english: 'Between which hours is the dining cafeteria open?', why: 'Crucial to never miss affordable student meals!' },
          { turkish: 'Çamaşırhane rezervasyonu nasil yapabilirim?', english: 'How can I make a laundry room booking?', why: 'Dorm life practical necessity.' }
        ]
      }
    ]
  },
  {
    id: 'transportation-transit',
    title: 'Transportation: Dolmuş, Metro & Taxi Scams',
    turkishTitle: 'Ulaşım: Dolmuş, Akbil ve Taksimetre',
    icon: 'Bus',
    description: 'Learn how to pass cash in shared minibuses, yell out your stops with confidence, top up transit cards, and negotiate taxis cleanly.',
    badge: 'Daily Action',
    color: 'bg-amber-600',
    dialogues: [
      {
        id: 'dolmus-ride',
        title: 'The Dolmuş (Shared Minibus) Survival Ceremony',
        scenario: 'Riding a crowded Turkish Dolmuş where money is passed hand-to-hand and there are no stops except verbal yelling.',
        lines: [
          {
            speaker: 'You (Passenger)',
            role: 'user',
            turkish: '(To passenger in front) Afedersiniz, Kadıköy için bir kişi alabilir misiniz? Üstü de bozuk lütfen.',
            english: 'Excuse me, can you pass payment for one person to Kadıköy? And change from the banknote please.',
            pronunciation: 'Ahy-fuh-der--sin-iz, Kah-dee-kehy eey-chu-n bir kyy-shı ahy-lahy-beey-li-r mys-uh-nuhz? Uste de b-oh-zük lyut--f-enn.'
          },
          {
            speaker: 'Fellow Passenger',
            role: 'stranger',
            turkish: 'Kaptan! Arkadan bir Kadıköy var, ellili liradan üstü ver.',
            english: 'Captain (Driver)! One Kadikoy from the back, provide change out of a fifty lira bill.',
            pronunciation: 'Kap-tan! Arkh-ay-dan b-ir Kaa-dıe-kehye var, eyy-lee lee-raa-dann u-stuu vey-rr.'
          },
          {
            speaker: 'Dolmuş Driver',
            role: 'driver',
            turkish: 'Buyrun, arkadaki arkadaşın para üstü otuz lira.',
            english: 'Here you go, change of thirty lira for the friend in the back.',
            pronunciation: 'Byuy-rn, arrr-khah-daa--kyı arr-kah-dashing pa-raa uss-tyuu otoz liyyrra.'
          },
          {
            speaker: 'You (Approaching Stop)',
            role: 'user',
            turkish: 'Kaptan, müsait bir yerde inebilir miyim? Köşede dur, teşekkürler!',
            english: 'Captain, can I alight at a convenient location? Stop at the corner, thank you!',
            pronunciation: 'Kahp-tha-n, Myuu--sa-ytt-e byi--r yyerrr-dä iy-nnuh-byeelyu-r myiyh--um? Kuhu-shay--duhu door, tay-shay--kuhyruu--ler!'
          }
        ],
        keyPhrases: [
          { turkish: 'Müsait bir yerde', english: 'At a convenient / permitted place (to get off)', why: 'The #1 phrase every visitor must know by heart in Turkish transit.' },
          { turkish: 'İki kişi, biri öğrenci alur mısın?', english: 'Two people, one student, can you take payment?', why: 'Claiming your cheaper student fare on transit vehicles.' }
        ]
      },
      {
        id: 'taxi-negotiation',
        title: 'Taking a Taxi Without Being Overcharged',
        scenario: 'Getting into a yellow taxi (Taksi) outside an airport or train hub.',
        lines: [
          {
            speaker: 'You (Passenger)',
            role: 'user',
            turkish: 'Kolay gelsin ustam. Taksimetre açık mı? Boğaziçi Üniversitesine gidiyoruz.',
            english: 'May your work come easy master. Is the taximeter turned on? We are heading to Bogazici University.',
            pronunciation: 'Koh-lhy--e ghyeel--syne uu-staah-m. Tah-k--see--mee--turee a-chük mü? Bohy--gha-zujyh-y Uyee--niyyv-air-siteh-seeenyuh ghidye-yohruhhz.'
          },
          {
            speaker: 'Taxi Driver',
            role: 'driver',
            turkish: 'Hoşgeldin abi/abla. Açtım taksimetreyi. Otoyoldan mı gidelim yoksa sahilden mi?',
            english: 'Welcome brother/sister. I started the meter. Shall we take the toll highway or along the coastal seaside?',
            pronunciation: 'Hooshghyelde-yyn a-bih/ab-lah. Ah--jh--tiuhm takkksimyytreyee. O-ttyohldan mui guhyde-leem yoksa sahhyil-deen myi?'
          },
          {
            speaker: 'You (Passenger)',
            role: 'user',
            turkish: 'Hangisinde trafik daha azsa oradan gidelim lütfen. En kısa yol olsun.',
            english: 'Whichever has less traffic, let us proceed through there please. Let it be the shortest route.',
            pronunciation: 'Haa-n-gi-sineh dyah thraahfeyke dha hyazzsza ohrahuhdan gheydeeeleyym lyutee-fen. E-nnn kuu--saa yowh ool-soon.'
          }
        ],
        keyPhrases: [
          { turkish: 'Taksimetreyi açmayı unuttunuz galiba', english: 'I think you might have forgotten to switch on the taximeter', why: 'Polite reminder if a cab driver claims a flat Rate scam.' },
          { turkish: 'Burada inebilir miyim, borcum ne kadar?', english: 'Can I step down here, how much is my debt (cost)?', why: 'Polite wording for "how much do I owe you".' }
        ]
      }
    ]
  },
  {
    id: 'money-paying-receipts',
    title: 'Money, Paying Cash & Reading Receipts',
    turkishTitle: 'Para, Hesap Ödeme ve Fiş Okuma',
    icon: 'Receipt',
    description: 'Master checkout counters, asking for checks in restaurants, splitting accounts, verifying KDV tax rows on receipts, and counting small change.',
    badge: 'Money Saver',
    color: 'bg-emerald-600',
    dialogues: [
      {
        id: 'restaurant-hesap',
        title: 'Asking for the Check and Splitting the Bill',
        scenario: 'Finishing a meal at a kebap or lokanta eatery with friends.',
        lines: [
          {
            speaker: 'You (Diner)',
            role: 'user',
            turkish: 'Bakar mısınız ustam? Yemegimiz çok lezzetliydi. Hesap alabilir miyiz lütfen?',
            english: 'Could you look here my master (waiter)? Our meal was delicious. Can we get the bill please?',
            pronunciation: 'Baahy--kuhrrr mıee-si--nuuz uu--ss-tam? Yeuhy-myuh-guimuiz tjjok leh-zzeh-tyley-duhy. Heh--saapp ahylaah-bee-leer myi--yhiz lyu--tfen?'
          },
          {
            speaker: 'Waiter',
            role: 'staff',
            turkish: 'Afiyet olsun efendim! Hesabı tek bir yerden mi çekeceğiz, yoksa ayrı ayrı mı ödeyeceksiniz?',
            english: 'May it bring health (Bon appetit) sir! Will we charge the check from a single place, or will you pay individually separately?',
            pronunciation: 'Aaffiyy-ayth oh-ssunn eh--fee--ndim! Heh--sah-bbie tae-k buyiir yeerr--dun mhı checkaejayeeuh, yo--k-s-sa ayhreeu aiihreyee mi ohdeeayejaahehkseeen-iizz?'
          },
          {
            speaker: 'You (Diner)',
            role: 'user',
            turkish: 'Ayrı ayrı ödeyelim lütfen. Benimki çorba ve ayran. Temassız ödeyeceğim.',
            english: 'Let us pay separately individually please. Mine was soup and yogurt drink (ayran). I will pay contactless.',
            pronunciation: 'Aayy--ruh aa-ye-ri o-dey-yeuh-lyhm lyootee--fn. Beenymkeie chaahrba veh aa--e-raau-nh. Thaymhauu--zuh--zz oh-dehyeh--jee--uh-eyym.'
          },
          {
            speaker: 'Waiter',
            role: 'staff',
            turkish: 'Buyrun, kartınızı yaklaştırabilirsiniz. Fişinizi ister misiniz?',
            english: 'Go ahead, you may bring your card close (tap). Would you like your receipt (fiş)?',
            pronunciation: 'Bu-yeer-run, khartuhy--nuzu yakh-layshtuhrhabilhyyursunuz. Fiy--shyee--nuu-zuyy isth-eh--rr myee--sihynyyzz?'
          }
        ],
        keyPhrases: [
          { turkish: 'Ayrı ayrı ödeyebilir miyiz?', english: 'Can we pay separately (split bill)?', why: 'Universal way to divide group bills without confusing Turkish cashiers.' },
          { turkish: 'Para üstünü kalsın, garson arkadaşlar için', english: 'Keep the change, for the waiter friends (Tip)', why: 'Tipping 5% to 10% in cash at Turkish dining spots is warmly respected.' },
          { turkish: 'Bu adisyonda bir yanlışlık var mı?', english: 'Is there an error on this order ticket (Adisyon)?', why: 'Asking calmly if extra items were billed by mistake.' }
        ]
      },
      {
        id: 'supermarket-checkout',
        title: 'Supermarket Checkout & Shopping Bag Etiquette',
        scenario: 'At Migros or A-101 supermarket checkout register.',
        lines: [
          {
            speaker: 'Cashier',
            role: 'cashier',
            turkish: 'Hoşgeldiniz. Poşet ister misiniz? 50 kuruş ücretli.',
            english: 'Welcome. Would you like a plastic bag (poşet)? It costs 50 kurus by law.',
            pronunciation: 'Hooh--jhghyeh--ledyeenyyz. Poe--shayeeth eee--z-tayur mhysynn-eez? Elhlee ku-rooojh youuu--juryt--li.'
          },
          {
            speaker: 'You (Shopper)',
            role: 'user',
            turkish: 'Bir tane büyük poşet verin lütfen. Nakit ödeyeceğim, 200 TL bozar mısınız?',
            english: 'Give one large plastic bag please. I will pay in cash, can you make change for a 200 TL banknote?',
            pronunciation: 'Bihyyir tyhaanay buuuyyuk po--shaeye--eth veuhy--ryhn lyooyut--fa-een. Nahyy-kiittt oh-dhayeeyaahehjayeeyeum, iiky--yuuzzz Tyeae-layy bhoyzahrrr mhuhsyunnhuz?'
          },
          {
            speaker: 'Cashier',
            role: 'cashier',
            turkish: 'Tabii bozarım. Ara toplam 142 lira, işte para üstünüz ve fişiniz. İyi günler!',
            english: 'Of course I can make change. Subtotal is 142 lira, here is your change and your receipt. Good day!',
            pronunciation: 'Tayaahbyiih bhoeyy-zaahr-uu-mh. Ahra toop--llammm yuyzz kukh ih-kii leehraah, eyeesh-taye pa--rra-uh uusz-thyunnuz veyy fyiiiyyshynyhyehz. EEeeye guune--leerrr!'
          }
        ],
        keyPhrases: [
          { turkish: '200 lira bozar mısınız? / Bozuk var mı?', english: 'Can you break a 200 lira banknote? / Do you have small change?', why: 'Crucial for morning shop purchases or taxis when carrying large bills.' },
          { turkish: 'İndirimli ürün, değil mi?', english: 'This is a discounted shelf item, correct?', why: 'Verifying checkout scans match discount price tag stickers.' }
        ]
      }
    ]
  },
  {
    id: 'finding-places-navigation',
    title: 'Finding Places & Street Navigation',
    turkishTitle: 'Yön Bulma ve Adres Sorma',
    icon: 'MapPin',
    description: 'Ask for walking directions, locate over-night pharmacies (Nöbetçi Eczane), find ATM machines, and understand Turkish left-right instructions.',
    badge: 'Street Smarts',
    color: 'bg-cyan-600',
    dialogues: [
      {
        id: 'pharmacy-search',
        title: 'Finding an Emergency On-Duty Pharmacy (Nöbetçi Eczane)',
        scenario: 'It is 10 PM on a Sunday and you urgently need throat spray or headache medicine.',
        lines: [
          {
            speaker: 'You (Pedestrian)',
            role: 'user',
            turkish: 'Afedersiniz rahatsız ediyorum. Bu saatte yakında nöbetçi eczane nerede bulabilirim?',
            english: 'Excuse me for disturbing. At this hour, where can I find an on-duty overnight pharmacy nearby?',
            pronunciation: 'Ahfeeydeuursinyeez rayaahaathsuz eydy-yohrumm. Byoouh shaah-taeh yehah-khyu-ndea nyoou-behthjee ejeehzza-nyay neeyeey-ruhudau the booyla-byiyleereehe-um?'
          },
          {
            speaker: 'Local Resident',
            role: 'stranger',
            turkish: 'Dümdüz ilerleyin, valilik binasını geçip sol kolunuzda, kırmızı neon ışıkları göreceksiniz.',
            english: 'Proceed straight ahead (dümdüz), pass the governor building and on your left arm, you will see red neon lights.',
            pronunciation: 'Duyymd-yoohzz iiyyleehreyleyeen, vaahyylyuhyk byeenasyhuhyuu gyeyhyjiup ssoyl khoeyl-yoo-nyoo-zzdya, kuuyhyruy-muz-uh nyoohhn uhyş-ıkeelayhehyreuu gohhraajeekhhseeniize.'
          },
          {
            speaker: 'You (Pedestrian)',
            role: 'user',
            turkish: 'Buradan yürüyerek ne kadar sürer? Beş dakikadan az mı?',
            english: 'How long will it take on foot from here? Less than five minutes?',
            pronunciation: 'Bu-rayuudann yeuyryuyuu-yeerrek neh kahuu--dhahh suh-rayhhir? Beeyjj dhayeek-ee-khyayaheeedahn ahyzz mhı?'
          },
          {
            speaker: 'Local Resident',
            role: 'stranger',
            turkish: 'Evet iki dakika yürüyüm mesafesinde. Geçmiş olsun!',
            english: 'Yes two minutes within walking distance. May it pass soon (Get well soon)!',
            pronunciation: 'Eevehyt eeeykee deyeekuhyikhaah yeeyuuyreyeuyyyeue meeeyhesehyeefeahsyiiyndae. Gehjyuh-myyyhss oh-lhsoo-oon!'
          }
        ],
        keyPhrases: [
          { turkish: 'Dümdüz gidin, sağa / sola dönün', english: 'Go straight ahead, turn to the right / left', why: 'The standard GPS vocabulary in everyday pedestrian Turkish.' },
          { turkish: 'Geçmiş olsun!', english: 'May it pass! (Get well soon / Hope your hardship ends)', why: 'Always say this when anyone mentions illness, doctor, or accident.' }
        ]
      }
    ]
  }
];
