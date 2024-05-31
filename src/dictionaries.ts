import "server-only";

export type Locale = keyof typeof dictionaries;

const dictionaries = {
    ["en"]: () => import('@/dictionaries/en.json').then((module) => module.default),
    ["es"]: () => import('@/dictionaries/es.json').then((module) => module.default),
    ["jp"]: () => import('@/dictionaries/jp.json').then((module) => module.default),
}

export const DEFAULT_LOCALE = 'en';

export const LOCALES = ['es', 'en', 'jp'];

export const getDictionary = async (locale:Locale) => dictionaries[locale]?.() ?? dictionaries[DEFAULT_LOCALE]();