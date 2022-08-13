import React from 'react'

const Send = (props) => {
    const {value, handleChange, handleSend} = props;
  return (
    <div className='app__send'>
      <div className='app__send__img'>
        <img src='images/avatars/image-juliusomo.png' alt="username" />
      </div>
        <form>
          <textarea placeholder='Add a comment...' onChange={handleChange} value={value}/>
          <button onClick={handleSend}>SEND</button>
        </form>
      </div>
  )
}

export default Send