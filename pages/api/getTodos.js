import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    const todosCollection = db.collection('todos');
    const todos = await todosCollection.find().toArray();
    
    client.close();
    res.status(200).json({ todos });
  }
};

export default handler;
