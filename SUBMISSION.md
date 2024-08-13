# Nick Cook - TryHackMe Full-Stack Search

## Contents
- [Additional Technologies](#additional-technologieslibraries)
- [Instructions](#instructions)
- [Progress](#progress)
- [Performance Enhancements](#performance-enhancements)
- [Assumptions and Observations](#assumptions-and-observations)
- [Additional Tasks/What I'd do with more time](#additional-taskswhat-id-do-with-more-time)

## Additional Technologies/Libraries
- Axios
- Lodash.Debounce
- React Router DOM (v6)
- Vite TSConfig Paths
- MSW (Mock Service Worker)
- Prettier

## Instructions
All commands remain as provided from the original `package.json`:

### Running the client
`npm run start:client`

### Running the API
`npm run start:api`

### Running unit tests
`npm test`

## Progress
I believe all acceptance criteria have been achieved as stated in `README.md`.

**In addition**, I've also included unit tests for much of the application across:
- Utils,
- Rendering,
- User interaction.

## Performance Enhancements
With acceptance criteria placing an emphasis on *performant* search, I've implemented the following:

### Debounced search (via `lodash.debounce`):
- 500ms timeout
- Cancel additional search requests for keystrokes within timeout period (via `useEffect` cleanup)
- Optimise number of search requests sent/initiated

### Memoisation of debounce function:
  - Prevent recreation/use initially-created version on search term change and subsequent component re-renders

### AbortController:
  - At `useEffect` cleanup function, optimises memory utilisation and prevents memory leaks by aborting ongoing API requests on component unmount/navigation

### MongoDB projections:
  - Select subset of fields from fetched documents at search,
  - Select *all* fields at Hotel/Country/City pages


## Assumptions and Observations
- **Assumption:** I've made very few changes to *styling* across the application...
  - Whilst it wasn't stated in the acceptance criteria, I've specifically omitted since there aren't any requirements for exact UI designs and therefore content to base styling off
  - I've only made a couple of small-scale additions via Bootstrap utility classes
- **Assumption:** We would ideally like search term to show results for **country ISO code**...
  - For example: Search term _"BE"_ will show search result for country _"Belgium"_
- **Observation:** Country objects contain a string-type field called *country*...
  - Ideally, I'd have this field renamed on its model so as not to cause confusion within a codebase that deconstructs the field/property from instances of the object itself
  - For example: Where we might therefore have to reference `country.country` or `const { country } = country`
- **Observation:** There are currently no _ideal_ fields to use as SEO-minded URL slugs for the hotels...
  - Some hotel names contain commas, so can't directly be transformed to lowercase, kebab-cased URL slugs for the navigated page that displays their name on clicking an item in search results
  - In a real-world project, it'd be ideal to use a more SEO-friendly kebab-case URL slug in place of `hotels/:id`

## Additional Tasks/What I'd do with more time
### Add an error-handler class/library:
- To add logging operations and single location for deconstruction of error _messages_ from thrown errors (where currently detecting regular errors versus Axios errors).

### Add 404 page/Error Boundary:
- To manage scenario of navigation to hotel/country/city pages missing ID or referencing an invalid ID slug.

### Investigate shared Hotel/Country/City page component:
- Currently, these pages are almost exactly the same, with exception of their URL's and object referencing,
- There may be a smarter way to prevent repetition of much of their currently-identical fetching logic (which creates multiple touch points should some of this change and impact all of them).