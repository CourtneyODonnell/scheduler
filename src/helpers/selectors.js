import React from  "react";

export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayState => dayState.name === day)[0];
  if (!selectedDay) return [];
  
  return selectedDay.appointments.map(appointment => state.appointments[`${appointment}`]);
};
