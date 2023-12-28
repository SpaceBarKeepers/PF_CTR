import {atom} from "jotai";
import {LANGUAGE_ENUM} from "./models/enums";


export const languageAtom = atom<LANGUAGE_ENUM>("en");
