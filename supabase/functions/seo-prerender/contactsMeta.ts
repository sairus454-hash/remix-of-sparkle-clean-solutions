// Shared by the contact page and its crawler renderer so the search snippet
// Google shows matches what visitors see. Keep in sync with the visible
// contact details (phone, address, opening hours, booking form).
export const CONTACTS_META = {
  pl: {
    title: 'Kontakt MasterClean Wrocław – pranie tapicerki',
    description: 'Zadzwoń +48 575 211 401 lub wyślij formularz – czynne 24/7. MasterClean, ul. Jedności Narodowej 160, Wrocław. Zamów pranie kanap, materacy i auta.',
  },
  ru: {
    title: 'Контакты MasterClean Вроцлав – химчистка мебели',
    description: 'Звоните +48 575 211 401 или оставьте заявку – работаем 24/7. MasterClean, ul. Jedności Narodowej 160, Вроцлав. Химчистка диванов, матрасов и авто.',
  },
  en: {
    title: 'Contact MasterClean Wrocław – Upholstery Cleaning',
    description: 'Call +48 575 211 401 or send the booking form – open 24/7. MasterClean, ul. Jedności Narodowej 160, Wrocław. Book sofa, mattress and car cleaning.',
  },
  uk: {
    title: 'Контакти MasterClean Вроцлав – хімчистка меблів',
    description: 'Телефонуйте +48 575 211 401 або залиште заявку – працюємо 24/7. MasterClean, ul. Jedności Narodowej 160, Вроцлав. Хімчистка диванів, матраців і авто.',
  },
} as const;
