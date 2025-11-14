const { MongoClient } = require('mongodb');

// Connection URI from environment variables
const uri = process.env.MONGODB_URI || 'mongodb+srv://Certificate_trackerDB:1588770452@certtrackdb.krjifkm.mongodb.net/?appName=CertTrackDB';

// Database name
const dbName = process.env.DB_NAME || 'certtrack';

// Create a MongoClient
const client = new MongoClient(uri);

let db;

// Connect to MongoDB
async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      console.log('✅ Successfully connected to MongoDB Atlas!');
      db = client.db(dbName);
    }
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Close the database connection
async function closeDB() {
  try {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

// Export functions
module.exports = {
  connectDB,
  closeDB,
  getDB: () => db
};
