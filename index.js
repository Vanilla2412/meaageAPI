import express from "express";

const app = express();
const port = 3000;

const messages = [{
  id: 1,
  message: "Apple",
},
{
  id: 2,
  message: "Grape",
}];


app.post('/messages', (req, res) => {

});

//ok
app.get('/messages', (req, res) => {
  try {
    res.send(JSON.stringify(messages));
  } catch (error){
    res.status(404).send("404 Not found"); // show error
  }
});

//ok
app.get('/messages/:id', (req, res) => {
  try {
  const requestedId = parseInt(req.params.id, 10); //convert to number
  const foundMessage = messages.find(msg => msg.id === requestedId); // find message based on id
  res.send(JSON.stringify(foundMessage));
  } catch (error){
    res.status(404).send("404 Not found");
  }
});

app.put('/message/:id', (req, res) => {

});

app.delete('/message/:id', (req, res) => {

});




app.listen(port, (req, res) => {
  console.log(`Server is running ${port}`);
});