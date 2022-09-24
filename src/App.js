import YoutubeFeed from "./components/content/content";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import Video from "./components/video/video";
import Search from "./components/search/search";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<YoutubeFeed />} />
          <Route path="/watch" element={<Video />} />
          <Route path="results" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
