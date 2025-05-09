import express from 'express';
import dotenv from 'dotenv';
import approute from './router/approute.js'; 
dotenv.config(); 

const app = express();  


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  


app.use(approute);

app.get('/', (req, res) => {
  res.send('Welcome to the Banking API made for devroom trail lol');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
