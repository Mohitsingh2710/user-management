import React from 'react'
import "../App.css";

function Pagination({users,pageNo,setPageNo, pageSize}) {
  return (
    <div className='pagination-container' style={(users.length===0)?{display:'none'}:{}}>
        <button style={{border : "2px solid grey",borderRadius: "10px"}} disabled={pageNo===1? true: false} onClick={()=>setPageNo(pageNo-1)}>Prev</button>
       {
        [...Array(Math.ceil(users.length/pageSize))].map((_,i)=>{
             console.log("index", i,"page", pageNo);
          return  <button key={i+1} id={(pageNo===(i+1))?'btn-selected':""} onClick={()=>setPageNo(i+1)}>{i+1}</button>
})
       }
       <button style={{border : "2px solid grey",borderRadius: "10px"}} disabled={pageNo===Math.ceil(users.length/pageSize)? true : false} onClick={()=>setPageNo(pageNo+1)}>Next</button>
    </div>
  )
}

export default Pagination
