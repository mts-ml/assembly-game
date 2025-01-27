import Header from './components/Header/Header'
import Status from './components/Status/Status'
import Languages from './components/Languages/Languages'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import clsx from 'clsx'
import { languages } from './language' // Array with languages
import { getRandomWord } from './util'

import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import './globalStyles.scss'


function App() {

   // State to store the secret word
   const [word, setWord] = useState(() => getRandomWord())
   
   // State with the letters guessed by the player
   const [guessedLetters, setGuessedLetters] = useState([])

   const wrongGuessCount = guessedLetters.filter(letter => !word.includes(letter)).length

   const isGameWon = word.split('').every(letter => guessedLetters.includes(letter))

   const isGameLost = wrongGuessCount === languages.length - 1

   const isGameOver = isGameWon || isGameLost

   const guessesLeft = languages.length - wrongGuessCount

   const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
   const isLastLetterIncorrect = guessedLetters.length > 0 && !word.includes(lastGuessedLetter)

   // At first show the secret letter with '?', if the guessedLetters array contains one of the letters, shows it.
   const misteriousWord = word.split('').map(letter => {
      const revealLetter = isGameLost || guessedLetters.includes(letter)

      const className = clsx({
         word__span: true,
         error: isGameLost && !guessedLetters.includes(letter)
      }
      )

      return (
         <span
            className={className}
            key={nanoid()}>
            {revealLetter ? letter : '?'}
         </span>
      )
   })


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
                  disabled={isGameOver}  // isGameOver === True, disable all letters
                  aria-label={`Letter ${letter}`}
                  aria-disabled={guessedLetters.includes(letter)}
               > {letter}
               </button >
            )
         })
      )
   }

   // Start a new game
   function newGame() {
      setWord(getRandomWord())
      setGuessedLetters([])
   }

   // Used in Confetti
   const { width, height } = useWindowSize()

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

         {/* Accessbility */}
         <section
            className="sr-only"
            aria-live="polite">
            <p>
               {word.includes(lastGuessedLetter) ?
                  `Correct! The letter ${lastGuessedLetter} is in the word.` :
                  `Sorry, the letter ${lastGuessedLetter} is not in the word.`}

               You have {guessesLeft} attempts left.
            </p>

            <p>
               Current word: {word.split("").map(letter =>
                  guessedLetters.includes(letter) ? letter + "." : "blank.")
                  .join(" ")}
            </p>
         </section>

         <Languages
            wrongGuessCount={wrongGuessCount}
         />

         <section className="word">
            {misteriousWord}
         </section>

         <section className="keyboard">
            {renderKeyboard()}
         </section>

         {isGameOver && <button onClick={newGame} className="app__button">New Game</button>}

         {isGameWon && <Confetti width={width} height={height} />}
      </main>
   )
}

export default App
