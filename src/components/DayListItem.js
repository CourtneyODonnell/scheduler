import React from "react";
import classnames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  
  const dayListItemClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots===0
  });
  //function displays remaining spots
  const formatSpots = function() {
    const numberOfSpots = props.spots;

    if (numberOfSpots === 0) {
      return 'no spots remaining';
    } else if (numberOfSpots === 1) {
      return '1 spot remaining';
    } else {
      return `${numberOfSpots} spots remaining`;
    }  
  }

  return (
    <li className={dayListItemClass} selected={props.selected} onClick={() => props.setDay(props.name)} data-testid='day'>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}