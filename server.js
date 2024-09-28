const express = require("express"); // Import Express framework
const bodyParser = require("body-parser"); // Import body-parser middleware
const fs = require("fs-extra"); // Import fs-extra for file operations

require("dotenv").config(); // Load environment variables from .env file

const app = express(); // Create an Express app
const PORT = 3000; // Define the port number
const DATA_FILE = "requests.json"; // File to store requests

app.use(bodyParser.json()); // Middleware to parse JSON requests

// Function to read data from the JSON file
const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8"); // Read file
    return JSON.parse(data); // Parse and return JSON data
  } catch (error) {
    console.error("Error reading data:", error);
    return []; // Return an empty array if there's an error
  }
};

// Function to write data to the JSON file
const writeData = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2)); // Write JSON data
  } catch (error) {
    console.error("Error writing data:", error);
  }
};

// Endpoint to add a new service request
app.post("/requests", async (req, res) => {
  const { guestName, roomNumber, requestDetails, priority } = req.body;
  const requests = await readData(); // Get current requests

  const id = (requests.length + 1).toString(); // Generate a new ID
  const newRequest = {
    id,
    guestName,
    roomNumber,
    requestDetails,
    priority,
    status: "received",
  };

  requests.push(newRequest); // Add new request to the list
  await writeData(requests); // Save updated requests

  res.status(201).json(newRequest); // Respond with the new request
});

// Endpoint to retrieve all requests, sorted by priority
app.get("/requests", async (req, res) => {
  const requests = await readData(); // Get current requests
  const sortedRequests = requests.sort((a, b) => a.priority - b.priority); // Sort by priority
  res.json(sortedRequests); // Respond with sorted requests
});

// Endpoint to retrieve a specific request by ID
app.get("/requests/:id", async (req, res) => {
  const requests = await readData(); // Get current requests
  const request = requests.find((r) => r.id === req.params.id); // Find request by ID

  if (request) {
    res.json(request); // Respond with the found request
  } else {
    res.status(404).json({ message: "Request not found" }); // Respond with error if not found
  }
});

// Endpoint to update a specific request
app.put("/requests/:id", async (req, res) => {
  const requests = await readData(); // Get current requests
  const index = requests.findIndex((r) => r.id === req.params.id); // Find index of request

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" }); // Not found error
  }

  // Update the request details
  requests[index] = { ...requests[index], ...req.body };
  await writeData(requests); // Save updated requests

  res.json(requests[index]); // Respond with updated request
});

// Endpoint to delete a specific request
app.delete("/requests/:id", async (req, res) => {
  const requests = await readData(); // Get current requests
  const index = requests.findIndex((r) => r.id === req.params.id); // Find index of request

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" }); // Not found error
  }

  requests.splice(index, 1); // Remove the request
  await writeData(requests); // Save updated requests

  res.status(204).send(); // Respond with no content
});

// Endpoint to mark a request as completed
app.post("/requests/:id/complete", async (req, res) => {
  const requests = await readData(); // Get current requests
  const index = requests.findIndex((r) => r.id === req.params.id); // Find index of request

  if (index === -1) {
    return res.status(404).json({ message: "Request not found" }); // Not found error
  }

  requests[index].status = "completed"; // Update status
  await writeData(requests); // Save updated requests

  res.json(requests[index]); // Respond with updated request
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log the running server
});
