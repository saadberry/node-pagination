const express = require("express")
var userList = require("./users")

const app = express();

const PORT = 3001

app.listen(PORT, () => {
    console.log(`server running on http:localhost:${PORT}`)
})

//Default endpoint
app.get('/',(req,res) => {
    console.log("hello world!")
    res.json("hehe")
})

//GET all users
app.get('/users',(req,res) => {
    // console.log("hello world!")
    res.json(userList)
    // console.log(userList)
})

// performing pagination

//retrieve first page w a limit of 5 entries
app.get('/custom-users', (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
  
    const start_index = (page - 1) * limit;
    const end_index = page * limit;
  
    const results = {};
  
    if (start_index > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
  
    if (end_index < userList.userList.length) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
  
    results.results = userList.userList.slice(start_index, end_index);
    res.json(results);
  });
  