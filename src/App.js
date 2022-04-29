import React, { useEffect, useState } from 'react'
import Figure from './components/Figure'
import Header from './components/Header'
import Notification from './components/Notification'
import Popup from './components/Popup'
import Word from './components/Word'
import WrongLetters from './components/WrongLetters'
import {showNotification as show} from './helpers/helpers'
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const App = () => {
    const [playable, setPlayable] = useState(true)
    const [correctLetters, setCorrectLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    useEffect(()=>{
      const handleKeyDown=(e)=>{
        const {key,keyCode}=e;
          if (playable&&keyCode >= 65 && keyCode <= 90) {
            const letter = key.toLowerCase();
      
            if (selectedWord.includes(letter)) {
              if (!correctLetters.includes(letter)) {
                setCorrectLetters(currentLetters=>[...currentLetters,letter])
              } else {
                show(setShowNotification)
              }
            } else {
              if (!wrongLetters.includes(letter)) {
                setWrongLetters(wrongLetters=>[...wrongLetters,letter])
              } else {
                show(setShowNotification)
              }
            }
          }
      }
      window.addEventListener('keydown', handleKeyDown)
      return ()=>window.removeEventListener('keydown',handleKeyDown)
    },[correctLetters,wrongLetters,playable]);
    const playAgain=()=>{
      setPlayable(true)

      setCorrectLetters([])
      setWrongLetters([])
      const random=Math.floor(Math.random() * words.length);
      selectedWord=words[random]
    }

    return (
    <div>
        <Header/>
        <div className='container'>
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
        <Popup correctLetters={correctLetters} selectedWords={selectedWord}
        setPlayable={setPlayable} wrongLetters={wrongLetters}
        playAgain={playAgain}/>
        <Notification showNotification={showNotification}/>
        </div>
    </div>
  )
}

export default App