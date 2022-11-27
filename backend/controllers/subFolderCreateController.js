const {StringDecoder} = require('string_decoder');
const subFolderCreateService = require('../services/subFolderCreateService');

const subFolderCreateController = (req, res)=>{

    const decoder = new StringDecoder('utf-8');
    let decodeString = '';
    req.on('data', (buffer) => {
        decodeString += decoder.write(buffer);

    });
    req.on('end', ()=>{
        decodeString += decoder.end();
        const reqBody = JSON.parse(decodeString);

        if ( reqBody.subFolderName === ''){

            const errorObj = {
                error: 'Sub Folder name is required'
            }
            const error = JSON.stringify(errorObj);
            res.writeHead(400, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.write(error);
            res.end();

        }else if (reqBody.subFolderName.length < 3) {

            const errorObj = {
                error: 'Sub Folder name must be at least 3 character'
            }
            const error = JSON.stringify(errorObj);
            res.writeHead(400, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.write(error);
            res.end();
        }else {
            subFolderCreateService(reqBody).then((result)=>{
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

        }

    })

}

module.exports = subFolderCreateController;
