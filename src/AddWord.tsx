import { useState, type FormEvent } from 'react';
import { addWordData } from './utlis/addWordData';

export function AddWord() {


  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('')

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Słówko / wyrażenie po hiszpańsku <br /> (ze znakami hiszpańskimi)</label>

        <input type="text"
          name="spanishWord"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onFocus={handleInputFocus}/>

        <label>Słówko / wyrażenie po polsku <br />(ze znakami polskimi)</label>
        <input type="text"
          name="polishWord"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onFocus={handleInputFocus}/>
        <button type="submit">DODAJ SŁOWO</button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div className="success-message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );

function handleInputFocus() {
  setError('');
  setMessage('');
};

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const spanishWord = (formData.get('spanishWord') as string).toLowerCase();
    const polishWord = (formData.get('polishWord') as string).toLowerCase();
    const body = {
      spanish: spanishWord,
      polish: polishWord
    }

    try {
        const result = await addWordData(body);
        console.log('Słowo dodane:', result);
        form.reset(); 
        setMessage('Słowo Dodane');
        setError(''); 
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError('Wystąpił nieoczekiwany błąd');
        }
        setMessage(''); 
    }
}
}
