import { useNavigate } from 'react-router-dom';

function Userdashboard(){
 const navigate = useNavigate();

 const handleViewPoll = () => {
    navigate('/polls'); // Navigate to CreatePoll page
  };
  const handlePollSelect = () => {
    navigate('/poll/:id'); // Navigate to CreatePoll page
  };

    return(
        <>
            <h2>Welcome to User dashboard</h2>
            <button onClick={handleViewPoll}>View Poll List</button>
            {/* <button onClick={handlePollSelect}>Poll Here</button> */}


        </>
    );
}
export default Userdashboard;