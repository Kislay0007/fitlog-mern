import React from 'react';

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details" style={{
      padding: '20px',
      marginBottom: '15px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h4>{workout.title}</h4>
      <p><strong>Load:</strong> {workout.load} kg</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
    </div>
  );
};

export default WorkoutDetails;
