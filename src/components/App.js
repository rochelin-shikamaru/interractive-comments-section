import React, { useEffect, useState } from 'react';
import Like from './Like';
import Profile from './Profile';
import Reply from './Reply';
import data from './data.json';
import Send from './Send';
import FirstReplying from './FirstReplying';
import '../scss/app.css';
import { nanoid } from 'nanoid';


const App = () => {
 
  const [value, setValue] = useState({comment: ""});
  const [firstValue, setFirstValue] = useState({comment: "@amyrobson "})
  const [secondValue, setSecondValue] = useState({comment: "@ramsesmiron "})
  const [q, setQ] = useState(false);
  const [z, setZ] = useState(false);
  const [e, setE] = useState(false);

  const [allData, setAllData] = useState({comments: []})
 
  const [checkReply, setCheckReply] = useState(() =>{
    const save = localStorage.getItem("checkReply");
    const parseSave = JSON.parse(save)
    return parseSave || false
  });

  const [secondCheckReply, setSecondCheckReply] = useState(() =>{
    const save = localStorage.getItem("secondCheckReply");
    const parseSave = JSON.parse(save)
    return parseSave || false
  });

  const [sendData, setSendData] = useState(() =>{
    const save = localStorage.getItem("send");
    const parseSave = JSON.parse(save)
    return parseSave || []
  });

  const [w, setW] = useState(() =>{
    const save = localStorage.getItem("check");
    const parseSave = JSON.parse(save)
    return parseSave || false
  });


  const [firstComment, setFirstComment] = useState(() =>{
    const save = localStorage.getItem("items");
    const parseSave = JSON.parse(save)
    return parseSave || []
  });

  const [ fuck, setFuck] = useState(() =>{
    const saves = localStorage.getItem("fuck");
    const parseSaves = JSON.parse(saves)
    return parseSaves || []
  });

  // useEffect to loclaStorage  allData
  

  // useEffect to localStorage reply onclick
  useEffect(()=>{
    localStorage.setItem("checkReply", JSON.stringify(checkReply));
  }, [checkReply])

  useEffect(()=>{
    localStorage.setItem("secondCheckReply", JSON.stringify(secondCheckReply));
  }, [secondCheckReply])

  // useEffect to localStorage for sendData
  useEffect(() => {
    localStorage.setItem("send", JSON.stringify(sendData));
  }, [sendData])
  
  // useEffect to localstorage for data FirstReplying

  useEffect(()=>{
    setAllData(data);
    
    if(fuck.length == 0){
      setFuck(data.comments.filter(item => item.replies.length > 0)[0].replies);
    }
    else{
      setFuck(JSON.parse(localStorage.getItem("fuck")))
    }
    
  }, [])

  // useEffect to localstorage for data firstComment

  useEffect(() => {

    localStorage.setItem("items", JSON.stringify(firstComment));

  }, [firstComment]);

  useEffect(() => {
    localStorage.setItem("check", JSON.stringify(w))
  }, [w])

  useEffect(() => {
    localStorage.setItem("fuck", JSON.stringify(fuck))
    console.log(1);
  }, [fuck])


// fin localStorage UseEffect

  // function to reply firt comment reply
  const handleSendReply = (event) => {
    event.preventDefault();
    setFirstComment(prev => {
      return [
        ...prev,
        {
          content: firstValue.comment.replace("@amyrobson ", ""),
          source: "images/avatars/image-juliusomo.png",
          username: "juliusomo",
          replying: "amyrobson",
          score: 0, 
          id: nanoid(),
        }
      ]
    })
    setQ(false);
    setW(true);
    setFirstValue({comment: "@amyrobson "})
    console.log("stupid");
    
  }

// function to reply a comment
  const handleSendReplyComment = (event) =>{
    event.preventDefault();
    setFuck(prev => {
      return [
        ...prev,
        {
          content: secondValue.comment.replace("@ramsesmiron ", ""),
          user: {
            image: {
                      png: "images/avatars/image-juliusomo.png"
                    },
            username: "juliusomo"
          },
          
          replyingTo: "ramsesmiron",
          score: 0, 
          id: nanoid(),
        }
      ]
    })
    setZ(false);
    setE(true);
    setSecondValue({comment: "@ramsesmiron "})
  }

  const handleChangeFirst = (event) => {
    setFirstValue(prev => {
      return {
        ...prev,
        comment: event.target.value
      }
    })
  
  }

// handle change reply comment

const handleChangeFirstComment = (event) => {
  setSecondValue(prev => {
    return {
      ...prev,
      comment: event.target.value
    }
  })

}
  
  const secondReplie = firstComment.length > 0  && firstComment.map(item =>
    
    <FirstReplying 
      key={item.id}
      replying={item.replying}
      content={item.content}
      source={item.source}
      username={item.username}
      score={item.score} 
      setFirstComment={setFirstComment}
      id={item.id}
      setQ={setQ}
      setW={setW}
      firstValue={firstValue}
      replyingTo="@amyrobson "
      setCheckReply={setCheckReply}
      timer="now"
    />
    
  )
//


  const replie = fuck.length > 0 && fuck.map(item =>
    <div key={item.id}>    
        
        <FirstReplying 
          key={item.id}
          replying={item.replyingTo}
          content={item.content}
          source={item.user.image.png}
          username={item.user.username}
          score={item.score} 
          setFirstComment={setFuck}
          id={item.id}
          setQ={setZ}
          setW={setE}
          firstValue={firstValue}
          setSendData={setFuck}
          sendData={fuck}
          replyingTo="@ramsesmiron "
          secondCheckReply={secondCheckReply}
          setCheckReply={setSecondCheckReply}
          timer={item.createdAt}
        />
        {/* after is good change name var q and w  */}
        {z && 
          <Send 
            handleSend={handleSendReplyComment}
            value={secondValue.comment}
            handleChange={handleChangeFirstComment}
          />
        }
       
    </div>
    
  )
console.log(allData);
  const profile = allData.comments.map(item => 
      <div key={item.id}>
          <div className='appComment'>
            <Like 
              score={item.score}
             />
           <Profile 
              content={item.content}
              photo={item.user.image.png}
              username={item.user.username}
              setAllData={setAllData}
              allData={allData}
              id={item.id}
              setQ={setQ}
              checkReply={checkReply}
              setCheckReply={setCheckReply}
              timer={item.createdAt}
              />
          </div>
          {/* after is good change name var q and w  */}
          {item.id === 1 && q && 
            <Send 
              handleSend={handleSendReply}
              value={firstValue.comment}
              handleChange={handleChangeFirst}
            />
          }
          {
            item.id === 1 && w &&
              <div className='reply'>
                  <div className='reply__width--width'>
                    {secondReplie}
                  </div>
              </div>
          }
      </div>    
  )
 
  const handleSend = (event) => {
    event.preventDefault();
    setSendData(prev => {
      return[
        ...prev,
         {
        content: value.comment,
        source: "images/avatars/image-juliusomo.png",
        username: "juliusomo",
        score: 0, 
        id: nanoid(),
        isEdit: false
        }
      ]
    })
    setValue({comment: ""});
    console.log("youpi");
  }
  const handleChange = (event) => {
    setValue(prev => {
      return {
        ...prev,
        comment: event.target.value
      }
    })
  }
  
  return (
    <div className='app'>
      {profile}
      <div className='reply'>
        <div className='reply__border'></div>
        <div>
          {replie}
        </div>
      </div>
      <div className='newComment'>
        {sendData.length > 0 && sendData.map((item, index) =>{
          return <Reply 
            key={index}
            content= {item.content}
            source={item.source}
            username={item.username}
            score={item.score}
            replying=""
            setSendData={setSendData}
            id={item.id}
            timer="few seconds"
          />
        })}
      </div>
      <Send 
        value={value.comment}
        handleChange={handleChange}
        handleSend={handleSend}
      />
    </div>
  )
}

export default App