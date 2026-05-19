import { useState } from 'react';

function debounce(fn, delay) {
    let timeoutId;
    return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(value);
        }, delay);
    };
}

function Test() {
    const [query, setQuery] = useState('');

    const handleSearch = debounce((newQuery) => {
        console.log('Searching for:', newQuery);
    }, 500);

    return (
        <input type="text" 
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Cerca..." />
    )
}
export default Test;