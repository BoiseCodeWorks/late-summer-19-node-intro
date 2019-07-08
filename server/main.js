//this is where the actual server will live
//NOTE  dont forget to run npm init on your project so you have your package.json before installing dependencies!
import express from 'express'
import bp from 'body-parser'

let port = 3000


let server = express()
server.use(bp.json())


let fakeDB = {
  cats: [{ name: "garfield", legs: 4, favoriteFood: "Lasagna" }, { name: "felix", lives: 9 }]
}

function getAllCats(req, res, next) {
  res.send({ data: fakeDB.cats, message: "Got the cats!" })
}

function addCat(req, res, next) {
  let newCat = req.body
  fakeDB.cats.push(newCat)
  res.status(201).send("created a new cat!")
}

function defaultErrorHandler(req, res, next) {
  res.status(400).send("bad request")
}

server.get('/', express.static(__dirname + '/../public'))
server.get('/api/cats', getAllCats)
server.post('/api/cats', addCat)
server.get('/api/dogs', (req, res, next) => {
  res.status(418).send()
})
server.use('*')

server.listen(port, () => {
  console.log("server is running on port: ", port)
})