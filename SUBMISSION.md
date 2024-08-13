# Nick Cook - TryHackMe Full-Stack Search

## Contents
- [Additional Technologies](#additional-technologies)
- [Instructions](#instructions)
- [Progress](#progress)
- [Performance Enhancements](#performance-enhancements)

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

