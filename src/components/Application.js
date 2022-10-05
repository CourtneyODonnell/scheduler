import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //change variable from appointments to appointmentsToday for clarity
  const appointmentsToday = getAppointmentsForDay(state, state.day);

  const setDay = day => setState(prev => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({ ...prev, appointments }));
     return axios.put(`/api/appointments/${id}`, { interview: {... interview } });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`);
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
      </section>
      <section className="schedule">
        {/* changed item variable to appointment for clarity */}
        {appointmentsToday.map(appointment => {
          return (
            <Appointment
              key={appointment.id}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
              interviewers={getInterviewersForDay(state, state.day)}
              {...appointment}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}