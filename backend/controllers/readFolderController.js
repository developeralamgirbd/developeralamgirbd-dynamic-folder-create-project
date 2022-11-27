const readFolderService = require('../services/readFolderService');

const readFolderController = (req, res)=>{

        readFolderService().then((result) => {

            const resData = JSON.stringify(result);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.write(resData);
            res.end();
        }).catch((error) => {
            console.log(error);
        });


}

module.exports = readFolderController;
