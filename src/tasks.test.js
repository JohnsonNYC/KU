import {
  calculateStatisticsForTag,
  formatDate,
  filterEventsByDate,
  getNamesOfTags,
} from './tasks';


describe('Task 1 -- formatDate', () => {
  it('should format month, day, year correctly', () => {
    const date = '2020-02-22';
    const expectedMonthDayYearFormat = 'Feb 22, 2020';

    const resultDate = formatDate(date);
    expect(resultDate.includes(expectedMonthDayYearFormat)).toEqual(true);
  });

  it('should format day of week correctly in addition to month, day, year', () => {
    const date = '2021-03-17';
    const expectedDateFormat = 'Wednesday, Mar 17, 2021';

    const resultDate = formatDate(date);
    expect(resultDate).toEqual(expectedDateFormat);
  });
});

describe('Task 2 -- filterEventsByDate', () => {
  it('should filter events before a given date', () => {
    const when = 'before';
    const date = '2019-11-29';
    const otherEvents = [
      { id: 'event-3', name: 'coaching session', date: '2020-10-21' },
    ];
    const expectedEvents = [
      { id: 'event-1', name: 'Blended Learning Training', date: '2019-10-21' },
      { id: 'event-2', name: 'Remote Teaching Strategies', date: '2019-06-01' },
    ];
    const allEvents = expectedEvents.concat(otherEvents);

    const resultEvents = filterEventsByDate(allEvents, date, when)
    expect(resultEvents).toEqual(expectedEvents);
  });

  it('should filter events after a given date', () => {
    const when = 'after';
    const date = '2020-01-01';
    const otherEvents = [
      { id: 'event-3', name: 'coaching session', date: '2019-11-11' },
    ];
    const expectedEvents = [
      { id: 'event-1', name: 'Blended Learning Training', date: '2020-02-19' },
      { id: 'event-2', name: 'Remote Teaching Strategies', date: '2020-01-02' },
    ];
    const allEvents = expectedEvents.concat(otherEvents);

    const resultEvents = filterEventsByDate(allEvents, date, when)
    expect(resultEvents).toEqual(expectedEvents);
  });
});
  
describe('Task 3 -- getNamesOfTags', () => {
  const tags = [
    { id: 'tag-1', name: 'STEM'},
    { id: 'tag-2', name: 'First Year Teachers'},
    { id: 'tag-3', name: 'Fostering Curiousity'},
  ];

  it('should return names of tags for an event', () => {
    const event = { 
      id: 'event-1', 
      name: 'Blended Learning Training', 
      tags: [
        'tag-2',
        'tag-3',
      ],
    };
    const expectedTags = [
      'First Year Teachers',
      'Fostering Curiousity',
    ]
    
    const resultTags = getNamesOfTags(event, tags);
    expect(resultTags).toEqual(expectedTags);
  });

  it('should return names that are alphabetically sorted', () => {
    const event = { 
      id: 'event-1', 
      name: 'Blended Learning Training', 
      tags: [
        'tag-1',
        'tag-2',
      ],
    };
    const expectedTags = [
      'First Year Teachers',
      'STEM',
    ];

    const resultTags = getNamesOfTags(event, tags);
    expect(resultTags).toEqual(expectedTags);
  });

  it('should return an empty array if the event has no tags', () => {
    const event = { 
      id: 'event-1', 
      name: 'Blended Learning Training', 
      tags: []
    };
    const expectedTags = [];

    const resultTags = getNamesOfTags(event, tags);
    expect(resultTags).toEqual(expectedTags);
  });
});

