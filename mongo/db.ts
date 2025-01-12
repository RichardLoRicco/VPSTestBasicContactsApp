import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contactbook';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Counter Schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  value: { type: Number, required: true }
});

const Counter = mongoose.model('Counter', counterSchema);

// Counter operations
export const getCounter = async () => {
  const counter = await Counter.findById('main');
  if (!counter) {
    const newCounter = new Counter({ _id: 'main', value: 0 });
    await newCounter.save();
    return 0;
  }
  return counter.value;
};

export const incrementCounter = async () => {
  const counter = await Counter.findByIdAndUpdate(
    'main',
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

export const decrementCounter = async () => {
  const counter = await Counter.findByIdAndUpdate(
    'main',
    { $inc: { value: -1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

export const resetCounter = async () => {
  const counter = await Counter.findByIdAndUpdate(
    'main',
    { value: 0 },
    { new: true, upsert: true }
  );
  return counter.value;
};

export default mongoose; 
