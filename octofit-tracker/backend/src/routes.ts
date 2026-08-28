import { Router } from 'express';
import { Activity, Team, User, Workout } from './models.js';

export const router = Router();

const asyncRoute = (handler: (request: any, response: any, next: any) => Promise<void>) =>
  (request: any, response: any, next: any) => handler(request, response, next).catch(next);

router.get('/users', asyncRoute(async (_request, response) => {
  response.json(await User.find().sort({ displayName: 1 }));
}));

router.post('/users', asyncRoute(async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
}));

router.get('/teams', asyncRoute(async (_request, response) => {
  response.json(await Team.find().populate('captain', 'username displayName').populate('members', 'username displayName'));
}));

router.post('/teams', asyncRoute(async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(await team.populate('captain', 'username displayName'));
}));

router.patch('/teams/:id', asyncRoute(async (request, response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.json(team);
}));

router.get('/activities', asyncRoute(async (request, response) => {
  const filter = request.query.user ? { user: request.query.user } : {};
  response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
}));

router.post('/activities', asyncRoute(async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(await activity.populate('user', 'username displayName'));
}));

router.get('/workouts/recommended', asyncRoute(async (request, response) => {
  const difficulty = typeof request.query.difficulty === 'string' ? request.query.difficulty : 'beginner';
  response.json(await Workout.find({ difficulty }).limit(3));
}));

router.get('/workouts', asyncRoute(async (request, response) => {
  const filter: Record<string, string> = {};
  if (request.query.type) filter.type = request.query.type;
  if (request.query.difficulty) filter.difficulty = request.query.difficulty;
  response.json(await Workout.find(filter).sort({ difficulty: 1, title: 1 }));
}));

router.post('/workouts', asyncRoute(async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
}));

router.get('/leaderboard', asyncRoute(async (_request, response) => {
  const leaderboard = await Activity.aggregate([
    { $group: { _id: '$user', points: { $sum: { $multiply: ['$durationMinutes', 1] } }, activities: { $sum: 1 } } },
    { $sort: { points: -1 } },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { _id: 0, userId: '$_id', username: '$user.username', displayName: '$user.displayName', points: 1, activities: 1 } },
  ]);
  response.json(leaderboard);
}));

router.use((error: any, _request: any, response: any, _next: any) => {
  if (error?.name === 'ValidationError' || error?.name === 'CastError') {
    response.status(400).json({ error: error.message });
    return;
  }
  if (error?.code === 11000) {
    response.status(409).json({ error: 'A record with that unique value already exists' });
    return;
  }
  response.status(500).json({ error: 'Internal server error' });
});
