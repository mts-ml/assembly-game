import { languages } from '../../language' // Array with languages
import { nanoid } from 'nanoid'

import './languagesStyle.scss'


interface LanguagesProps {
   wrongGuessCount: number
}


export default function Languages(props: LanguagesProps) {
   // Render the Languages
   const languagesArray = languages.map((lang, index) => {
      const languagesLost: boolean = index < props.wrongGuessCount

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
