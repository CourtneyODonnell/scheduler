import React from "react";
import "components/Application.scss";

import DayList from "./DayList";
import "components/Application";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}{...appointment}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={getInterviewersForDay(state, state.day)}
        interview ={interview}
      />
    );
  });
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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};