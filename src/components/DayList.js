import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day) =>
      <DayListItem
        key = {day.id}
        name = {day.name}
        spot = {day.spots}
        selected = {day.name === props.day}
        setDay = {props.setDay}
      />
      )
      });
    </ul>
  );
}