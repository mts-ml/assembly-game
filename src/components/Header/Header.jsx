import './headerStyle.scss'
import PropTypes from 'prop-types'


Header.propTypes = {
   guessesLeft: PropTypes.number.isRequired,
}

export default function Header(props) {
   return (
      <header className="header">
         <h1 className="header__title">Assembly: Endgame</h1>

         <p className="header__description">
            {`Guess the word in under ${props.guessesLeft} attempts to keep the programming world safe from Assembly!`}
         </p>
      </header>
   )
}
