import React from 'react';
import '../index.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About JengaFit</h1>
      <p>
        JengaFit is a reliable fitness application that enables users to stay consistent with fitness goals.
      </p>
      <p>
        JengaFit provides a personalized and customizable workout tracker that helps users focus on progress tracking and get pumped up with motivation 💪.
      </p>

      <h2>Users can:</h2>
      <ul>
        <li>Log Exercises and track fitness activities</li>
        <li>Easily input specific details about workouts, including type, duration, and calories burned.</li>
      </ul>

      <h2>Set Personal Goals</h2>
      <p>
        Define fitness objectives that align with unique needs, such as postpartum recovery or building endurance.
      </p>

      <h2>Track Progress</h2>
      <p>
        Use visual tools like charts and graphs to stay inspired by seeing measurable improvement over time.
      </p>

      <p>
        JengaFit is not just a technical project but a tool inspired by personal experience. It’s designed to support people like me—on postpartum journeys or tackling other fitness challenges—by providing a simple, effective way to track progress and stay motivated.
      </p>
    </div>
  );
};

export default AboutUs;
