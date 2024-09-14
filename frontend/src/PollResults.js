// import { useEffect, useState } from 'react';

// function PollResults() {
//   const [polls, setPolls] = useState([]);

//   // Fetch all polls and their vote counts
//   useEffect(() => {
//     fetch('http://localhost:5000/polls') // Adjust the endpoint to match your backend
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setPolls(data); // Store fetched polls in state
//       })
//       .catch((error) => {
//         console.error('Error fetching polls:', error);
//       });
//   }, []);

//   // Function to determine the winning option based on votes
//   const getWinningOption = (poll) => {
//     if (poll.option1Votes > poll.option2Votes) {
//       return 'Option 1 is winning';
//     } else if (poll.option2Votes > poll.option1Votes) {
//       return 'Option 2 is winning';
//     } else {
//       return 'It’s a tie';
//     }
//   };

//   return (
//     <div>
//       <h2>Poll Results</h2>
//       <ul>
//         {polls.map((poll) => (
//           <li key={poll.id}>
//             <h3>{poll.title}</h3>
//             <button>{getWinningOption(poll)}</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PollResults;


import { useEffect, useState } from 'react';
import './css/pollresult.css'; 

function PollResults() {
  const [polls, setPolls] = useState([]);

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
        console.error('Error fetching polls:', error);
      });
  }, []);



  const getWinningOption = (poll) => {
    if (poll.option1Votes > poll.option2Votes) {
      return 'Option 1 is winning';
    } else if (poll.option2Votes > poll.option1Votes) {
      return 'Option 2 is winning';
    } else {
      return 'Its a tie';
    }
  };

  return (
    <div className="poll-results-container">
      <h2>Poll Results</h2>
      <table className="poll-results-table">
        <thead>
          <tr>
            <th>Poll Title</th>
            <th>Winning Option</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((poll) => (
            <tr key={poll.id}>
              <td>{poll.title}</td>
              <td>
                <button className="winning-option-btn">
                  {getWinningOption(poll)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PollResults;






//tried
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './css/pollresult.css';

// function PollResults() {
//   const { id } = useParams();
//   const [results, setResults] = useState({ option1Votes: 0, option2Votes: 0 });

//   useEffect(() => {
//     fetch(`http://localhost:5000/polls/${id}/results`)
//       .then((response) => response.json())
//       .then((data) => setResults(data))
//       .catch((error) => console.error('Error fetching results:', error));
//   }, [id]);

//   const getWinningOption = () => {
//     if (results.option1Votes > results.option2Votes) {
//       return 'Option 1 is winning';
//     } else if (results.option2Votes > results.option1Votes) {
//       return 'Option 2 is winning';
//     } else {
//       return 'It’s a tie';
//     }
//   };

//   return (
//     <div className="poll-results-container">
//       <h2>Poll Results</h2>
//       <p>Option 1 Votes: {results.option1Votes}</p>
//       <p>Option 2 Votes: {results.option2Votes}</p>
//       <h3>{getWinningOption()}</h3>
//     </div>
//   );
// }

// export default PollResults;





// //FAIR
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './css/pollresult.css';

// function PollResults() {
//   const { id } = useParams();
//   const [results, setResults] = useState({ option1Votes: 0, option2Votes: 0 });

//   useEffect(() => {
//     fetch(`http://localhost:5000/polls/${id}/results`)
//       .then((response) => response.json())
//       .then((data) => setResults(data))
//       .catch((error) => console.error('Error fetching results:', error));
//   }, [id]);

//   const getWinningOption = () => {
//     if (results.option1Votes > results.option2Votes) {
//       return 'Option 1 is winning';
//     } else if (results.option2Votes > results.option1Votes) {
//       return 'Option 2 is winning';
//     } else {
//       return 'Its a tie';
//     }
//   };

//   return (
//     <div className="poll-results-container">
//       <h2>Poll Results</h2>
//       <p>Option 1 Votes: {results.option1Votes}</p>
//       <p>Option 2 Votes: {results.option2Votes}</p>
//       <h3>{getWinningOption()}</h3>
//     </div>
//   );
// }

// export default PollResults;

