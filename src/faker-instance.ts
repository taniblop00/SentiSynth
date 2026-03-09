import { Faker, en, he, fr, zh_CN, it, de, ja, ar, es } from '@faker-js/faker';

let currentFaker = new Faker({ locale: [en] });

let currentLangStr = 'en';

export function setFakerLanguage(langStr: string) {
    currentLangStr = langStr.toLowerCase();
    const langMap: Record<string, any> = {
        'en': en,
        'he': he,
        'fr': fr,
        'zh': zh_CN,
        'it': it,
        'de': de,
        'ja': ja,
        'ar': ar,
        'es': es,
    };

    const selected = langMap[langStr.toLowerCase()] || en;
    // We pass [selected, en] so it falls back to English if strings are missing
    currentFaker = new Faker({ locale: [selected, en] });
}

export function getCurrentLanguage() {
    return currentLangStr;
}

export function getFaker() {
    return currentFaker;
}

export const faker = new Proxy({}, {
    get(target, prop) {
        return (currentFaker as any)[prop];
    }
}) as Faker;
