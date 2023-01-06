import './App.css';

import {Route, Routes, BrowserRouter
} from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Information from "./Information";
import Submit from "./Submit";
import PostPage from "./PostPage";

  function App() {

  return (

      <>
          <div className="holder">
              <BrowserRouter>

                  <NavBar />

                  <Routes>

                      <Route path="/" element={ <Home /> } />
                      <Route path="/home" element={ <Home /> } />
                      <Route path="/post/:id" element={<PostPage />} />
                      <Route path="/submit" element={ <Submit /> } />
                      <Route path="/information" element={ <Information /> } />

                      {/*<Route path="/scores" element={ <HighScores /> } />*/}
                  </Routes>

              </BrowserRouter>
          </div>
      </>
  );






}

export default App;
