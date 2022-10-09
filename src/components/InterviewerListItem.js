import React from "react";
import "components/InterviewerListItem.scss";

import classnames from "classnames";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const InterviewerListItemClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return(
    <li className={InterviewerListItemClass} selected={selected} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
}