import ToDo from './components/pages/ToDo/ToDo';
import HOCTest from './components/HOCTest';
import SingleTask from './components/pages/SIngleTask';
import NoFound from './components/pages/NoFOund';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className="mainDiv">
      {/* <HOCTest>
      <div>ONE</div>
      <div>TWo</div>
      <div>three</div>
      <div>four</div>
      <div>five</div>
      <div>six</div>
      </HOCTest> */}
      {/* <ToDo /> */}
      {/* <Switch>
        <Route to="/" exact component={ToDo}/>
        <Route to="/task" element={<ToDo />}/>
        <ROut to="/no-found exact component={NoF0und}"
        <Redirect to="/no-found"
      </Switch> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/task/:id"exact  element={<SingleTask />} />
        <Route path="/about" element={<SingleTask />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
    </div>

  );
}

export default App;
