import React from "react";
import { connect } from "react-redux";
import { submitField } from "../madlibs";
import { FIELDS } from "../constants";

require("./Questions.scss");

const Questions = ({ fieldOrder, submitField }) => {
  // Don't count empty answers, only dispatch event
  // if there is content
  const onBlur = (id) => (event) => {
    if (event.target.value !== "") {
      submitField({ id, answer: event.target.value });
    }
  };

  return (
    <div className="questions">
      <h3>About Me</h3>
      {fieldOrder.map((fieldId) => {
        return (
          <div key={fieldId}>
            <p className="question-title">{FIELDS[fieldId]}</p>
            <input onBlur={onBlur(fieldId)} className="question-input" />
          </div>
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  submitField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
