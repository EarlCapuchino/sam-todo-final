import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    const todosCollection = db.collection('todos');
    const result = await todosCollection.insertOne(data);
    
    client.close();
    res.status(201).json({ message: 'Todo added!' });
  }
};

export default handler;
