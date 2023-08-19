import ToDo from './components/pages/ToDo/ToDo';
import SingleTask from './components/pages/SIngleTask';
import NoFound from './components/pages/NoFOund';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './components/pages/About';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './components/Toastify/Toastify';





function App() {
  return (
    <div className="mainDiv">
      <Toastify />
      <NavBar />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/task/:id"  element={<SingleTask />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>

  );
}

export default App;
