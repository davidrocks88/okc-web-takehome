import React from "react";
import { connect } from "react-redux";
import { submitField } from "../madlibs";
import Questions from "./Questions";
import Essay from "./Essay";

require("./App.scss");

const App = ({ isEditing }) => {
  // Don't show question prompts if using is editing their madlib
  return (
    <div className="app-container">
      <div className="match-area">
        {!isEditing && <Questions />}
        {<Essay />}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  submitField,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
