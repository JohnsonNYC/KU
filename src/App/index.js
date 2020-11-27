import React, { useState } from 'react';

import dataEvents from './data/events';
import dataTags from './data/tags';

import {
  formatDate,
  filterEventsByDate,
  getNamesOfTags,
  calculateStatisticsForTag,
} from '../tasks';


const whenOptions = { AFTER: 'after', BEFORE: 'before' };
const pageOptions = { EVENTS: 'events', TAG_STATISTICS: 'tagsStatistics' };

const EventsDashboard = () => {
  const [when, setWhen] = useState(whenOptions.AFTER);
  const [page, setPage] = useState(pageOptions.EVENTS);
  const [events, setEvents] = useState(filterEventsByDate(dataEvents, Date.now(), whenOptions.AFTER));

  const onBeforeClicked = () => {
    setWhen(whenOptions.BEFORE);
    setEvents(filterEventsByDate(dataEvents, Date.now(), whenOptions.BEFORE));
  };

  const onAfterClicked = () => {
    setWhen(whenOptions.AFTER);
    setEvents(filterEventsByDate(dataEvents, Date.now(), whenOptions.AFTER));
  };

  return (
    <div className="AppSync container">
      <div className="page-header linksContainer">
          <div
            className={`link ${page === pageOptions.EVENTS ? 'activeLink' : 'inactiveLink'}` }
            onClick={() => setPage(pageOptions.EVENTS)}
          >Events</div>
          <div
            className={`link ${page === pageOptions.TAG_STATISTICS ? 'activeLink': 'inactiveLink'}` }
            onClick={() => setPage(pageOptions.TAG_STATISTICS)}
          >Insights</div>
      </div>
      {page === pageOptions.EVENTS && (
        <div className="pageContainer">
          <div className="dateButtonsContainer">
              <button 
                className={when === whenOptions.BEFORE ? 'activeButton' : 'inactiveButton'}
                onClick={onBeforeClicked}
              ><i className="fas fa-chevron-left smallIconLeft"></i>Past Events</button>
              <button 
                className={when === whenOptions.AFTER ? 'activeButton' : 'inactiveButton'}
                onClick={onAfterClicked}
              >Future Events<i className="fas fa-chevron-right smallIconRight"></i></button>
          </div>
          {(events || []).length ? (
            <div >
              {events.map(event => {
                const eventTags = getNamesOfTags(event, dataTags);
                return (
                  <div className="eventCard" key={`event-${event.name}`}>
                    <div className="cardHeader">
                      <i className="fas fa-calendar-day cardHeaderIcon"></i>
                      <h3>{event.name}</h3>
                    </div>
                    <p>{formatDate(event.date)}</p>
                    <p>{`${event.registeredUsers.length} registered users`}</p>
                    <div className="pillContainer">
                      {eventTags.map(tagName => (
                        <span className="tagPill" key={`tag-pill-${tagName}`}>
                          <i className="fas fa-tag smallIconLeft"></i>
                          {tagName}
                        </span>
                      ))}
                    </div>
                  </div>);
              })}
            </div>
          ) : (
            <div className="info">
              <span>
                <i className="fas fa-info-circle smallIconLeft"></i>
                There are no events for this time period.
              </span>
            </div>
          )}
        </div>)}
      {page === pageOptions.TAG_STATISTICS && (
        <div className="pageContainer">
          {dataTags.map(tag => {
            const statistics = calculateStatisticsForTag(dataEvents, tag);
            const eventCount = statistics.eventCount || '???';
            const averageRegistration = statistics.averageRegistration || '???';
            const mostPopularEvent = statistics.mostPopularEvent || '???';

            return (
              <div key={`tag-${tag.id}`} className="tagStatisticsCard">
                <div className="cardHeader">
                  <i className="fas fa-tag cardHeaderIcon"></i>
                  <h3>{tag.name}</h3>
                </div>
                <p><strong>{eventCount}</strong>{` event${eventCount === 1 ? ' uses' : 's use'} this tag`}</p>
                <p><strong>{averageRegistration}</strong> average registered users per event with this tag</p>
                <p><strong>{mostPopularEvent}</strong> is the most popular event with this tag</p>
              </div>
            );
          })}
        </div>)}
    </div>
  );
};

export default EventsDashboard;
