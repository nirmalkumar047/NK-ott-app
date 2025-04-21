import { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import MovieCard from './components/MovieCard.jsx';
import Spinner from './components/Spinner.jsx';
import Footer from './components/footer.jsx';

// ✅ Correct base API URL
const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TMBD_API_KEY; // Ensure .env contains VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`, // Use only if it's a v4 token
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :  `${API_BASE_URL}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}` // ✅ Correct API URL
      ;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMBD_API_KEY}` // Make sure it's loaded correctly
  
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
       
       }

      const data = await response.json();
      if(data.response === 'False') {
       setErrorMessage(data.Error||'An error occurred while fetching data.');
      setMovieList([]);
      return;
      }
      setMovieList(data.results|| []);
    } catch (error) {
      console.error(`Error fetching movies: ${error.message}`);
      setErrorMessage('An error occurred while fetching data.');
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="hero" />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Watching
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchMovies={fetchMovies}  />
          
        </header>

        <section className='all-movies'>
          <h2 className='mt-[20px]'>All Movies</h2>
          {isLoading  ?(
            <Spinner />
           
            
           ): errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
           ):(
            
            <ul>
              {movieList.map((movie) => (
               <MovieCard key={movie.id} movie={movie} />
              ))}
             
            </ul>
           )}
  </section>
      </div>
      <Footer />
    </main>

   
  );
};

export default App;
