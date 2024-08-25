import React, { useState } from 'react';
import './autocomplateWhispererInput.scss';

type Props = {
    options: string[];
    setState: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    preIcon?: string;
};

const AutocompleteWhispererInput = ({
                                        options,
                                        setState,
                                        placeholder,
                                        preIcon,
                                    }: Props) => {
    // State to store the input value and the filtered suggestions
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setState(value);

        // Filter options based on the input value
        if (value.length > 0) {
            const filteredSuggestions = options.filter((option) =>
                option.toLowerCase().startsWith(value.toLowerCase()),
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setState(suggestion);
        setSuggestions([]);
    };

    const handleClickClear = () => {
        setInputValue('');
        setState('');
        setSuggestions([]);
    };

    return (
        <div
            className={'autocompleteWhispererInput'}
        >
            {preIcon && (
                <img src={preIcon} alt={''} />
            )}
            <div className={'autocompleteWhispererInput__inputContainer'}>
                <input
                    type="text"
                    value={inputValue}
                    onBlur={() => setTimeout(() => setInputFocused(false), 100)}
                    onChange={handleChange}
                    onFocus={() => setInputFocused(true)}
                    placeholder={placeholder ? placeholder : undefined}
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                    }}
                />

                {/* Suggestions list */}
                {suggestions.length > 0 && (
                    <ul
                        style={{
                            display: inputFocused ? 'block' : 'none',
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{ padding: '8px', cursor: 'pointer' }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={'autocompleteWhispererInput__iconX'} onClick={handleClickClear}>
                <img src={'/icons/icon_x.svg'} alt={''} />
            </div>
        </div>
    );
};

export default AutocompleteWhispererInput;
