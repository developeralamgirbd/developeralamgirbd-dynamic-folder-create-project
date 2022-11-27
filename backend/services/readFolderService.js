const { client } = require('../dbConfig');

const readFolderService = async ()=>{

    try {
        const DB = await client.db('folderStructure');
        const folder = await DB.collection('folders');

        return await folder.find({}).toArray();

    }catch (error) {
        return error;
    }


}

module.exports = readFolderService;