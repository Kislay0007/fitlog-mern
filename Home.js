import React, { useEffect, useContext } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { WorkoutsContext } from '../context/WorkoutContext';

const Home = () => {
  const { workouts, dispatch } = useContext(WorkoutsContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts');
        const json = await response.json();
        if (response.ok) dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    fetchWorkouts();
  }, [dispatch]); // ✅ include dispatch to satisfy ESLint

  return (
    <div className="home-container" style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
      <div className="workouts-list" style={{ flex: 2 }}>
        <h1>My Workouts</h1>
        {workouts && workouts.length > 0 ? (
          workouts.map(workout => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <p>No workouts found</p>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
