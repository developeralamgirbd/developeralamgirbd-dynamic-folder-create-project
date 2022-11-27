import axios from "axios";
let baseUrl = 'http://localhost:8000';

export function Create(folderName){

    const postBody = {}
    postBody.folderName = folderName;

    const headers = {
        'Content-Type': 'text/plain',
    }

    return axios.post(baseUrl+'/create', postBody, { headers: headers }).then((res)=>{
        if (res.status === 200){
            return true
        }else {
            return false
        }
    }).catch((error)=>{
        return error.response.data
    })
}

export function Read(){

    return axios.get(baseUrl).then((res) =>{
        if (res.status === 200){
            return res.data
        }else {
            return false
        }
    }).catch((error)=>{
        console.log(error)
    })
}

export function CreateSubFolder(subFolderName, folderID){

    const postBody = {}
    postBody.rootFolderID = folderID;
    postBody.subFolderName = subFolderName;

    const headers = {
        'Content-Type': 'text/plain',
    }

    return axios.post(baseUrl+'/sub-folder-create', postBody, { headers: headers }).then((res)=>{
        if (res.status === 200){
            return true
        }else {
            return false
        }
    }).catch((error)=>{
        return error.response.data
    })
}

export function DeleteAPi(folderID){

    return axios.get(baseUrl+'/delete-folder?id='+folderID).then((res)=>{
        if (res.status === 200){
            return true
        }else {
            return false
        }
    }).catch((error)=>{
        return error.response.data
    })
}


export function SubFolderDelete(subFolderName, folderID){

    const postBody = {}
    postBody.rootFolderID = folderID;
    postBody.subFolderName = subFolderName;

    const headers = {
        'Content-Type': 'text/plain',
    }

    return axios.post(baseUrl+'/sub-folder-delete', postBody, { headers: headers }).then((res)=>{
        if (res.status === 200){
            return true
        }else {
            return false
        }
    }).catch((error)=>{
        return error.response.data
    })
}