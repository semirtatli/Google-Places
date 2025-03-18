## Setup Project


* Configure application.properties
* Configure .env files
* Configure pom.xml

Build & Run docker



From the terminal run command:

* `docker-compose up --build`



## API ENDPOINTS
---
### REQUESTS
**Request**

* #### GET   `/places`

Example GET request

`http://localhost:8070/places?longitude=-69.1526&latitude=102.154&radius=250`

**Expected Response**

`Google Places API (102.154, -69.1526, 250`
