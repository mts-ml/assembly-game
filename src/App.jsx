import Header from './components/Header/Header'
import Status from './components/Status/Status'
import Languages from './components/Languages/Languages'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import clsx from 'clsx'
import { languages } from './language' // Array with languages

import './globalStyles.scss'


function App() {

   // State to store the secret word
   const [word, setWord] = useState('react')

   // State with the letters guessed by the player
   const [guessedLetters, setGuessedLetters] = useState([])

   const wrongGuessCount = guessedLetters.filter(letter => !word.includes(letter)).length

   const rightGuessCount = guessedLetters.filter(letter => word.includes(letter)).length

   const isGameWon = rightGuessCount === word.length

   const isGameLost = wrongGuessCount === languages.length - 1

   const isGameOver = isGameWon || isGameLost

   const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
   const isLastLetterIncorrect = guessedLetters.length > 0 && !word.includes(lastGuessedLetter)

   // At first show the secret letter with '?', if the guessedLetters array contains one of the letters, shows it.
   const misteriousWord = word.split('').map(letter => (
      <span
         className='word__span'
         key={nanoid()}
      >{guessedLetters.includes(letter) ? letter : '?'}
      </span>
   ))


   // Function to add a guessed letter to the state, can't add the same letter.
   function addGuessedLetter(letter) {
      setGuessedLetters(previousLetters => (
         previousLetters.includes(letter) ? previousLetters :
            [
               ...previousLetters,
               letter
            ]
      ))
   }

   const alphabet = "abcdefghijklmnopqrstuvwxyz"

   // Create the keyboard buttons
   function renderKeyboard() {
      return (
         alphabet.split('').map(letter => {
            const isGuessed = guessedLetters.includes(letter)
            // Determine if the guessed letter is correct or wrong
            const isCorrect = isGuessed && word.includes(letter)
            const isWrong = isGuessed && !word.includes(letter)

            // Dynamically set CSS classes for the button based on its state (clsx)
            const whichClass = clsx({
               keyboard__button: true,
               correct: isCorrect,
               incorrect: isWrong,
            })

            return (
               < button
                  className={whichClass}
                  onClick={() => addGuessedLetter(letter)}
                  key={nanoid()}
                  disabled={isGameOver} // isGameOver === True, disable all letters
               > {letter}
               </button >
            )
         })
      )
   }


   return (
      <main>
         <Header />

         <Status
            gameWon={isGameWon}
            gameLost={isGameLost}
            gameOver={isGameOver}
            incorrectWord={isLastLetterIncorrect}
            wrongGuessCount={wrongGuessCount}
         />

         <Languages
            wrongGuessCount={wrongGuessCount}
         />

         <section className="word">
            {misteriousWord}
         </section>

         <section className="keyboard">
            {renderKeyboard()}
         </section>

         {isGameOver && <button className="app__button">New Game</button>}
      </main>
   )
}

export default App
