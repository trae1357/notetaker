
let noteData = require("../db/db.json")

const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
  
   console.log(noteData)
    res.json(noteData)
  
  });

 
 
  app.post('/api/notes', (req, res) => {
    console.log(req.body);
      req.body.id = uuidv4()
      
      noteData.push(req.body);
      fs.writeFileSync("./db/db.json", JSON.stringify(noteData))

      res.json(noteData);
   
  });
  app.delete('/api/notes/:id', (req,res)=>{
    const id = req.params.id
    noteData = noteData.filter(note =>{
      return note.id != id
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData))

    res.json(noteData);
  })

  app.post('/api/clear', (req, res) => {
   
    noteData.length = 0;
    currentNoteData.length = 0;

    res.json({ ok: true });
  });
};
