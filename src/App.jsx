import { useState } from 'react'
import Search from './components/Search.jsx'

import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main>
      
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./public/hero.png' />
          <h1>
            Find <span className='text-gradient' >Movies </span>  You'll enjoy without a <span className='text-gradient'>Beat </span> 
            </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        

      </div>


    </main>
    

  )
}

export default App
