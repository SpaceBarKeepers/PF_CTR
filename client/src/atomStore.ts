import {atom} from "jotai";
import {LANGUAGE_ENUM} from "./models/enums";
import {TokenEntity} from "./models/entities";


export const languageAtom = atom<LANGUAGE_ENUM>("en");
export const tokenAtom = atom<TokenEntity | null>(null);
