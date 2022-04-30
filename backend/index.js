const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT||5000

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Wow! im learning node from programming hero')
})

// app.get('/users',(req, res)=>{
//     res.send(users)
// })

app.get('/users/:id',(req, res)=>{
    // Use Dynamic params
    const index = req.params.id;
    const user = users[index]
    console.log(req.params.id)
    res.send(user)
})

app.get('/users',(req, res)=>{
    // Use Query params
    const search =req.query.search
    if (search){
        const searchResult = users.filter((user)=>user.name.toLocaleLowerCase().includes(search))
        res.send(searchResult)
    }
    else{
        res.send(users)
    }
})

// App Post Method
app.post('/users', (req, res)=>{
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser)
    console.log('Hitting the server', req.body)
    res.json(newUser)
})



const users = [
  { id: 0, name: "mujahid", email: "mujahidulislam575@gmail.com", phone: "01722193804" },
  { id: 1, name: "karim", email: "karim@gmail.com", phone: "01722193804" },
  { id: 2, name: "Mahfuj", email: "mahfuj@gmail.com", phone: "01722193804" },
  { id: 3, name: "Munna", email: "munna@gmail.com", phone: "01722193804" },
  { id: 4, name: "Emon", email: "emon@gmail.com", phone: "01722193804" },
  { id: 5, name: "Sufian", email: "sufian@gmail.com", phone: "01722193804" },
];


app.listen(port, ()=>{
    console.log('listening on port', port);
})