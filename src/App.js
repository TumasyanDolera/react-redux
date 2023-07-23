import ToDo from './components/pages/ToDo/ToDo';
import HOCTest from './components/HOCTest';
import SingleTask from './components/pages/SIngleTask';
import NoFound from './components/pages/NoFOund';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Hook from './components/HOOK';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className="mainDiv">
      {/* <Hook /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/task/:id"  element={<SingleTask />} />
        <Route path="/about" element={<SingleTask />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>

  );
}

export default App;
