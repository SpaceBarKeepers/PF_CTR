import React, { Dispatch, SetStateAction } from 'react';
import { shippingCountrySelectArray } from '../../models/countries';

type Props = {
    label: string;
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
};

const CountryInput = ({ label, state, setState, name }: Props) => {
    const [inputValue, setInputValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState<{label: string, value: string}[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Filter options based on the input value
        if (value.length > 0) {
            const filteredSuggestions = shippingCountrySelectArray.filter(option =>
                option.label.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue("");
        setState((prev: any) => {
            return { ...prev, [name]: [...(prev[name] || []), suggestion] };
        });
        setSuggestions([]);
    };

    const handleRemoveCountry = (country: string) => () => {
        setState((prev: any) => ({ ...prev, [name]: prev[name].filter((c: string) => c !== country) }));
    }

    return (
        <label htmlFor={name} className={'inputLabel'} style={{ position: 'relative' }}>
            {label}
            <input value={inputValue} type={'text'} onChange={handleChange} {...{ name }} />
            {/* Suggestions list */}
            {suggestions.length > 0 && (
                <ul style={{ position: 'absolute', top: '100%', left: '0', right: '0', padding: '0', margin: '0', listStyleType: 'none', border: '1px solid #ccc', backgroundColor: 'white', zIndex: 1 }}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion.value)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                        >
                            {suggestion.label}
                        </li>
                    ))}
                </ul>
            )}
            {!!state?.[name]?.length && state?.[name].map((country: string) => (
                <div key={country}>
                    {country}
                    <button onClick={handleRemoveCountry(country)}>X</button>
                </div>
            ))}
        </label>
    );
}

export default CountryInput;