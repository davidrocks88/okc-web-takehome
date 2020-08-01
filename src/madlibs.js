import { FIELD_NAMES, NUM_FIELDS } from "./constants";
import React from "react";

import { getFormattedEssayString, getRandomTemplate } from "./helpers";

// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const START_OVER = "MADLIBS.START_OVER";
export const EDIT = "MADLIBS.EDIT";

// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],

  fieldAnswers: {},
  essayText: "",
  essayAsString: "",
  numEmptyFields: NUM_FIELDS,
  isEditing: false,
};

// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      // If the answer did not change, then don't change the state
      if (state.fieldAnswers[action.payload.id] &&
          state.fieldAnswers[action.payload.id].answer === action.payload.answer) {
        return state;
      }

      const fieldAnswers = Object.assign({}, state.fieldAnswers);
      const template = getRandomTemplate(action.payload.id);
      fieldAnswers[action.payload.id] = {
        template,
        answer: action.payload.answer,
      };

      // Format essay text such that for each answer,
      // we create a JSX object with the "answer" value
      // bolded. This arra will be rendered as inline text
      const essayText = Object.values(fieldAnswers)
        .map((f) => getFormattedEssayString(f.template, f.answer))
        .map((f, i) => (<div className="essay-content" key={i}>{f}</div>));

      // Essay string is created from doing a string replacement
      // for the answer term
      const essayAsString = Object.values(fieldAnswers)
        .map((f) => f.template.replace("$answer", f.answer))
        .join(" ");

      const numEmptyFields = NUM_FIELDS - Object.keys(fieldAnswers).length;
      return {
        ...state,
        fieldAnswers,
        essayText,
        numEmptyFields,
        essayAsString,
      };
    }

    case START_OVER: {
      return INITIAL_STATE;
    }

    case EDIT: {
      return {
        ...state,
        isEditing: true,
      };
    }

    default:
      return state;
  }
}

// Action creators
// ----------------------------------------------------------------------------

export function submitField({ id, answer }) {
  return { type: SUBMIT_FIELD, payload: { id, answer } };
}

export function startOver() {
  return { type: START_OVER };
}

export function editEssay() {
  return { type: EDIT };
}
