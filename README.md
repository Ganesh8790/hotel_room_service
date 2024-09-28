# Hotel Room Service Request API

## Overview

This is a simple RESTful API designed to manage and prioritize hotel room service requests. It uses Node.js with Express and stores data temporarily in a JSON file.

## Features

- Create, update, retrieve, and delete room service requests.
- Prioritize requests based on urgency.
- Temporary storage using a JSON file (`requests.json`).

## Technologies Used

- Node.js
- Express.js
- fs-extra (for file operations)

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- npm (Node package manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/hotel-room-service-api.git
   cd hotel-room-service-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `requests.json` file**:
   In the root of the project, create an empty file named `requests.json`:

   ```bash
   touch requests.json
   ```

4. **Run the API**:

   ```bash
   node server.js
   ```

   The server will start running on `http://localhost:3000`.

## API Endpoints

### 1. Add a New Service Request

- **POST** `/requests`
- **Request Body:**
  ```json
  {
    "guestName": "John Doe",
    "roomNumber": 101,
    "requestDetails": "Extra towels, please.",
    "priority": 1
  }
  ```
- **Response:**
  - Status: `201 Created`
  - Body:
    ```json
    {
      "id": "1",
      "guestName": "John Doe",
      "roomNumber": 101,
      "requestDetails": "Extra towels, please.",
      "priority": 1,
      "status": "received"
    }
    ```

### 2. Retrieve All Requests

- **GET** `/requests`
- **Response:**
  - Status: `200 OK`
  - Body:
    ```json
    [
      {
        "id": "1",
        "guestName": "John Doe",
        "roomNumber": 101,
        "requestDetails": "Extra towels, please.",
        "priority": 1,
        "status": "received"
      },
      ...
    ]
    ```

### 3. Retrieve a Specific Request by ID

- **GET** `/requests/{id}`
- **Response:**
  - Status: `200 OK` if found, `404 Not Found` if not found
  - Body:
    ```json
    {
      "id": "1",
      "guestName": "John Doe",
      "roomNumber": 101,
      "requestDetails": "Extra towels, please.",
      "priority": 1,
      "status": "received"
    }
    ```

### 4. Update a Specific Request

- **PUT** `/requests/{id}`
- **Request Body:**
  ```json
  {
    "guestName": "Jane Doe",
    "roomNumber": 102,
    "requestDetails": "Need fresh bedsheets.",
    "priority": 2
  }
  ```
- **Response:**
  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": "1",
      "guestName": "Jane Doe",
      "roomNumber": 102,
      "requestDetails": "Need fresh bedsheets.",
      "priority": 2,
      "status": "received"
    }
    ```

### 5. Delete a Specific Request

- **DELETE** `/requests/{id}`
- **Response:**
  - Status: `204 No Content` if successful, `404 Not Found` if not found

### 6. Mark a Request as Completed

- **POST** `/requests/{id}/complete`
- **Response:**
  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": "1",
      "guestName": "John Doe",
      "roomNumber": 101,
      "requestDetails": "Extra towels, please.",
      "priority": 1,
      "status": "completed"
    }
    ```

## Testing the API with Postman

You can test the API using Postman. Below are the steps to perform various API operations:

### 1. Add a New Request

- **Method**: `POST`
- **URL**: `http://localhost:3000/requests`
- **Body**: Select `raw` and choose `JSON` from the dropdown. Enter the following JSON:
  ```json
  {
    "guestName": "John Doe",
    "roomNumber": 101,
    "requestDetails": "Extra towels, please.",
    "priority": 1
  }
  ```

### 2. Retrieve All Requests

- **Method**: `GET`
- **URL**: `http://localhost:3000/requests`

### 3. Retrieve a Specific Request by ID

- **Method**: `GET`
- **URL**: `http://localhost:3000/requests/1`

### 4. Update a Specific Request

- **Method**: `PUT`
- **URL**: `http://localhost:3000/requests/1`
- **Body**: Select `raw` and choose `JSON` from the dropdown. Enter the following JSON:
  ```json
  {
    "guestName": "Jane Doe",
    "roomNumber": 102,
    "requestDetails": "Need fresh bedsheets.",
    "priority": 2
  }
  ```

### 5. Delete a Specific Request

- **Method**: `DELETE`
- **URL**: `http://localhost:3000/requests/1`

### 6. Mark a Request as Completed

- **Method**: `POST`
- **URL**: `http://localhost:3000/requests/1/complete`
