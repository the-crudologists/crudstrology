import React, { useState, useContext, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const Journal = () =>{
  // variables for quill
  const { quill, quillRef } = useQuill();
  // setting state for entries in quill
  const [entries, setEntries] = useState([]);
  React.useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('<h1>Thoughts</h1>');
    }
  }, [quill]);
 
  const handleButtonClick = () => {
    if (quillRef.current) {
      // console.log(quillRef.current.querySelector('.ql-editor').innerText);
      const newEntry = quillRef.current.querySelector('.ql-editor').innerText;
      setEntries(prevEntries => [...prevEntries, newEntry]);
      
    }
  };
  // console.log(quill); // undefined > Quill Object
  // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  return (
    <div className='Journal'>
      <h1 className='Journal-title'> Journal</h1>
      <div style={{ width: 500, height: 300 }}>
        <div ref={quillRef} />
        <button className='text' onClick={handleButtonClick}>Submit</button>
      </div>
      
    </div>
  );
};

export default Journal;
