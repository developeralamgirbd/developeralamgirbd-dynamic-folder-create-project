const { client } = require('../dbConfig');

const rootFolderCreateService = async (Request)=>{

    try {
        const DB = await client.db('folderStructure');
        const folder = await DB.collection('folders');

        const folderName =  Request.folderName.toLowerCase();

        return await folder.insertOne({name: folderName, subFolder: []});
    }catch (error) {
        return error;
    }
}

module.exports = rootFolderCreateService;