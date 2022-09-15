import Content from "./components/content/content";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import Video from "./components/video/video";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/watch" element={<Video />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
