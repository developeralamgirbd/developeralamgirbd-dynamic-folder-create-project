const http = require('http');
require('dotenv').config();
const url = require('url');

const rootFolderCreateController = require('./controllers/rootFolderCreateController');
const subFolderCreateController = require('./controllers/subFolderCreateController');
const deleteFolderController = require('./controllers/deleteFolderController');
const readFolderController = require('./controllers/readFolderController');
const subFolderDeleteController = require("./controllers/subFolderDeleteController");

const server = http.createServer(async (req, res)=>{

    let path = url.parse(req.url).pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();

    if (method === 'get' && req.url === '/'){
        readFolderController(req, res);

    }else if (method === 'post' && path === 'create'){
       rootFolderCreateController(req, res);

    }else if(method === 'post' && path === 'sub-folder-create'){
       subFolderCreateController(req, res);

    }else if(method === 'get' && path === 'delete-folder'){
       deleteFolderController(req, res);

    }else if(method === 'post' && path === 'sub-folder-delete'){
        subFolderDeleteController(req, res);
    }
    else {
       res.statusCode = 405;
       res.write(`${req.method} method not allowed`);
       res.end()
    }

})

const port = process.env.PORT || 8000;
server.listen(port, ()=>{
console.log(`Server run success on port ${port}`)
})