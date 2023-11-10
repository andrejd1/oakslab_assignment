# Startup Progress Tracker

A simple web application to track the progress of your startup with different phases and tasks. This project is built using React, Vite, TypeScript, and Material-UI for styling components.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contributors](#contributors)

## Features

- Create different phases for your startup.
- Add an unlimited number of tasks to each phase.
- Mark tasks as completed or reopen them.
- Store progress in local storage for persistence.
- Unlock the next phase when all tasks in the current phase are completed.
- Display a random fact from [uselessfacts.jsph.pl](https://uselessfacts.jsph.pl/random.json) when all phases are completed.

## Installation

To run this project on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:andrejd1/oakslab_assignment.git
   cd startup-progress-tracker
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to use the application.

## Usage

Start the application as described in the Installation section.
Create phases for your startup by specifying their names and adding tasks in /seeds/seed.ts.
Mark tasks as completed by clicking the checkboxes.
Reopen tasks if needed.
Progress is automatically stored in local storage for future sessions.
Unlock the next phase when all tasks in the current phase are completed.
When all phases are completed, a random fact will be displayed in a modal popup.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

This project was created as a sample application for educational purposes.
The random facts are fetched from [uselessfacts.jsph.pl](https://uselessfacts.jsph.pl/random.json).

## Contributors

[Thien Long Ngo](https://github.com/andrejd1)
Feel free to contribute, report issues, and suggest improvements to this project.
