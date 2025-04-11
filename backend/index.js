const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = []; //Armazenamento em memória

//CRUD de posts
app.post('/posts',(req, res) => {
    const {title, content} = req.body;
    const id =posts.length + 1;
    const newPost = {id, title, content};
    posts.push(newPost);
    res.status(201).json(newPost);
    });

    app.get('/posts', (req,res) => {
        res.json(posts);
    });

    app.get('/posts/:id', (req,res) => {
        const post = posts.find(p => p.id === parseInt(req.params.id));
        if (!post) return res.status(404).json({message:'Post não encontrado'});
        res.json(post);
    });

    app.put('/posts/:id', (req,res) => {
        const post = posts.find(p => p.id === parseInt(req.params.id));
        if (!post) return res.status(404).json({message:'Post não encontrado'});
        const {title, content} = req.body;
        post.title = titlte || post.title;
        post.content = content || post.content;
        res.json(post);
    });

    app.delete('/posts/:id', (req,res) => {
        posts = posts.filter(p=> p.id !== parseInt(req.params.id));
        res.status(204).send();        
    });

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });