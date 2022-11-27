const { client } = require('../dbConfig');
const {ObjectID} = require("mongodb");

const subFolderDeleteService = async (Request)=>{

    try {
        const DB = await client.db('folderStructure');
        const folder = await DB.collection('folders');

        const rootFolderID = Request.rootFolderID;
        const subFolderName = Request.subFolderName.toLowerCase();

        return await folder.updateOne({_id: ObjectID(rootFolderID)}, {$pull: {subFolder: subFolderName}});

    }catch (error) {
        return error;
    }


}

module.exports = subFolderDeleteService;

// db.fineOne({_id: '63808d069c6e85bf71b95281'})