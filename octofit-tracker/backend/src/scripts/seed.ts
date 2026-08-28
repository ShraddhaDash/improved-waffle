import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, jordan, sam] = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Rivera', password: 'octofit-demo' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Lee', password: 'octofit-demo' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Patel', password: 'octofit-demo' },
    ]);

    await Team.create({
      name: 'Mergington Movers',
      description: 'Small steps, strong team.',
      captain: alex._id,
      members: [alex._id, jordan._id, sam._id],
    });

    await Activity.create([
      { user: alex._id, type: 'running', durationMinutes: 32, distanceKm: 4.8, notes: 'After-school run' },
      { user: jordan._id, type: 'strength', durationMinutes: 25, notes: 'Upper body circuit' },
      { user: sam._id, type: 'walking', durationMinutes: 40, distanceKm: 3.2, notes: 'Walk home' },
    ]);

    await Workout.create([
      { title: 'Easy Start', description: 'A relaxed movement session for building consistency.', type: 'walking', difficulty: 'beginner', durationMinutes: 20 },
      { title: 'Run Builder', description: 'Intervals that develop steady running endurance.', type: 'running', difficulty: 'intermediate', durationMinutes: 30 },
      { title: 'Bodyweight Basics', description: 'A full-body strength circuit with no equipment.', type: 'strength', difficulty: 'beginner', durationMinutes: 25 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
