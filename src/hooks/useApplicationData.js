import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    //console.log(id, interview);

    //check if appt is new or edit of existing before adding to count
    const newOrEditOfAppt = state.appointments[id].interview ? false : true;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({ ...prev, appointments }));
    return axios.put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        setState(prev => {
          getApptDay(id).spots -= (newOrEditOfAppt) ? 1 : 0;
          return {
            ...prev,
          };
        });
      });
  };
  const getApptDay = (id) => {
    for (const day of state.days) {
      for (const appointment of day.appointments) {
        if (appointment === id) {
          return day;
        }
      }
    }
  };
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => {
          getApptDay(id).spots += 1;
          return {
            ...prev,
          };
        });
      });
  };
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')  
    ]).then(all => {
      // console.log(all[1].data);
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);


  return { state, setDay, bookInterview, cancelInterview }
};