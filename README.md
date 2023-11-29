# Mock Server for your Awesome Application
This is a simple mock server built with Express and TypeScript to simulate API responses for your awesome application. It allows you to define custom responses for different endpoints and HTTP methods, and it falls back to default responses when specific responses are not found.

## Getting Started
1. Clone the Repository:
```bash
git clone https://github.com/whopper1962/whopper-server-2.git
cd whopper-server-2
```

2. Install Dependencies:
```bash
npm install
```
3. Define Responses:
Place your response JSON files in the response directory. You can create specific response files for each HTTP method in the format HTTP_METHOD.json (e.g., GET.json, POST.json).

If you want to set default responses for all HTTP methods, create a default.json file in the corresponding endpoint directory (e.g., /response/api/members/default.json).

The default response configuration can be defined in /config/response.config.json. If no specific response is found, the server will use the default configuration.

4. Run the Server:

```bash
npm run serve
```
The server will be running at http://localhost:3000.

## Usage
Make HTTP requests to the server as you would to a real API. For example, if your application sends a GET request to http://localhost:3000/api/members, the mock server will respond with the contents of response/api/members/GET.json or the default configuration if not found.

### Example Request (using Axios):
```javascript
import axios from 'axios';

axios.get('http://localhost:3000/api/members')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```
Supported HTTP Methods:
- GET
- POST
- PUT
- PATCH
- DELETE

## Configuration
You can customize the default responses for each HTTP method in the /config/response.config.json file.

