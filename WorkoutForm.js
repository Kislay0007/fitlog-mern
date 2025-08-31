import React, { useState, useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutContext';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const { dispatch } = useContext(WorkoutsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: { 'Content-Type': 'application/json' }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit} style={{
      padding: '20px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0px 8px 20px rgba(0,0,0,0.2)'
    }}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

      <label>Load (kg):</label>
      <input type="number" value={load} onChange={e => setLoad(e.target.value)} />

      <label>Reps:</label>
      <input type="number" value={reps} onChange={e => setReps(e.target.value)} />

      <button type="submit" style={{
        background: '#1aac83',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>Add Workout</button>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
