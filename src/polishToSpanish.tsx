import { useEffect, useState, useRef } from "react";
import vocabulary from "../vocabulary.json"

export function PolishToSpanish() {
    const [randomIndex, setRandomIndex] = useState<number>(0);
    const [polishWord, setPolishWord] = useState<string>('');
    const [spanishWord, setSpanishWord] = useState<string>('')
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        getRandomIndex();
    }, [])
    
    useEffect(() => {
        if (randomIndex === null) return;
        setPolishWord(vocabulary[randomIndex]['polish'])
        setSpanishWord(vocabulary[randomIndex]['spanish'])
    }, [randomIndex])

    return (
        <>
        <div className="container">
            <p>{polishWord}</p>
            <input
                type="text"
                ref={inputRef}
                placeholder="Wpisz tłumaczenie po hiszpańsku"
                onFocus={() => setSuccess(false)}
            />
            <button onClick={checkWord}>Sprawdź</button>
            <button onClick={getRandomIndex}>Pomiń</button>

            {error && (
                <>
                    <div className="error-message">
                        <p>BŁĘDNE TŁUMACZENIE !!!</p>
                    </div>
                    <button onClick={() => setShowAnswer(true)}>Pokaż odpowiedź</button>
                </>
            )}
            {success && (
                <div className="success-message">
                    <p>DOBRZE !!!</p>
                </div>
            )}
            </div>
            {showAnswer && (
                <div className="container">
                    <p>{spanishWord}</p>
                </div>
            )}
        </>
    );


    function getRandomIndex() {
        //const randomIndex = Math.floor(Math.random() * vocabulary.length);

        const index = randomIndex;
        const newIndex = index < vocabulary.length - 1 ? index + 1 : 0;
        setRandomIndex(newIndex);
        setError(false);
        setShowAnswer(false);
        
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    function checkWord() {
        if (!inputRef.current || randomIndex === null) return;
        const spanishWordInput = inputRef.current.value;
        if (spanishWordInput !== spanishWord) {
            setError(true);
        }
        else {
            setSuccess(true);
            getRandomIndex();
        }
    }
}