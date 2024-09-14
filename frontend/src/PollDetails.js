// //Working
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import './css/polldetails.css';
// import './css/polldetails.css'

// function PollDetails() {
//   const { id } = useParams();
//   const [poll, setPoll] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/poll/${id}`).then((response) => {
//       setPoll(response.data);
//     });
//   }, [id]);

//   const handleVote = () => {
//     alert('Vote submitted successfully');
//     navigate('/vote-confirmation');
//   };

//   return (
//     <div>
//       <h2>{poll.title}</h2>
//       <p>{poll.description}</p>
//       <button onClick={handleVote}>{poll.option1}</button>
//       <button onClick={handleVote}>{poll.option2}</button>
//     </div>
//   );
// }

// export default PollDetails;

//tried
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './css/polldetails.css';

// function PollDetails() {
//   const { id } = useParams();
//   const [poll, setPoll] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/poll/${id}`).then((response) => {
//       setPoll(response.data);
//     });
//   }, [id]);

//   const handleVote = (option) => {
//     axios.post(`http://localhost:5000/polls/${id}/vote`, { option })
//       .then(() => {
//         alert(`Vote submitted for: ${option}`);
//         navigate(`/poll/${id}/results`); // Navigate to results after voting
//       })
//       .catch((error) => {
//         console.error('Error submitting vote:', error);
//       });
//   };

//   return (
//     <div className="poll-details-container">
//       <h2>{poll.title}</h2>
//       <p>{poll.description}</p>
//       <table className="poll-table">
//         <tbody>
//           <tr>
//             <td>
//               <button className="poll-button" onClick={() => handleVote('option1')}>
//                 {poll.option1}
//               </button>
//             </td>
//             <td>
//               <button className="poll-button" onClick={() => handleVote('option2')}>
//                 {poll.option2}
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PollDetails;

// //FAIR...
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './css/polldetails.css';

// function PollDetails() {
//   const { id } = useParams();
//   const [poll, setPoll] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/poll/${id}`).then((response) => {
//       setPoll(response.data);
//     });
//   }, [id]);

//   const handleVote = (option) => {
//     // alert(`Vote submitted for: ${option}`);
//     // navigate('/vote-confirmation');
//     alert("Thankyou!! Your vote is successffully submitted");

//   };

//   return (
//     <div className="poll-details-container">
//       <h2>{poll.title}</h2>
//       <p>{poll.description}</p>
//       <table className="poll-table ">
//         <tbody>
//           <tr>
//             <td>
//               <button className="poll-button" onClick={() => handleVote(poll.option1)}>
//                 {poll.option1}
//               </button>
//             </td>
//             <td>
//               <button className="poll-button" onClick={() => handleVote(poll.option2)}>
//                 {poll.option2}
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PollDetails;

// //Proper working
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './css/polldetails.css';

// function PollDetails() {
//   const { id } = useParams();  // Poll ID from the URL
//   const [poll, setPoll] = useState({});
//   const navigate = useNavigate();

// Fetch poll details when the component mounts
//   useEffect(() => {
//     axios.get(`http://localhost:5000/poll/${id}`).then((response) => {
//       setPoll(response.data);
//     });
//   }, [id]);

//   const handleVote = (option) => {
//     fetch(`http://localhost:5000/polls/${id}/vote`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',  // Specify the content type
//       },
//       body: JSON.stringify({ option }),  // Send the option in the request body
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();  // Parse the JSON response
//       })
//       .then((data) => {
//         alert("Thank you! Your vote was successfully submitted.");

//       })
//       .catch((error) => {
//         console.error('There was an error submitting your vote!', error);
//       });
//   };

//   return (
//     <div className="poll-details-container">
//       <h2>{poll.title}</h2>
//       <p>{poll.description}</p>
//       <table className="poll-table">
//         <tbody>
//           <tr>
//             <td>
//               <button className="poll-button" onClick={() => handleVote('option1')}>
//                 {poll.option1}
//               </button>
//             </td>
//             <td>
//               <button className="poll-button" onClick={() => handleVote('option2')}>
//                 {poll.option2}
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PollDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/polldetails.css";

function PollDetails() {
  const { id } = useParams();
  const [poll, setPoll] = useState({});
  // const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/poll/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setPoll(data);

        // const voted = localStorage.getItem(`voted_${id}`);
        // setHasVoted(!!voted);
      })
      .catch((error) => console.error("Error fetching poll details:", error));
  }, [id]);

  const handleVote = (option) => {
    fetch(`http://localhost:5000/polls/${id}/vote`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    })
      .then((response) => {
        console.log(response.body)
        if (response.status === 400 || response.status === 200) {
          return response.json();
        }
        // alert("Server Error");
      })
      .then((data) => {
        console.log(data)
        if (data.error) {
          alert(data.error);
        } else {
          alert("Thank you! Your vote was successfully submitted.");
        }
        // setHasVoted(true);
      })
      .catch((error) => {
        console.error("There was an error submitting your vote!", error);
      });
  };

  return (
    <div className="poll-details-container">
      <h2>{poll.title}</h2>
      <p>{poll.description}</p>
      <table className="poll-table">
        <tbody>
          <tr>
            <td>
              <button
                className="poll-button"
                onClick={() => handleVote("option1")}
              >
                {poll.option1}
              </button>
            </td>
            <td>
              <button
                className="poll-button"
                onClick={() => handleVote("option2")}
              >
                {poll.option2}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PollDetails;
