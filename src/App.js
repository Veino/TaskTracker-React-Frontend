import './App.css';
import TasksListPage from './pages/TasksListPage';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import TaskPage from "./pages/TaskPage.js"
import AddTask from './pages/AddTask'; 

function App() {

  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path="/" exact Component={TasksListPage}/>
          <Route path="task/:id" Component={TaskPage} />
          <Route path="create" Component={AddTask} />
        </Routes>
      </div>
    </Router>
  );
} 

export default App;
