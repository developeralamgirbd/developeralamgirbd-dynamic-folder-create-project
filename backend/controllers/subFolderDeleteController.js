const subFolderDeleteService = require('../services/subFolderDeleteService');
const {StringDecoder} = require("string_decoder");

const subFolderDeleteController = (req, res)=>{

    const decoder = new StringDecoder('utf-8');
    let decodeString = '';
    req.on('data', (buffer) => {
        decodeString += decoder.write(buffer);

    });
    req.on('end', ()=>{
        decodeString += decoder.end();
        const reqBody = JSON.parse(decodeString);

        subFolderDeleteService(reqBody).then((result)=>{
                const resData = JSON.stringify(result);
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.write(resData);
                res.end();

            }).catch((error) => {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*'
                });
                res.write(error);
                res.end();
                console.log(error.message);
            });

    })

}

module.exports = subFolderDeleteController;
