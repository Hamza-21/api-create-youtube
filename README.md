## Backend Task | FamPay

### Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of the publishing date-time from YouTube for a given search query in paginated response

<details>
  <summary> <h3> Basic Functionalities </h3> </summary>

- Cron job that calls the YouTube API continuously in background (async) with a 10s interval for fetching the latest videos for a predefined search query and stores the data of videos in the mongoDB database with queried collections.
- A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
- A basic search API to search the stored videos using their title and description.
</details>

### Development

1. Clone the project

`git clone https://github.com/Hamza-21/backend-fampay-task.git`

2. Specify ENV variables in .env file

```
API_KEY=''
DB_CONNECTION=
QUERY=
```

3. Install dependencies

`npm install`

4. Run the application

`npm start`

### Running with Docker Compose

When using Docker Compose, 

1. Create a `.env` file using the instructions mentioned above
2. Set the `MONGODB_URI` environment variable in your `.env` file to

```
MONGODB_URI = mongodb://mongo:27017
```
3. Run:

```
docker-compose up -d
```
## Your server will be running on 
```
http://localhost:3000/videos
```

## How to use the API

#### GET all stored videos with a paginated response and a specific nuumber of results
```
http://localhost:3000/videos?page=1&limit=5

This will GET all the videos stored in the database at page 1 and with limit 5
```

#### Search from the stored videos of the queried database by either title or description
```
http://localhost:3000/videos/${QUERY}

Eg: - http://localhost:3000/videos/cricket will search for cricket in title and description of the database specified
```

#### The Responses can also be paginated in the same way i.e. by adding a query 

```
http://localhost:3000/videos/cricket?page=2&limit=5
```
