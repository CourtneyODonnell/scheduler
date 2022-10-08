export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayState => dayState.name === day)[0];
  if (!selectedDay) return [];
  
  return selectedDay.appointments.map(appointment => state.appointments[`${appointment}`]);
};
export function getInterview(state, interview) {

  return interview
    ? {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }
    : null;
};
export const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.filter(dayState => dayState.name === day)[0];
  if (!selectedDay) return [];
  
  return selectedDay.interviewers.map(interviewer => state.interviewers[`${interviewer}`]);
};