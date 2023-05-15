import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards/index";
import Filter from "./components/Filter";
import Header from "./components/Header";

function App() {
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <div className="App">
      <Header />
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {selectedFilter === 0 ? <Cards /> : <Cards />}
    </div>
  );
}

export default App;