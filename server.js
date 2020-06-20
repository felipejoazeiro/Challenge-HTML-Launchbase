const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const course = require('./bd.js')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views',{
    express:server
})

server.get('/',(req,res)=>{
    const links =[ 
        {name:"Github",url:"https://github.com/Rocketseat"},
        {name:"Instagram",url:"https://www.instagram.com/rocketseat_oficial/?hl=pt-br"},
        {name:"Facebook",url:"https://www.facebook.com/rocketseat/"}
    ]
    return res.render('about',{links})
})

server.get('/courses',(req,res)=>{
    return res.render('courses', {item:course})
})

server.get("/courses/:id", (req, res)=> {
    const id = req.params.id;
    const aula = course.find((course)=>{
        return course.id == id
    })
    if(!aula){
        return res.render('not-found.njk')
    }
    return res.render(`curso`);
});

server.use(function(req, res) {
    res.status(404).render("not-found");
});
server.listen('3000',()=>{
    console.log('server is runnig')
})