import React, { useState } from 'react'
import Like from './Like'
import {ReactComponent as LogoArrow} from '../logos/icon-reply.svg';
import { ReactComponent as Delete } from '../logos/icon-delete.svg';
import { ReactComponent as Edit } from '../logos/icon-edit.svg';
import Update from './Update';


const FirstReplying = (props) => {
  const {replying, content, source, username, score, timer, setFirstComment, id, setQ, setW, replyingTo, setCheckReply, secondCheckReply} = props;
  const [comment, setComment] = useState({value: `${replyingTo}${content}`})
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = (id) =>{
    setFirstComment(prev => prev.filter(item => item.id !== id));
    setQ(false);
    setW(false)
    setCheckReply(false)
   
  }

  // function handleEdit to update  setIsdit()
  const handleEdit = () => {
   setIsEdit(true)
  }

  // function handleChange
  const handleChange = (event)=>{
    setComment(prev => {
      return {
        ...prev,
        value: event.target.value
      }
    })
  }

  // function handleSend
  const handleSend = (id) =>{
      setFirstComment(prev => prev.map(item =>{
        return item.id === id ? {...item, content: comment.value.replace(`${replyingTo}`, "")} : item
      })
      )
      
    setIsEdit(false);
    
  }

  // function to reply
  const handleReply = (id) =>{
    setQ(true)
    setCheckReply(true)
  }

  const showUpdate = isEdit && <Update 
                           value={comment.value}
                           handleChange={handleChange}
                           handleSend={handleSend}
                           id={id}
                          
                        />
  
  const blocReply = username !== "juliusomo" ? ( 
      <div className='reply__profile__replying__img__reply' onClick={!secondCheckReply ? handleReply : null}>
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
                    <span>{timer ? timer: "few seconds"}</span>
                </div>
               {blocReply}
            </div>
            <div className='p'><span>{replying.length > 0 && isEdit === false ? `@${replying}` : ""}</span><span>{isEdit ? showUpdate : content}</span></div>
          </div>
        </div>

  )
}

export default FirstReplying