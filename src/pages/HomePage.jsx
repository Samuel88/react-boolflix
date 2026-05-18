import { useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

function HomePage() {  
  const [searchTerm, setSearchTerm] = useDebounce("", 1000, (value) => {
    console.log("Debounced value:", value);
  });

  return (
    <div>
      <input type="text" name="search" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
}
export default HomePage;
