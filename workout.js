const express = require('express');
const Workout = require('../models/workoutModel');
const router = express.Router();

// ===== Route Handlers =====

// GET all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET a single workout by ID
const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ error: 'Workout not found' });
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
};

// CREATE a new workout
const createWorkout = async (req, res) => {
    try {
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE a workout by ID
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) return res.status(404).json({ error: 'Workout not found' });
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid ID' });
    }
};

// UPDATE a workout by ID
const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ error: 'Workout not found' });

        if (req.body.title !== undefined) workout.title = req.body.title;
        if (req.body.reps !== undefined) workout.reps = req.body.reps;
        if (req.body.load !== undefined) workout.load = req.body.load;

        await workout.save();
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ===== Routes =====
router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;
