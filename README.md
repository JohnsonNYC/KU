# Coding Assessment 

_Table of Contents_

- [Overview](#overview)
- [Event Tracking App](#event-tracking-app)
  - [Schema of Data](#schema-of-data)
- [What We're Looking For](#what-were-looking-for)
- [App Requirements and Setup](#app-requirements-and-setup)
- [App Usage](#app-usage) 
- [Hints](#hints)

# Overview
Hello and welcome to KickUp's coding assessment! We're glad you're willing to give this a whirl!

We're asking you to complete this assessment so that we can get a sense of your coding and problem solving abilities.

After you're finished, even if you don't have every last piece completed, please submit what you have!


# Event Tracking App

This app tracks events and the number of users registered for these events. Events are categorized by tags which can be used to gain insights about event categories and registration demand. 

The assessment is made up of four tasks that help create functionality for this small React app. 

Each task defined in `src/tasks.js` can be accomplished by implementing a stubbed function that takes predefined arguments. 

We've supplied unit tests in the file `src/tasks.test.js` which should help you understand whether your implementation is behaving as expected. You'll know that a task is complete when all the tests for that task pass!

We've also prebuilt a UI which invokes each of the functions to give you the option to visualize what you're creating. **Note**: You do not need to change any files in the `App` directory, that's just there to power this UI.

As you complete tasks the UI will progressively enhance. For example, here's a look at the *Events View* before and after.

### Events View before you've completed tasks 1-3
See: `readme_images/events-before.png`

### Events View after you've completed tasks 1-3
See: `readme_images/events-after.png`

After you've completed tasks 1-3
- the date will be formatted nicely
- the before and after toggle will filter events correctly
- the correct tags will appear for each event

The *Insights View* also enhances as you complete task 4 to display statistics about each tag.

## Schema of data

This is an overview of the data and its relationships:
```
Event
- id: String
- name: String
- date: String in ISO 8601 format (yyyy-mm-dd)
- registeredUsers: an array of User ids*
- tags: an array of Tag ids*

User
- id: String
- name: String

Tag
- id: String
- name: String
```
*\*Notes*: 
- You can assume there will be no duplicate ids in the registeredUsers array or the tags array.
- You can find example data for each of these models in `src/App/data/`.


# What We’re Looking For
We’ll be reviewing the submission with the following expectations:

- The code should be cleanly written, easy to read, and well organized.
- The tests should pass, but having a couple failing tests isn't a disqualifier if the code is otherwise well-factored and easy to understand.


# App Requirements and Setup

To be able to run the app and test suite you'll first need to have the following installed:
- `node` 6.9.2 or greater
- `npm` 3.10.9 or greater

To setup the environment install all dependencies:
```bash
npm install
```

# App Usage
To run the test suite:
```bash
npm test
```

To run the app:
```bash
npm start
```
This runs the React app, which provides a helpful UI for you to visualize what you are creating. Located at http://localhost:3000 or similar port.


# Hints

Here's some hints to help guide you. Best of luck!
- You only need to edit files in `src/tasks.js` to complete the tasks. Your final submission **should not** modify any other file! 
- When your tasks pass the tests (in `src/tasks.test.js`) the UI should automatically work.
- Working with dates is notoriously tricky. For tasks 1 and 2 we strongly recommend that you use a library to deal with time. 
   
   We recommended that you use the `moment` library for [string formatting](https://momentjs.com/docs/#/displaying/) and for [querying](https://momentjs.com/docs/#/query/).

   It's already part of `package.json`, so to use it, you'll just need to import it in `src/tasks.js`: 
   ```JavaScript
   import moment from 'moment';
   ```
- Reminder: You don't need to pass all the tests to pass this coding assessment. Please submit your solution even if it's only partially working.