import React, { useState } from 'react';
import {ReactComponent as LogoArrow} from '../logos/icon-reply.svg';
import { nanoid } from 'nanoid';


const Profile = (props) => {
  const {content, photo, username, id, setQ, checkReply, setCheckReply, timer} = props;
  
  const handleReply = (id) =>{
    if(id === 1){
      setQ(true);
      setCheckReply(true);
    }
   
    console.log("est ce que tu me connais");
    
  }
  

  return (
      <div className='profile'>
          <div className='profile__img'>
              <div className='profile__img__information'>
                  <div className='image'>
                      <img src={photo} alt="fail"/>
                  </div>
                  <span className='username'>{username}</span>
                  <span className='timePost'>{timer}</span>
              </div>
              <div className='profile__img__reply' onClick={!checkReply ? () => handleReply(id) : null }>
                <div className='profile__img__reply--color'>
                  <LogoArrow />
                </div>
                <p>Reply</p>
              </div>
          </div>
          <p className='content'>{content}</p> 
      </div>
    
       
  )
}

export default Profile