# Event Pass

## Description
A website for events made using seakgeek API. Some features of this website are:
- Event Discovery : Discover events near you
- Search Events: Search for events by name or location
- Event Recommendation: Find similar events
- Calendar View: View Events on a calendar
- Pagination: Pagination for Events

## API Documenation:
```
https://platform.seatgeek.com/
```

## Generate token for API:
```
https://seatgeek.com/account/develop
```

## Run locally

Set up a .env file in local directory and set the below parameters:
```
SEATGEEK_CLIENT_ID=NDA2....
SEATGEEK_SECRET_TOKEN=07e67....
```

Run the below command to start server:
```
npm start
```
The above command starts the server on `localhost:3000`

Run test cases:
```
npm test
```
