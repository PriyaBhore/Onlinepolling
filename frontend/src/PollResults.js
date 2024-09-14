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







