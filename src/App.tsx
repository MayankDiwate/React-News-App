import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import News from "./components/News";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/:id" element={<NewsDetails />} />
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen">
              Page not found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
