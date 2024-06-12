# NEET ScoreCard Scrapping

This project scrapes NEET scorecards from the NTA website by sending API requests in batches of 31. The project continues to search for results within a user-defined range even after calculating a single result.

## Installation

First, install all the dependencies:

```bash
npm install
```
## Running the Program

To run the program, use:

```bash
npm run dev
```

## How It Works 

**API Requests in Batches:** The program sends API requests in batches of 31 to the NTA website. This is done using the solve function which constructs and sends the request.

**Handling Promises:** The requests are processed using promises. The responses are checked to see if they contain valid data.

**Continued Searching:** After calculating a single result, the program does not stop. It continues to search for other roll numbers within the specified range.

**User-Defined Range:** The user can specify a range of roll numbers to search for results. The program will find all results within this range.