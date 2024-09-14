import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import CreatePoll from './CreatePoll';
import PollDetails from './PollDetails';
import PollList from './PollList';
// import VoteConfirmation from './VoteConfirmation';
import Authenticationpage from './Authentication';
import AdminDashboard from './Admindashboard';
import UserDashboard from './Userdashboard';
import PollResults from './PollResults';

function ProtectedRoutes() {

  return (
    <div>


      <Routes>
        <Route path="/createpoll" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollDetails />} />
        <Route path="/polls" element={<PollList />} />
        {/* <Route path="/vote-confirmation" element={<VoteConfirmation />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/pollresults" element={<PollResults />} />
        
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Authenticationpage />} />
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

