import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'

import './App.css'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const[errorMessage,setErrorMessage] = useState('')
  const[moviesList,setMoviesList]=useState([]);
  const[isLoading,setIsLoading]=useState(false)
  const fetchMovies = async()=>{
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/dicover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
      // alert(response)
      if(!response.ok){
        throw new Error('Failed to fetch the movie')
      }
      const data = await response.json();
      if(data.Response === false){
        throw new Error(setErrorMessage(data.Error || 'Failed to fetch movie'));
        setMoviesList([])
        return;
      }
      setMoviesList(data.results || [])
      
    } catch (error) {
      console.log(`error fetching the movie data : ${error}`)
      setErrorMessage(`Error Fetching the movie data try agaain later: ${error}`)
      
    }
  }
  useEffect(()=>{
    fetchMovies();
  },[])

  return (
    <main>
      
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./public/hero.png' />
          <h1>
            Find <span className='text-gradient' >Movies </span>  You'll enjoy without a <span className='text-gradient'>Beat </span> 
            </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'> All Movies</h2>
        {isLoading ?(
         <Spinner />
        ):errorMessage ?(
        <p className='text-red-700'> {errorMessage}</p>
      ):(<ul>
        {moviesList.map((movie)=>(
         <p key={movie.id} className='text-white'>{movie.title}</p>
        ))}
      </ul>)}


        </section>

      </div>


    </main>
    

  )
}

export default App
