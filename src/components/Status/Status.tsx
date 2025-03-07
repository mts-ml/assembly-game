import clsx from 'clsx'
import { getFarewellText } from '../../util'
import { languages, LanguagesProps } from '../../language'

import './statusStyle.scss'


interface StatusProps {
   gameWon: boolean
   gameLost: boolean
   gameOver: boolean
   incorrectWord: boolean
   wrongGuessCount: number
}


export default function Status(props: StatusProps) {
   const languagesArray: LanguagesProps[] = languages;

   function renderGameStatus() {
      if (!props.gameOver && props.incorrectWord) {
         return (
            <p className='message__title'>
               {getFarewellText(languagesArray[props.wrongGuessCount - 1].name)}
            </p>
         )
      }
      if (props.gameWon) {
         return (
            <>
               <h2 className="message__title">You Win!</h2>

               <span className="message__span">Well done! 🎉</span>
            </>
         )
      }
      if (props.gameLost) {
         return (
            <>
               <h2 className="message__title">Game Over!</h2>

               <span className="message__span">You lose! Better start learning Assembly 😭</span>
            </>
         )
      }
      return null
   }

   const classname = clsx({
      message: true,
      gameWon: props.gameWon,
      gameLost: props.gameLost,
      wrongLetterMessage: !props.gameOver && props.incorrectWord
   })

   return (
      <section aria-live='polite' className={classname}>
         {renderGameStatus()}
      </section>
   )
}
