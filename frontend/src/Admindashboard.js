import { useNavigate } from 'react-router-dom';
// import './App.css'
import './css/admindashboard.css'

function Admindashboard() {
  const navigate = useNavigate();

  const handleCreatePoll = () => {
    navigate('/createpoll');
  };
  const handleViewPoll = () => {
    navigate('/polls');
  };

  // const handleViewResults = (pollId) => {
  //   navigate(`/poll/${pollId}/results`);
  // };

  const handleViewResults = () => {
    navigate('/pollresults');
  };
  
  

  return (
    <>
      <h2>Welcome to Admin Dashboard</h2>
      <button  onClick={handleCreatePoll}>Create Poll</button>
      <br/>
      <button onClick={handleViewPoll}>View Poll List</button>
      <br/>
      {/* <button onClick={() => handleViewResults(pollId)}>View Poll Results</button> */}
      <button onClick={handleViewResults}>View Poll Results</button>
      <br/>
    </>
  );
}

export default Admindashboard;
