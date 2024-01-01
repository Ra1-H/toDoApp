import React from 'react';



function InputForm({textInput,titleInput,priorityInput,selectedDate,onDateChange,onTextChange,onTitleChange,onPriorityChange,addNote,closeInputForm}) {
   
const formLayout={
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"start",
    flexDirection:"column",
    gap:"10px",
    backgroundColor:"white",
    color:"black",
    padding:"10px",
    borderRadius:"10px"

}

const modalStyles = {
    position: 'absolute',
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    top:"13%",
    left:"40%",
    transform: 'translateX(-50%)',
    width: 'auto',
    height:"auto",
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex:2,
  };

  return (
    <div style={modalStyles}>
        <div style={formLayout} >
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"30%",gap:"10px"}}>
                <input
                    id="titleInput_space"
                    placeholder="title here..."
                    style={{width:"100%",height:"100%",border:"1px solid black",borderRadius:"10px",padding:"10px"}}
                    value={titleInput}
                    onChange={onTitleChange}
                >
                </input>
                <input
                    id="textInput_space"
                    placeholder="more info..."
                    style={{width:"100%",height:"100%",border:"1px solid black",borderRadius:"10px",padding:"10px"}}
                    required
                    value={textInput}
                    onChange={onTextChange}
                >
                </input>
            </div>
        
            {/* priority */}
            <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"start",gap:"5px",padding:"5px"}}>
                    <div><label>Priority:</label></div>
        
                    <div style={{display:"flex",flexDirection:"column"}}>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value}>
                            <input
                            type="radio"
                            id={`priority${value}`}
                            name="priority"
                            value={value}
                            checked={priorityInput === value}
                            onChange={onPriorityChange}
                            />
                            <label htmlFor={`priority${value}`}>{`Priority ${value}`}</label>
                        </div>
                        ))}
                    </div>
            </div>
            <div>
                <label htmlFor='date'>Select Due Date: </label>
                <input
                    style={{borderRadius:"5px",border:"1px solid black",padding:"5px"}}
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={onDateChange}
                />
             </div>
             <div style={{display:'flex',alignItems:"center",justifyContent:"center",width:"70px",height:"auto"}}> <button style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"orange",border:"none",borderRadius:"5px"}} type="button" onClick={addNote}>Add note</button></div>
             <div style={{display:'flex',alignItems:"center",justifyContent:"center",width:"70px",height:"auto"}}> <button style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"grey",border:"none",borderRadius:"5px"}} type="button" onClick={closeInputForm}>Close</button></div>
        </div>
          
    </div>
    );
}

export default InputForm