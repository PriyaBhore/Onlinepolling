// // import { useEffect, useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // function PollList() {
// //   const [polls, setPolls] = useState([]);
// //   const navigate = useNavigate(); // Hook to programmatically navigate

// //   useEffect(() => {
// //     fetch('http://localhost:5000/polls')
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         return response.json();
// //       })
// //       .then((data) => {
// //         setPolls(data); 
// //       })
// //       .catch((error) => {
// //         console.error('There was a problem with the fetch operation:', error);
// //       });
// //   }, []);

// //   const handlePollHere = (pollId) => {
// //     navigate(`/poll/${pollId}`); // Navigate to PollDetails for the selected poll
// //   };

// //   return (
// //     <div>
// //       <h2>Polls</h2>
// //       <ul>
// //         {polls.map((poll) => (
// //           <li key={poll.id}>
// //             <Link to={`/poll/${poll.id}`}>
// //               <h3>{poll.title}</h3>
// //               <p>{poll.description}</p>
// //             </Link>
// //             <button onClick={() => handlePollHere(poll.id)}>Poll Here</button> {/* Poll Here button */}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default PollList;

//Fair code

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function PollList() {
//   const [polls, setPolls] = useState([]);
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   useEffect(() => {
//     fetch('http://localhost:5000/polls')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setPolls(data); 
//       })
//       .catch((error) => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, []);

//   const handlePollHere = (pollId) => {
//     navigate(`/poll/${pollId}`); // Navigate to PollDetails for the selected poll
//   };

//   return (
//     <div>
//       <h2>Polls</h2>
//       <ul>
//         {polls.map((poll) => (
//           <li key={poll.id}>
//             <h3>{poll.title}</h3>
//             <p>{poll.description}</p>
//             <button onClick={() => handlePollHere(poll.id)}>Poll Here</button> {/* Poll Here button */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PollList;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/polllist.css';


function PollList() {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:5000/polls',{
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPolls(data); 
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handlePollHere = (pollId) => {
    navigate(`/poll/${pollId}`); 
  };

  const handleLogout= async (e)=>{
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
    
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate('/');
        
      } else {
      alert(data.message);
      }
    } catch (error) {
      alert('Login failed');
    }
  }

  return (
    <div className="poll-list-container">
      <button onClick={handleLogout}>Logout</button>
      <h2>Available Polls</h2>
      <table className="poll-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((poll) => (
            <tr key={poll.id}>
              <td>{poll.title}</td>
              <td>{poll.description}</td>
              <td>
                <button className="poll-button" onClick={() => handlePollHere(poll.id)}>
                  Vote Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PollList;


