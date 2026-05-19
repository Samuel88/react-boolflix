import { useState } from "react";
import { searchMovies, getImageUrl } from "../utils/tmdb";

function HomePage() {  
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchTerm)
      .then(data => {
        console.log(data);
        setMovies(data.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Inserisci un film da cercare..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        Search
      </button>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                style={{ width: '100px', height: '150px' }}
              />
            )}
          </div>
        ))}
      </div>
    </form>
  );
}
export default HomePage;