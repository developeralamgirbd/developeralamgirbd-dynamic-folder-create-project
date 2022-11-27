import React, {useEffect, useRef, useState} from 'react';
import {DeleteAPi, Read, SubFolderDelete} from "../../restAPI/restApi";
import CreateFolder from './createFolder';
import CreateSubFolderForm from './createSubFolder';

import upIcon from '../../assets/img/up.png';
import downIcon from '../../assets/img/down.png';


function FolderList() {

    const [show, setShow] = useState(false);
    const [showSub, setShowSub] = useState(false);

    const handleShow = ()=> setShow(true);
    const handleClose = ()=> setShow(false);


    const [folderId, setFolderId] = useState('');
    const [folderName, setFolderName] = useState('');

    const showSubFolderForm = (id, name) => {
        setFolderId(id);
        setFolderName(name);
        setShowSub(true);
    }

    const closeSubFolderForm = ()=> setShowSub(false);

    const [data, setData] = useState([]);
    useEffect(()=>{
        Read().then((Result)=>{
            setData(Result);
        })
    }, []);

    // Api Call
    const deleteFolder = (folderID)=>{
        DeleteAPi(folderID).then((res)=>{
            console.log(res)
            window.location.reload();
        })
    }

    // Sub Folder Delete API
    let subFolderName, folderID = useRef();

    const deleteSubFolder = (event)=>{
        event.preventDefault();

        SubFolderDelete(subFolderName.value, folderID.value).then((res)=>{
            if (res === true){
                console.log(res)
                window.location.reload();
            }else {
                console.log(res)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    // Toggle
    // Root Folder Toggle
    const [isShowFolder, setShowFolder ] = useState(false);

    const toggle = ()=>{
        isShowFolder === true ? setShowFolder(false) : setShowFolder(true);
    }
    // Sub Folder Toggle


    const [isShowSubFolder, setShowSubFolder ] = useState(false);

    const [checkID, setID] = useState();

    const subFolderToggle = (id)=>{
        setID(id);
        isShowSubFolder === true ? setShowSubFolder(false) : setShowSubFolder(true);
    }

    return (
        <div className='listWrap'>
           
            <ul className='rootList'>
                <li>
                    <div onClick={toggle} className='sub-folder'><div>
                        <img className='icon' src={upIcon} style={isShowFolder ? {display: 'none' }: {display: 'block'}} alt=""/>
                        <img className='icon' src={downIcon} style={isShowFolder ? {display: 'block' }: {display: 'none'}} alt=""/>  Root</div>
                        <button onClick={handleShow} className='add-btn'>+ New</button></div>

                    <ul style={isShowFolder === true ? {display: 'block'}: {display: 'none'}}>
                        {
                            data ?
                            data.length > 0 ? data.map(item => {
                               return <li>
                                    <div className='sub-folder'>
                                        <div onClick={subFolderToggle.bind(this, item._id)}>
                                            <img className='icon' src={upIcon} style={isShowSubFolder && item._id === checkID ? {display: 'none' }: {display: 'block'}} alt=""/>
                                            <img className='icon' src={downIcon} style={isShowSubFolder && item._id === checkID ? {display: 'block' }: {display: 'none'}} alt=""/>
                                            {item.name}

                                            <button onClick={deleteFolder.bind(this, item._id)} className='delete-btn'>X</button></div> <button onClick={showSubFolderForm.bind(this, item._id, item.name)} className='add-btn'>+ New</button>
                                    </div>

                                    <ul style={isShowSubFolder === true && item._id === checkID ? {display: 'block'}: {display: 'none'}}>
                                        { item.subFolder.length > 0 ? item.subFolder.map(subFolder => {
                                           return <li>
                                                <div className='sub-folder'>
                                                        <div>{subFolder}
                                                            <div className='delete-btn'>
                                                                <form action=''>
                                                                    <input type="hidden" ref={(input)=>folderID=input} value={item._id}/>
                                                                    <input type="hidden" ref={(input)=>subFolderName=input} value={subFolder}/>

                                                                    <div className='action-btn'>
                                                                        <button onClick={deleteSubFolder} type='submit'>X</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                </div>
                                            </li>
                                        }): 'No Folder'}

                                    </ul>
                                </li>

                            }): 'No Folder'
                          : ''
                        }

                    </ul>

                </li>

            </ul>
            {
                show ? <CreateFolder handleClose={handleClose} /> : ''
            }
            {
                showSub ? <CreateSubFolderForm folderId={folderId} folderName={folderName} closeSubFolderForm={closeSubFolderForm} /> : ''
            }
        </div>
    );
}

export default FolderList;