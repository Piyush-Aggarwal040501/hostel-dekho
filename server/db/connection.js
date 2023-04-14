
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

if (!DB) {
  console.error('DATABASE environment variable is not defined');
  process.exit(1);
}

mongoose.connect(DB).then(() => {
  console.log('Connected to database successfully');
}).catch((err) => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});
