import { atom } from 'jotai';
import { LANGUAGE_ENUM } from './models/enums';
import { TokenAdminEntity, TokenEntity } from './models/entities';


export const languageAtom = atom<LANGUAGE_ENUM>(LANGUAGE_ENUM.EN);
export const redirectUrlAtom = atom<string | null>(null);
export const tokenAtom = atom<TokenEntity | null>(null);
export const tokenAdminAtom = atom<TokenAdminEntity | null>(null);
