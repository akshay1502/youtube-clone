import Content from "./components/content/content";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default App;
