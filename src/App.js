import ToDo from './components/pages/ToDo/ToDo';
import SingleTask from './components/pages/SingleTask/SIngleTask';
import NoFound from './components/pages/NoFound/NoFOund';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './components/pages/AboutUs/About';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from './components/Toastify/Toastify';
import Registration from './components/pages/Registration/Register/Registration';
import LogIn from './components/pages/Registration/LogIn/LogIn';

function App() {
  return (
    <div className="mainDiv">
      <Toastify />
      <NavBar />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/task/:id"  element={<SingleTask />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>

  );
}

export default App;
