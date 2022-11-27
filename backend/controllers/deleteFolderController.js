const deleteFolderService = require('../services/deleteFolderService');
const url = require('url');

const deleteFolderController = (req, res)=>{

    const queryString = url.parse(req.url, true);
    const _id = queryString.query.id;

    deleteFolderService(_id).then((result)=>{
        const resData = JSON.stringify(result);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        res.write(resData);
        res.end();

    }).catch(error => {
        console.log(error);
        res.writeHead(500, {
            'Access-Control-Allow-Origin': '*',
        });
        res.end();
    });

}

module.exports = deleteFolderController;
