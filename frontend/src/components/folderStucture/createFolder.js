import React, {useRef, useState} from 'react';
import {Create} from "../../restAPI/restApi";

function CreateFolder(props) {

    let folderName = useRef();

    const [error, setError] = useState('');

    const saveData = (event)=>{
        event.preventDefault()

        Create(folderName.value).then((res)=>{
            if (res === true){
                console.log(res)
                props.handleClose()
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
                    <h2>Add Folder in <span>Root</span></h2>
                    <form>
                        <input type="text" ref={(input)=> folderName = input} placeholder='folder name'/>
                        <p style={{color: 'orangered'}}>{error}</p>
                        <div className='action-btn'>
                            <button type='button' onClick={props.handleClose}>Cancel</button>
                            <button onClick={saveData} type='submit'>Create</button>
                        </div>

                    </form>
                </div>
                <div className="wrap-bg"></div>
            </div>
        );
}

export default CreateFolder;