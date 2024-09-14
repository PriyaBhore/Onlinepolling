// // import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// // import CreatePoll from './CreatePoll';
// // import PollDetails from './PollDetails';
// // import PollList from './PollList';
// // import VoteConfirmation from './VoteConfirmation';
// // import Authenticationpage from './Authentication';

// // function App() {
// //   return (
// //     <Router>
// //       <div>
// //         <nav>
// //           <ul>
// //           <li>
// //               <Link to="/">Authentication</Link>
// //             </li>
// //             <li>
// //               <Link to="/createpoll">Create Poll</Link>
// //             </li>
// //             <li>
// //               <Link to="/polls">Poll List</Link>
// //             </li>
// //             <li>
// //               <Link to="/vote-confirmation">Vote Confirmation</Link>
// //             </li>
// //           </ul>
// //         </nav>

// //         <div>
// //           <Routes>
// //           <Route path="/" element={<Authenticationpage />} />
// //             <Route path="/" element={<CreatePoll />} />
// //             <Route path="/poll/:id" element={<PollDetails />} />
// //             <Route path="/polls" element={<PollList />} />
// //             <Route path="/vote-confirmation" element={<VoteConfirmation />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CreatePoll from './CreatePoll';
// import PollDetails from './PollDetails';
// import PollList from './PollList';
// import VoteConfirmation from './VoteConfirmation';
// import Authenticationpage from './Authentication';
// import AdminDashboard from './Admindashboard';
// import UserDashboard from './Userdashboard';

// // Component for Protected Routes (after Authentication)
// function ProtectedRoutes() {
//   return (
//     <div>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/createpoll">Create Poll</Link>
//           </li>
//           <li>
//             <Link to="/polls">Poll List</Link>
//           </li>
//           <li>
//             <Link to="/vote-confirmation">Vote Confirmation</Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/createpoll" element={<CreatePoll />} />
//         <Route path="/poll/:id" element={<PollDetails />} />
//         <Route path="/polls" element={<PollList />} />
//         <Route path="/vote-confirmation" element={<VoteConfirmation />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           {/* Default route for Authentication */}
//           <Route path="/" element={<Authenticationpage />} />
          
//           {/* Protected Routes for other components */}
//           <Route path="/*" element={<ProtectedRoutes />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import CreatePoll from './CreatePoll';
import PollDetails from './PollDetails';
import PollList from './PollList';
// import VoteConfirmation from './VoteConfirmation';
import Authenticationpage from './Authentication';
import AdminDashboard from './Admindashboard';
import UserDashboard from './Userdashboard';
import PollResults from './PollResults';

// Component for Protected Routes (after Authentication)
function ProtectedRoutes() {
  const location = useLocation();

  // Hide the nav if the current page is admin-dashboard or user-dashboard
  const hideNav = location.pathname === '/admin-dashboard' || location.pathname === '/user-dashboard';

  return (
    <div>
      {/* Conditionally render the navigation menu */}
      {/* {!hideNav && (
        <nav>
          <ul>
            <li>
              <Link to="/createpoll">Create Poll</Link>
            </li>
            <li>
              <Link to="/polls">Poll List</Link>
            </li>
            <li>
              <Link to="/vote-confirmation">Vote Confirmation</Link>
            </li>
          </ul>
        </nav>
      )} */}

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
          {/* Default route for Authentication */}
          <Route path="/" element={<Authenticationpage />} />
          
          {/* Protected Routes for other components */}
          <Route path="/*" element={<ProtectedRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
