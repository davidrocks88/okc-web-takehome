import React from "react";
import { connect } from "react-redux";
import { startOver, editEssay } from "../madlibs";

require("./Essay.scss");

const Essay = ({
  essayText,
  essayAsString,
  numEmptyFields,
  startOver,
  editEssay,
  isEditing,
}) => {

  // Show a button if a user has no more fields left,
  // or is editing their madlib
  let button;
  if (isEditing) {
    button = <button onClick={startOver} className="essay-button">Start Over</button>;
  } else if (numEmptyFields === 0) {
    button = <button onClick={editEssay} className="essay-button">Edit</button>;
  }

  // Let users edit their madlib if they are in editing mode
  let essay;
  if (isEditing) {
    essay = <textarea className="essay-edit-text">{essayAsString}</textarea>
  } else {
    essay = <div className="essay-text">{essayText}</div>;
  }

  return (
    <div className="essay-container" style={{backgroundColor: isEditing ? "transparent": "white"}}>
      <h3>Your Essay Text</h3>
      {essay}
      <div className="button-container">{button}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  startOver,
  editEssay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Essay);
