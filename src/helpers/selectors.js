import React from  "react";

export function getAppointmentsForDay(state, day) {
  let selectedDay = state.days.filter(d => d.name === day)[0];
  let result = [];

  if (!selectedDay) {
    return [];
  }
  
  for (const appointment of selectedDay.appointments) {
    const apptObj = state.appointments[appointment];
    result.push(state.appointments);
  }

  return result;
};
