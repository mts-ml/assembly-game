import './headerStyle.scss'


interface HeaderProps {
   guessesLeft: number
}


export default function Header(props: HeaderProps) {
   return (
      <header className="header">
         <h1 className="header__title">Assembly: Endgame</h1>

         <p className="header__description">
            {`Guess the word in under ${props.guessesLeft} attempts to keep the programming world safe from Assembly!`}
         </p>
      </header>
   )
}
