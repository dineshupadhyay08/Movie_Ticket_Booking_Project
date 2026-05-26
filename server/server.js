import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const Port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Welcome to the Movie Ticket Counter API!");
});

app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
}); 