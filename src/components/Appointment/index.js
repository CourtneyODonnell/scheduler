import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteAppointment = (id) => {
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const getInterviewer = (interviewers, interview) => {
    if (interviewers && interview) {
      const interviewer = interviewers.filter(interviewer => {
        return interviewer.id === interview.interviewer;
      });
      return interviewer.length === 0 ? null : interviewer[0].name;
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
        interviewer={getInterviewer(props.interviewers, props.interview)}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }

      {mode === SAVING &&
        <Status
          message="Saving"
        />}
      
      {mode === DELETING &&
        <Status
          message="Deleting..."
        />
      }

      {mode === CONFIRM &&
        <Confirm
          onConfirm={() => deleteAppointment(props.id)}
          onCancel={back}
        />
      }

      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Failed to save appointment."
          onClose={() => transition(EDIT)}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Failed to cancel appointment."
          onClose={() => transition(SHOW)}
        />
      }
    </article>
  );
};