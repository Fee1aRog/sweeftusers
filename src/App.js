import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // useNavigate
} from "react-router-dom";
import UserList from './pages/UserList';
import { UserItemDetail } from './pages/UserItemDetail';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='*' element={<Navigate to="/list"/>} />
            <Route path="list" element={
              <UserList />
            }>
            </Route>
            <Route path="list/:id" element={
              <UserItemDetail />
            }></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
