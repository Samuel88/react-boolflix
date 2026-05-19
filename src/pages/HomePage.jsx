import { useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchMovies } from "../utils/tmdb";

function HomePage() {  
  const [searchTerm, setSearchTerm] = useDebounce("", 1000, (value) => {
    searchMovies(value)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  });

  return (
    <div>
      <input type="text" name="search" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
}
export default HomePage;
