# FITLOG

A modern workout library and planning web app built with Next.js and Tailwind CSS.

## Live Demo

https://fit-log-peach.vercel.app/

## GitHub Repository

https://github.com/SkSabuj-Web/fit-log.git

## About The Project

FitLog is a responsive workout library that helps users explore exercises, view detailed workout information, create a daily workout plan, save workouts for later, and track completed exercises.

The project uses a workout API to dynamically load workout data.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- REST API
- LocalStorage
- Vercel

## Features

- Responsive design for mobile, tablet and desktop
- Dynamic workout library from API
- Workout search and exploration
- Dynamic workout details page
- Workout duration, calories and rating information
- Add workouts to today's plan
- Save workouts for later
- My Plan dashboard
- Live exercise, minutes and calorie metrics
- Mark workouts as done
- Remove workouts from plan
- Remove saved workouts
- LocalStorage persistence
- Workout sorting by duration, calories and rating
- Toast notifications
- Custom 404 page
- Responsive navigation
- Modern dark gym-focused UI

## API

Workout data is loaded from:

https://api.abcz.workers.dev/api/fitlog

Single workout:

https://api.abcz.workers.dev/api/fitlog/:id

## Project Structure


src/
├── app/
│   ├── my-plan/
│   │   └── page.jsx
│   ├── workout/
│   │   └── [id]/
│   │       └── page.jsx
│   ├── not-found.jsx
│   ├── page.js
│   ├── layout.js
│   └── globals.css
│
├── assets/
│   ├── banner.png
│   └── logo.png
│
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── WorkoutCard.jsx
│
└── context/
    └── PlanContext.jsx
