import React from 'react'

const Update = (props) => {
    const {handleChange, handleSend, value, id} = props;
  return (
        <form className="form__update">
          <textarea className="textarea" placeholder='Add a comment...' onChange={handleChange} value={value}/>
          <button onClick={()=> handleSend(id)}>UPDATE</button>
        </form>
  )
}

export default Update