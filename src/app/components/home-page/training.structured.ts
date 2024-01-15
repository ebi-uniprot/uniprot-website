import { WithContext, Consortium, Course, Event, Graph } from 'schema-dts';

import parseDate from '../../../shared/utils/parseDate';

import { PayloadEBISearch } from './NeedHelp';

export const isCourseOnsite = (
  location?: PayloadEBISearch['entries'][0]['fields']['location']
) => !!location?.[0] && location[0] !== 'Online';

const dataToSchema = (
  data: PayloadEBISearch['entries'][0]
): WithContext<Course> | Graph | undefined => {
  const title = `${data.fields.title}${
    data.fields.subtitle[0] ? ` - ${data.fields.subtitle[0]}` : ''
  }`;
  const url = data?.fieldURLs.find(({ name }) => name === 'main')?.value || '';
  const venue = data?.fields.venue[0];
  const location = data?.fields.location[0];

  const organiser: Consortium = {
    // TODO: reference to the consortium markup from the footer
    '@type': 'Consortium',
    name: 'UniProt consortium',
    url: 'https://www.uniprot.org',
  };

  let event: Event | undefined;
  if (data.source === 'ebiweb_training_events') {
    const startDate = parseDate(data.fields.start_date[0]);
    const endDate = parseDate(data.fields.end_date[0]);
    event = {
      '@type': 'Event',
      '@id': `training-event-${data.id}`,
      name: title,
      startDate:
        startDate &&
        `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`,
      endDate:
        endDate &&
        `${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getDate()}`,
      description: data.fields.description,
      eventAttendanceMode: `https://schema.org/${
        venue === 'Online' ? 'On' : 'Off'
      }lineEventAttendanceMode` as const,
      organizer: organiser,
      location:
        location === 'Online'
          ? {
              '@type': 'VirtualLocation',
              name: title,
              url,
            }
          : {
              '@type': 'Place',
              name: venue,
              address: {
                '@type': 'PostalAddress',
                addressCountry: data.fields.country[0],
                addressLocality: data.fields.city[0],
              },
            },
    };
  }

  const course: Course = {
    '@type': 'Course',
    name: title,
    description: data.fields.description,
    url,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      '@id': event?.['@id'] || undefined,
      courseMode: isCourseOnsite(data.fields.location) ? 'Onsite' : 'Online',
      courseWorkload: 'PT1H',
    },
    provider: organiser,
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'GBP',
      category: 'Free',
    },
  };

  if (event) {
    return {
      '@context': 'https://schema.org',
      '@graph': [course, event],
    };
  }

  return {
    '@context': 'https://schema.org',
    ...course,
  };
};

export default dataToSchema;
