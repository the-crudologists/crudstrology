import React, { useState, useContext, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { AstroButton, UserHoro, OtherHoros } from '../Styled.jsx';
const Journal = () =>{
  const { quill, quillRef } = useQuill();
  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>Thoughts</h1>');
    }
  }, [quill]);

  console.log(quill); // undefined > Quill Object
  console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div className='Journal'>
      <h1 className='Journal-title'> Journal</h1>
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
        <button className='text' onClick = {(e)=> console.log("hi")}>Submit</button>
    </div>
    </div>
  );
};

export default Journal;
