// Профили городов: характеристики, влияющие на генерацию уникального контента.
// Используется в cityContentGenerator.ts для построения разных текстов и FAQ.

export type CityType =
  | 'wroclaw-base'      // Wrocław и его прямые «спутники» (Smolec, Bielany Wrocławskie) — базовые цены
  | 'wroclaw-suburb'    // ближнее кольцо Wrocław (≤ 30 км)
  | 'lower-silesia'     // прочие города дольнослёнского воеводства
  | 'opolskie'          // опольское воеводство
  | 'wielkopolskie'     // великопольское воеводство
  | 'tourist'           // курортный/туристический район (Karkonosze, Kotlina Kłodzka)
  | 'industrial';       // промышленный (Zagłębie Miedziowe и т.п.)

export interface CityProfile {
  type: CityType;
  distanceKm?: number;          // ориентировочное расстояние от Wrocław
  landmark?: string;            // короткое уникальное упоминание (без выдумок)
  emphasis: 'speed' | 'fullRange' | 'tourism' | 'industry' | 'history' | 'suburb';
  nearby?: string[];            // города поблизости (для текста)
  fullServiceCity?: boolean;    // доступны ли уборка и handyman (только Wrocław base)
}

export const cityProfiles: Record<string, CityProfile> = {
  // === Wrocław base (полный спектр, без наценки) ===
  'wroclaw': { type: 'wroclaw-base', emphasis: 'fullRange', fullServiceCity: true, nearby: ['Smolec', 'Bielany Wrocławskie', 'Siechnice'] },
  'smolec': { type: 'wroclaw-base', distanceKm: 12, emphasis: 'suburb', fullServiceCity: true, nearby: ['Wrocław', 'Kąty Wrocławskie'] },
  'bielany-wroclawskie': { type: 'wroclaw-base', distanceKm: 10, emphasis: 'suburb', fullServiceCity: true, nearby: ['Wrocław', 'Kobierzyce'] },

  // === Ближнее кольцо Wrocław ===
  'olawa': { type: 'wroclaw-suburb', distanceKm: 30, emphasis: 'speed', nearby: ['Jelcz-Laskowice', 'Wrocław'] },
  'jelcz-laskowice': { type: 'wroclaw-suburb', distanceKm: 25, emphasis: 'speed', nearby: ['Oława', 'Wrocław'] },
  'kielczow': { type: 'wroclaw-suburb', distanceKm: 15, emphasis: 'speed', nearby: ['Wrocław', 'Długołęka'] },
  'siechnice': { type: 'wroclaw-suburb', distanceKm: 12, emphasis: 'suburb', nearby: ['Wrocław', 'Święta Katarzyna'] },
  'katy-wroclawskie': { type: 'wroclaw-suburb', distanceKm: 22, emphasis: 'suburb', nearby: ['Wrocław', 'Smolec'] },
  'tyniec-maly': { type: 'wroclaw-suburb', distanceKm: 18, emphasis: 'suburb', nearby: ['Wrocław', 'Kąty Wrocławskie'] },
  'sobotka': { type: 'wroclaw-suburb', distanceKm: 35, landmark: 'Ślęża', emphasis: 'history', nearby: ['Wrocław', 'Świdnica'] },
  'olesnica': { type: 'wroclaw-suburb', distanceKm: 30, landmark: 'Zamek Książąt Oleśnickich', emphasis: 'history', nearby: ['Wrocław', 'Bierutów'] },
  'brzeg-dolny': { type: 'wroclaw-suburb', distanceKm: 40, emphasis: 'speed', nearby: ['Wrocław', 'Środa Śląska'] },
  'sroda-slaska': { type: 'wroclaw-suburb', distanceKm: 35, landmark: 'Skarb Średzki', emphasis: 'history', nearby: ['Wrocław', 'Brzeg Dolny'] },
  'zmigrod': { type: 'wroclaw-suburb', distanceKm: 50, landmark: 'Dolina Baryczy', emphasis: 'tourism', nearby: ['Trzebnica', 'Milicz'] },

  // === Промышленные / Zagłębie Miedziowe ===
  'lubin': { type: 'industrial', distanceKm: 80, emphasis: 'industry', nearby: ['Polkowice', 'Głogów', 'Chojnów'] },
  'polkowice': { type: 'industrial', distanceKm: 90, emphasis: 'industry', nearby: ['Lubin', 'Głogów'] },
  'glogow': { type: 'industrial', distanceKm: 100, landmark: 'Odra', emphasis: 'history', nearby: ['Polkowice', 'Lubin'] },
  'legnica': { type: 'lower-silesia', distanceKm: 70, emphasis: 'fullRange', nearby: ['Lubin', 'Chojnów', 'Złotoryja'] },

  // === Дольнослёнские (за кольцом) ===
  'swidnica': { type: 'lower-silesia', distanceKm: 55, landmark: 'Kościół Pokoju (UNESCO)', emphasis: 'history', nearby: ['Świebodzice', 'Strzegom'] },
  'strzegom': { type: 'lower-silesia', distanceKm: 65, landmark: 'kopalnie granitu', emphasis: 'industry', nearby: ['Świdnica', 'Jawor'] },
  'walbrzych': { type: 'lower-silesia', distanceKm: 75, landmark: 'Zamek Książ', emphasis: 'tourism', nearby: ['Szczawno-Zdrój', 'Boguszów-Gorce'] },
  'dzierzoniow': { type: 'lower-silesia', distanceKm: 60, landmark: 'Góry Sowie', emphasis: 'tourism', nearby: ['Bielawa', 'Pieszyce'] },

  // === Туристические / горные ===
  'jelenia-gora': { type: 'tourist', distanceKm: 110, landmark: 'Karkonosze', emphasis: 'tourism', nearby: ['Karpacz', 'Szklarska Poręba'] },
  'klodzko': { type: 'tourist', distanceKm: 90, landmark: 'Twierdza Kłodzka', emphasis: 'tourism', nearby: ['Polanica-Zdrój', 'Kudowa-Zdrój', 'Bystrzyca Kłodzka'] },

  // === Opolskie ===
  'opole': { type: 'opolskie', distanceKm: 100, emphasis: 'fullRange', nearby: ['Brzeg', 'Krapkowice'] },
  'brzeg': { type: 'opolskie', distanceKm: 45, emphasis: 'speed', nearby: ['Opole', 'Namysłów', 'Grodków'] },
  'nysa': { type: 'opolskie', distanceKm: 110, landmark: 'Śląski Rzym', emphasis: 'history', nearby: ['Otmuchów', 'Paczków'] },
  'namyslow': { type: 'opolskie', distanceKm: 60, landmark: 'mury obronne', emphasis: 'history', nearby: ['Brzeg', 'Kluczbork'] },

  // === Wielkopolskie ===
  'kalisz': { type: 'wielkopolskie', distanceKm: 160, emphasis: 'history', nearby: ['Ostrów Wielkopolski', 'Pleszew'] },
  'leszno': { type: 'wielkopolskie', distanceKm: 130, emphasis: 'speed', nearby: ['Rawicz', 'Gostyń'] },
  'ostrow-wielkopolski': { type: 'wielkopolskie', distanceKm: 165, emphasis: 'fullRange', nearby: ['Kalisz', 'Krotoszyn'] },
};

export const getCityProfile = (slug: string): CityProfile => {
  return cityProfiles[slug] || { type: 'lower-silesia', emphasis: 'fullRange' };
};
