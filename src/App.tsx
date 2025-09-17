import './App.css'
import { AddWord } from './AddWord.js';
import { PolishToSpanish } from './polishToSpanish.js';
import { useState } from 'react';

function App() {

  const [showAddWord, setShowAddWord] = useState<boolean>(false);
  const [showPolishToSpanish, setShowPolishToSpanish] = useState<boolean>(false);


  return (
    <>
      <div className="container">
        <button onClick={() => { setShowAddWord(!showAddWord); setShowPolishToSpanish(false); }}>DODAJ SŁÓWKO</button>
        <button onClick={() => { setShowPolishToSpanish(!showPolishToSpanish); setShowAddWord(false); }}>TŁUMACZ Z POLSKIEGO NA HISZPAŃSKI</button>
      </div>

      {showPolishToSpanish && <PolishToSpanish/>}
      {showAddWord && <AddWord/>}
    </>
  )
}

export default App
