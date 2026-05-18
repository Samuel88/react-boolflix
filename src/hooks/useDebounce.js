import { useEffect, useCallback, useState, useRef } from 'react';

/**
 * Hook che ritarda l'esecuzione di debouncedFn finché l'utente non smette
 * di aggiornare il valore per "delay" millisecondi.
 * Utile per evitare chiamate API ad ogni tasto digitato.
 */
function useDebounce(initialValue, delay, debouncedFn) {
    const [debouncedValue, setDebouncedValueInner] = useState(initialValue);

    // useRef conserva l'ID del timeout senza causare re-render quando cambia.
    const timeoutIdRef = useRef(null);

    // useCallback evita di ricreare la funzione ad ogni render (ricreata solo se delay o debouncedFn cambiano).
    const setDebouncedValue = useCallback((value) => {
        setDebouncedValueInner(value);

        // Ogni chiamata annulla il timeout precedente e ne avvia uno nuovo:
        // debouncedFn viene eseguita solo se non arrivano nuove chiamate entro "delay" ms.
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            debouncedFn(value);
        }, delay);

    }, [delay, debouncedFn]);

    // Cleanup: cancella il timeout se il componente viene smontato.
    useEffect(() => {
        return () => clearTimeout(timeoutIdRef.current);
    }, []);

    return [debouncedValue, setDebouncedValue];
};

export default useDebounce;