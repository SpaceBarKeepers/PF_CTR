import React, { useState } from 'react';

type Props = {
    options: string[];
    setState: React.Dispatch<React.SetStateAction<string>>;
};

const AutocompleteWhispererInput = ({options, setState}: Props) => {
    // State to store the input value and the filtered suggestions
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setState(value);

        // Filter options based on the input value
        if (value.length > 0) {
            const filteredSuggestions = options.filter(option =>
                option.toLowerCase().startsWith(value.toLowerCase())
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

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            {/* Input field */}
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type something..."
                style={{ width: '100%', padding: '8px' }}
            />

            {/* Suggestions list */}
            {suggestions.length > 0 && (
                <ul style={{ position: 'absolute', top: '100%', left: '0', right: '0', padding: '0', margin: '0', listStyleType: 'none', border: '1px solid #ccc', backgroundColor: 'white', zIndex: 1 }}>
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
    );
}

export default AutocompleteWhispererInput;
