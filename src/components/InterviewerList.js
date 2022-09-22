import React from 'react';
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function interviewerList(props) {
  const {interviewers} = props;
  const interviewersListData = interviewers.map(interviewer => {
    return (
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={event => {props.onChange(interviewer.id)}}    
    />
  );
});
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersListData}</ul>
    </section>
  )
}