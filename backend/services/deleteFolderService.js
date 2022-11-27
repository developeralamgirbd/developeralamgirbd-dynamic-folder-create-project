const { client } = require('../dbConfig');
const {ObjectID} = require("mongodb");

const deleteFolderService = async (_id)=>{

    try {
        const DB = await client.db('folderStructure');
        const folder = await DB.collection('folders');

        // const rootFolderID = Request.rootFolderID;
        // const subFolderName = Request.subFolderName.toLowerCase();

        return await folder.deleteOne({_id: ObjectID(_id)});

    }catch (error) {
        return error;
    }


}

module.exports = deleteFolderService;