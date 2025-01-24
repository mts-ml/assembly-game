import { languages } from '../../language' // Array with languages
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'


import './languagesStyle.scss'


Languages.propTypes = {
   wrongGuessCount: PropTypes.func.isRequired,
}

export default function Languages(props) {

   // Render the Languages
   const languagesArray = languages.map((lang, index) => {
      const languagesLost = index < props.wrongGuessCount
      return (
         <button
            key={nanoid()}
            style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
            className={`language__button ${languagesLost ? 'lost' : ''}`}
         >{lang.name}
         </button>
      )
   })


   return (
      <section className="languages">
         {languagesArray}
      </section>
   )
}
