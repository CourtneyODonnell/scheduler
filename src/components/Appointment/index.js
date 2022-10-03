import React, { fragment } from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode";
import { prototype } from 'babel-loader/lib/Error';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  const getInterviewer = (interviewers, interview) => {
    if (interview && interviewers) {
      const interviewer = interviewers.filter(interviewer => {
        return interviewer.id === interview.interviewer;
      });
      return interviewer[0].name;
    }
  };
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)}
        />}
      {mode === SHOW &&
      <Show
        student={props.interview.student}
        interviewer={getInterviewer(props.interview, props.interviewer)}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />}
      {mode === SAVING &&
        <Status
          message="Saving"
        />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      }
    </article>
  );
}