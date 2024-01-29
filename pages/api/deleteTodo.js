import { MongoClient, ObjectId } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const todoId = req.body.id;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    const todosCollection = db.collection('todos');
    const result = await todosCollection.deleteOne({ _id: ObjectId(todoId) });
    
    client.close();
    res.status(200).json({ message: 'Todo deleted!' });
  }
};

export default handler;
