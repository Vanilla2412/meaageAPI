import express from "express";

const app = express();
const port = 3000;

app.use(express.json());


const messages = [{
  id: 1,
  message: "Apple",
},
{
  id: 2,
  message: "Grape",
}];


app.post('/messages/:id', (req, res) => {
const requestId = parseInt(req.params.id);
const new_content = req.body;

// add a message only
if (!isNaN(requestId)) {
    messages.push({id: requestId,
      message: new_content,
    });
    res.status(201).send("Message added");
  } else {
    res.status(400).send("Bad request");
  }

});


app.get('/messages', (req, res) => {
  try {
    res.send(JSON.stringify(messages));
  } catch (error){
    res.status(404).send("404 Not found");
  }
});


app.get('/messages/:id', (req, res) => {
  try {
  const requestedId = parseInt(req.params.id, 10);
  const foundMessage = messages.find(msg => msg.id === requestedId);
  if (!foundMessage){
    return res.status(404).send("Message not found");
  }
  res.send(JSON.stringify(foundMessage));
  } catch (error){
    res.status(404).send("404 Not found");
  }
});

app.put('/messages/:id', (req, res) => {
  try {
  const requestedId = parseInt(req.params.id, 10);
  const new_content = req.body;
  const index = messages.findIndex(msg => msg.id === requestedId);
  if (index === -1){
    return res.status(404).send("Message not found");
  
  }
  messages[index] = { id: requestedId, ...new_content };
  res.status(200).send("Ok");

  } catch(error){
    res.status(400).send("Bad request");
  }
});

app.delete('/messages/:id', (req, res) => {
  try{
  const requestedId = parseInt(req.params.id);
  const foundId = messages.find(msg => msg.id === requestedId);
  
  messages.splice(foundId, 1);
  res.status(200).send("ok!");

  }catch (error){
    res.status(404).send("Message not found");
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running ${port}`);
});