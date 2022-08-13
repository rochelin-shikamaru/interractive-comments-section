import React, { useState } from 'react'
import Like from './Like'
import {ReactComponent as LogoArrow} from '../logos/icon-reply.svg';
import { ReactComponent as Delete } from '../logos/icon-delete.svg';
import { ReactComponent as Edit } from '../logos/icon-edit.svg';
import Update from './Update';


const Reply = (props) => {
  const {replying, content, source, username, score, setSendData, id, timer} = props;
  const [editcomment, setEditComment] = useState({value: content})
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = (id) =>{
    setSendData(prev => prev.filter(item => item.id !== id));
    console.log(id);
   
  }

  // function handleEdit to update  setIsEdit()
  const handleEdit = (id) => {
   setIsEdit(true)

  }

  // function handleChange
  const handleChange = (event)=>{
    setEditComment(prev => {
      return {
        ...prev,
        value: event.target.value
      }
    })
  }

  // function handleSend
  const handleSend = (id) =>{
      setSendData(prev => prev.map(item =>{
        return item.id === id ? {...item, content: editcomment.value} : item
      })
      )
      
    setIsEdit(false);
   
  }

  // function handleReply
  const handleReply = (id) => {
    console.log("fuck reply");
  }

  
  const showUpdate = isEdit && <Update 
                          value={editcomment.value}
                           handleChange={handleChange}
                           handleSend={handleSend}
                           id={id}
                          
                        />
  
  const blocReply = username !== "juliusomo" ? ( 
      <div className='reply__profile__replying__img__reply' onClick={() => handleReply(id)}>
        <div className='reply__profile__replying__img__reply--color'>
          <LogoArrow />
        </div>
        <p>Reply</p>
      </div>) :(
      <div className='crud'>
        <div className='crud__delete' onClick={() => handleDelete(id)}>
          <Delete />
          <p>Delete</p>
        </div>
        <div className='crud__edit' onClick={() => handleEdit(id)}>
          <Edit />
          <p>Edit</p>
        </div>
      </div>
  )

  const blocYou = username === "juliusomo" ? (
    <p className='blocYou'>you</p>
  ): undefined

  return (
    

        <div className='reply__profile'>
          <Like score={score}/>
          <div className='reply__profile__replying' >
            <div className='reply__profile__replying__img'>
                <div className='reply__profile__replying__img__information'>
                    <div  className={replying.length <= 0 ? "content--margin" : null}>
                        <img src={source} alt="fail"/>
                    </div>
                    <span>{username}</span>
                    {blocYou}
                    <span>{timer}</span>
                </div>
               {blocReply}
            </div>
            <div className='p'><span>{replying.length > 0 && isEdit === false  ? `@${replying}` : ""}</span><span>{isEdit ? showUpdate : content}</span></div>
          </div>
        </div>

  )
}

export default Reply