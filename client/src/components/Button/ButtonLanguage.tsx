import { useAtom } from 'jotai';
import { languageAtom } from '../../atomStore';
import { LANGUAGE_ENUM } from '../../models/enums';

const ButtonLanguage = () => {
    const [language, setLanguage] = useAtom(languageAtom);

    const handleClick = () => {
        if (language === LANGUAGE_ENUM.EN) setLanguage(LANGUAGE_ENUM.CS);
        if (language === LANGUAGE_ENUM.CS) setLanguage(LANGUAGE_ENUM.EN);
    };

    return (
        <button className={'languageButton'} onClick={handleClick}>
            <img
                src={language === LANGUAGE_ENUM.CS ? '/images/flag_gb.svg' : '/images/flag_cz.svg'}
                alt={language === LANGUAGE_ENUM.CS ? 'switch to english' : 'přepnout do češtiny'}
            />
        </button>
    );
};

export default ButtonLanguage;