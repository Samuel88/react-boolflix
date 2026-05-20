import { useState } from "react";
import { searchMovies, searchTvShows } from "../utils/tmdb";
import Rating from "../components/Rating";
import Flag from "react-world-flags";

function HomePage() {  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const searchRequests = [
      searchMovies(searchTerm),
      searchTvShows(searchTerm)
    ];

    Promise.all(searchRequests)
      .then(([movies, tvShows]) => {
        const allResults = [...movies, ...tvShows];
        setSearchResults(allResults);
        console.log(allResults);
      })
      .catch(error => {
        console.error('Error ricerca:', error);
      });
  };

  return (
    <div className="container py-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Inserisci un film da cercare..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      <div className="row g-3 row-cols-1 row-cols-md-3 row-cols-lg-4">
        {searchResults.map(({ id, type, title, description, image, score, original_language }) => (
          <div className="col" key={id}>
            <div className="card h-100 shadow-sm">
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title mb-2 d-flex align-items-center gap-2">
                  <span>{title}</span>
                  <span className={`badge ${type === 'movie' ? 'bg-danger' : 'bg-info'}`}>
                    {type === 'movie' ? 'Film' : 'Serie TV'}
                  </span>
                </h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Rating score={score} />
                  <Flag code={original_language} height="16" />
                </div>
                <p className="card-text small text-body-secondary">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;