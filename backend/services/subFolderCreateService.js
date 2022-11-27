const { client } = require('../dbConfig');
const {ObjectID} = require("mongodb");

const rootFolderCreateService = async (Request)=>{

    try {
        const DB = await client.db('folderStructure');
        const folder = await DB.collection('folders');

        const rootFolderID = Request.rootFolderID;
        const subFolderName = Request.subFolderName.toLowerCase();

        return await folder.updateOne({_id: ObjectID(rootFolderID)}, {$addToSet: {subFolder: subFolderName}});

    }catch (error) {
        return error;
    }


}

module.exports = rootFolderCreateService;

// db.fineOne({_id: '63808d069c6e85bf71b95281'})