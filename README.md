## Setup Project

* Create your Database
* Configure application.properties
* Configure pom.xml

For caching I used **Redis** I run it on Docker 

From the terminal run command:
* `docker run --name redis -p 6379:6379 -d redis`

Test if Redis works
`docker exec -it redis redis-cli ping`
The response should be "PONG"

* Run the project

## API ENDPOINTS
---
### REQUESTS
**Request**

* #### GET   `/places`

Example GET request

`http://localhost:8070/places?longitude=-69.1526&latitude=102.154&radius=250`

**Expected Response**

`Google Places API (102.154, -69.1526, 250`