describe('Task 4 -- Calculate Statistics for a Tag', () => {
  const events = [
    { 
      id: 'event-1', 
      name: 'Zoom Workshop', 
      registeredUsers: ['user-1', 'user-2', 'user-2', 'user-4', 'user-5', 'user-6'],
      tags: ['tag-3'], 
    },
    { 
      id: 'event-2', 
      name: 'Remote Learning 404',  
      registeredUsers: ['user-1', 'user-2', 'user-2', 'user-4', 'user-5'],
      tags: ['tag-1'], 
    },
    { 
      id: 'event-3', 
      name: 'Digital Citizenship Workshop -- Part 2', 
      registeredUsers: ['user-1', 'user-2', 'user-2'],
      tags: [],
    },
    { 
      id: 'event-4', 
      name: 'Digital Citizenship Workshop',
      registeredUsers: ['user-1', 'user-2', 'user-2', 'user-4', 'user-5'],
      schoolId: 'school-01', 
      tags: ['tag-0', 'tag-1'], 
    },
    { 
      id: 'event-5', 
      name: 'Remote Teaching Training', 
      registeredUsers: ['user-1', 'user-2', 'user-2', 'user-4', 'user-5', 'user-6'],
      tags: ['tag-0', 'tag-1', 'tag-2', 'tag-3'], 
    },

  ];

  it('should return an object with all the expected keys', () => {
    const tag = {
      id: 'tag-10',
      name: 'Music',
    };
  
    const resultStatistics = calculateStatisticsForTag(events, tag);
    expect(resultStatistics.hasOwnProperty('eventCount')).toEqual(true);
    expect(resultStatistics.hasOwnProperty('averageRegistration')).toEqual(true);
    expect(resultStatistics.hasOwnProperty('mostPopularEvent')).toEqual(true);
  });

  it('should return appropriate defaults for each key if no events are associate with the tag', () => {
    const tag = {
      id: 'tag-10',
      name: 'Music',
    };
    const expectedStatistics = {
      eventCount: 0,
      averageRegistration: null,
      mostPopularEvent: null,
    };
  
    const resultStatistics = calculateStatisticsForTag(events, tag);
    expect(resultStatistics.eventCount).toEqual(expectedStatistics.eventCount);
    expect(resultStatistics.averageRegistration).toEqual(expectedStatistics.averageRegistration);
    expect(resultStatistics.mostPopularEvent).toEqual(expectedStatistics.mostPopularEvent);
  });

  it('should return total number of events associated with the tag', () => {
    const tag = {
      id: 'tag-1',
      name: 'Online Teaching',
    };
    const expectedStatistics = {
      eventCount: 3,
      averageRegistration: '5.33',
      mostPopularEvent: 'Remote Teaching Training',
    };
  
    const resultStatistics = calculateStatisticsForTag(events, tag);
    expect(resultStatistics.eventCount).toEqual(expectedStatistics.eventCount);
  });

  it('should return average number of registered users for events associated with the tag', () => {
    const tag = {
      id: 'tag-1',
      name: 'Online Teaching',
    };
    const expectedStatistics = {
      eventCount: 3,
      averageRegistration: '5.33',
      mostPopularEvent: 'Remote Teaching Training',
    };
  
    const resultStatistics = calculateStatisticsForTag(events, tag);
    expect(resultStatistics.averageRegistration).toEqual(expectedStatistics.averageRegistration);
  });

  it('should return the name of the most popular event associated with the tag', () => {
    const tag = {
      id: 'tag-1',
      name: 'Online Teaching',
    };
    const expectedStatistics = {
      eventCount: 3,
      averageRegistration: '5.33',
      mostPopularEvent: 'Remote Teaching Training',
    };
  
    const resultStatistics = calculateStatisticsForTag(events, tag);
    expect(resultStatistics.mostPopularEvent).toEqual(expectedStatistics.mostPopularEvent);
  });

  it('should return the event name that comes first alpha numerically, when there is a tie of the most popular event associated with the tag, ', () => {
    const tag = {
      id: 'tag-3',
      name: 'Pine School',
    };
    const expectedStatistics = {
      eventCount: 2,
      averageRegistration: '6.00',
      mostPopularEvent: 'Remote Teaching Training',
    };
  
    const resultStatistics = calculateStatisticsForTag(events, tag);
    expect(resultStatistics.mostPopularEvent).toEqual(expectedStatistics.mostPopularEvent);
  });
});
