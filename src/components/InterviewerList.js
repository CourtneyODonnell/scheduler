import React from 'react';
import PropTypes from 'prop-types'; 

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function interviewerList(props) {
  const interviewerList = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />
  });
  interviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}  