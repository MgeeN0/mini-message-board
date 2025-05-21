const path = require("node:path")
const express = require("express")
const port = 8000

const app = express()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

let messageId = 1;

const links = [
    {href: "/",text: "hello"},
    {href: "/new", text: "new"}
]

const messages = [
  {
    id: messageId++,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: messageId++,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/",(req,res) => {
    res.render("index", {messages: messages});
})

app.get("/new",(req,res) => {
    res.render("form", {links: links});
})

app.post("/new",(req,res) => {
    messages.push({id: messageId++,text: req.body.message, user: req.body.author, added: new Date()})
    res.redirect("/")
})

app.get("/message/:id",(req,res) => {
    const message = messages.find(msg => msg.id === parseInt(req.params.id));
    if (!message) {
        return res.status(404).send("Message not found");
    }
    res.render("message", { message });
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
