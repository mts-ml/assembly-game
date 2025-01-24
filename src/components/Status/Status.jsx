import PropTypes from 'prop-types'
import clsx from 'clsx'
import { getFarewellText } from '../../util'
import { languages } from '../../language'

import './statusStyle.scss'


Status.propTypes = {
   gameWon: PropTypes.bool.isRequired,
   gameLost: PropTypes.bool.isRequired,
   gameOver: PropTypes.bool.isRequired,
   incorrectWord: PropTypes.bool.isRequired,
   languagesArray: PropTypes.array.isRequired,
   wrongGuessCount: PropTypes.func.isRequired,
}

export default function Status(props) {

   function renderGameStatus() {
      if (!props.gameOver && props.incorrectWord) {
         return (
            <p className='message__title'>
               {getFarewellText(languages[props.wrongGuessCount - 1].name)}
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
      <section className={classname}>
         {renderGameStatus()}
      </section>
   )
}
