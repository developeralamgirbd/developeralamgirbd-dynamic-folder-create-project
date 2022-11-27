import React, {useRef, useState} from 'react';
import {CreateSubFolder} from "../../restAPI/restApi";

function CreateSubFolderForm(props) {

    let subFolderName, folderID = useRef();

    const [error, setError] = useState('');

    const saveSubFolder = (event)=>{
        event.preventDefault()

        CreateSubFolder(subFolderName.value, folderID.value).then((res)=>{
            if (res === true){
                console.log(res)
                props.closeSubFolderForm()
                window.location.reload();
            }else {
                setError(res.error)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

        return (
            <div className='form-wrap'>
                <div className='form-box'>
                    <h2>Add Folder in <span>{props.folderName}</span></h2>
                    <form action="">
                        <input type="hidden" ref={(input)=>folderID=input} value={props.folderId}/>
                        <input type="text" ref={(input)=>subFolderName=input} placeholder='folder name'/>
                        <p style={{color: 'orangered'}}>{error}</p>
                        <div className='action-btn'>
                            <button type='button' onClick={props.closeSubFolderForm}>Cancel</button>
                            <button onClick={saveSubFolder} type='submit'>Create</button>
                        </div>
                    </form>
                </div>
                <div className="wrap-bg"></div>
            </div>
        );
}

export default CreateSubFolderForm;