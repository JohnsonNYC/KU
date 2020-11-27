import moment from 'moment';


/**
 * Task 1 -- Date formatting
 * 
 * Format the date from ISO 8601 format to: weekday, abbreviated month [space] 
 * day of month, year format.
 * 
 * For example, 
 *   "2020-03-08" --> "Friday, Mar 8, 2020"     
 *   "2021-10-18" --> "Monday, Oct 18, 2021"  
 * 
 * @param {String} date in ISO 8601 format
 * 
 * @returns {String} date in weekday, abbreviated month [space] day of month, 
 * year format.
 */
export function formatDate(date) {  

  return moment(date).format('dddd, MMM DD, YYYY')
    
};


/**
 * Task 2 -- Date filtering
 * 
 * Find all events occur before or after a given date. 
 * 
 * @param {Object[]} events. Note, you can find example events in `src/App/data/events.js`
 * @param {String} date in ISO 8601 format, to be used as reference point to find 
 * events that occur before or after this date.
 * @param {String} when. `when` will always be either "before" or "after". 
 * 
 * @returns {Object[]} List of events that occur before or after the given date. 
 */
export function filterEventsByDate(events, date, when) { 
  let parsedDateInput = moment(date).format("YYYY-MM-D")//'Year - Month - Day'
  let filteredEvents = events.filter((event) =>{
    if(when === "before"){
      return event.date < parsedDateInput
    }
    if(when === "after"){
      return event.date > parsedDateInput
    }
  })
  // Issue with test for filter after given date?
  // It expects an object with a date of January 2 but the input date is November 26 of the same year??

  // input =  2020-11-26 || November 26, 2020
  // expectFirstObject = Object {
    // -     "date": "2020-01-02", || January 2, 2020
    // -     "id": "event-2",
    // -     "name": "Remote Teaching Strategies",
    // -   }
    console.log(when)
    console.log(parsedDateInput)
    console.log(filteredEvents)
  return filteredEvents
};


/**
 * Task 3 -- Names of Tags
 * 
 * Find the names of tags that are associated with an event and return them in 
 * aphabetical order. If there are no tags for this event, return an empty array.
 * 
 * @param {Object} event
 * @param {Object[]} tags. Note, you can find example tags in `src/App/data/tags.js`
 * 
 * @returns {Object[]} Names of tags who are associated with the event in 
 * alphabetical order
 */
export function getNamesOfTags(event, tags) {
  let result = []
  const eventTagsArray = event.tags // event tags correspond to the tagsID
  eventTagsArray.forEach(eventTag => {
    tags.find(tag => {
      if(eventTag === tag.id){
        result.push(tag.name)
      }
    })
  })
  
  if(result.length !== 0 ){
    result.sort()
  }
  return result;
}


/**
 * Task 4 -- Calculate Statistics for a Tag
 * 
 * For the given tag find
 *   - eventCount: Total number of events with this tag (Integer) √
 *   - averageRegistration: Average number of registered users per event with this 
 *     tag. (String) √
 *      - This average should be a string that is a decimal representation to 
 *        the hundreth decimal place, ex. "22.27".√
 *      - Return null if tag is unused by any events. 
 *   - mostPopularEvent: Name of the most popular event with this tag. 
 *      - The "most popular event" is the event with the most registered users.
 *      - If there is a tie, break it by chosing the one that alpha numerically 
 *        comes first.
 *      - Return null if tag is unused by any events.
 * 
 * @param {Object[]} events
 * @param {Object} tag
 * 
 * @returns {Object} an object with the three tag statistics as keys: eventCount, 
 * averageRegistration, and mostPopularEvent. 
 */
export function calculateStatisticsForTag(events, tag) {

  let store = {
    eventCount: 0, 
    averageRegistration: null, 
    mostPopularEvent:null
  };
  
  let totalAttendees = 0;
  let maxNumberOfAttendees = 0;
  let popularEvent
  
  for(let event of events){
    // For each event
    if(event.tags.includes(tag.id)){// when the event matches the tag
      let eventSize = event.registeredUsers.length // number of participants to event 

      store.eventCount = (store.eventCount+=1) || 1 // increase everytime an event has a tag
      totalAttendees = totalAttendees += eventSize // sum of all users for events with this tag
      // 
      
      if(eventSize > maxNumberOfAttendees){ // if this event has more users than tracker
        popularEvent = event // update this tracker
        store.mostPopularEvent = event.name // update it with this one
        maxNumberOfAttendees = eventSize // update this tracker
      }else if(eventSize === maxNumberOfAttendees){ // if they are both equal 
        let sortIndicator = event.name.localeCompare(popularEvent.name) // pick the first alphabetically sorted item
        if(sortIndicator === 1){
          store.mostPopularEvent = popularEvent.name
        }else if(sortIndicator === -1){
          store.mostPopularEvent = event.name
        }
      }
      store.averageRegistration = (Math.round((totalAttendees/store.eventCount)*100)/100).toString();
    }
  }  
  return store;
} 
