import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PollDetails from './PollDetails';
import './css/createpoll.css'


function CreatePoll() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/createPoll', {
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        option1,
        option2,
      }),
    })
    .then(response => response.json()) 
    .then(data => {
      console.log('Poll created successfully:', data);
      alert("Poll created successfully")
      // navigate('/poll');
    })
    .catch(error => {
      console.error('Error:', error);
    });

  };

  return (
    <form onSubmit={handleSubmit}>
        <center>
      <h2> <center>Create a new Poll</center></h2>
      <label>Poll Title :</label>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br/><br />
      <label>Description:</label>
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <br/><br/>
      <label>Option 1 :</label>
      <input type="text" placeholder="Option 1" value={option1} onChange={(e) => setOption1(e.target.value)} required />
      <br/><br/>
      <label>Option 2 :</label>
      <input type="text" placeholder="Option 2" value={option2} onChange={(e) => setOption2(e.target.value)} required />
      <br/><br/>
      <button type="submit">Create Poll</button>
      </center>
    </form>
  );
}

export default CreatePoll;


