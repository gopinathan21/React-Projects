import React from "react";
import "./resume.css";


function  ResumeModal(props){
  const {startTimer }= props;
  return (
    <div className='resume-modal'>
      <div className='modal-content'>
        <h2 className='modal-text'>Timer will automatically start after a Minute</h2>
        <button className="modal-button" onClick={startTimer}>Resume Now</button>
      </div>
    </div>
  );
};
export default ResumeModal;
