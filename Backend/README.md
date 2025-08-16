# User Registration & Login Endpoints

## POST /user/register

Description
- Registers a new user and returns an authentication token plus the created user record.

Request Headers
- Content-Type: application/json

Request Body (JSON)
```json
{
  "fullname": {
    "firstname": "John", // required, string, min length 3
    "lastname": "Doe"    // optional, string, min length 3 if provided
  },
  "email": "john@example.com", // required, valid email
  "password": "secret123"      // required, string, min length 6
}
```

Validation Rules
- fullname.firstname: required, string, minimum 3 characters
- fullname.lastname: optional, string, minimum 3 characters if present
- email: required, must be a valid email address
- password: required, minimum 6 characters

Success Response
- Status: 201 Created
- Body:
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "<USER_ID>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketId": null
  }
}
```

Error Responses
- 400 Bad Request — Validation errors or missing fields
- 409 Conflict — Email already registered (duplicate key)
- 500 Internal Server Error — Unexpected server/database error

Example cURL
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "password": "secret123"
  }'
```

## GET /user/profile

Description
- Returns the authenticated user's profile information
- Protected route - requires valid JWT token

Request Headers
- Authorization: Bearer <JWT_TOKEN>

Success Response
- Status: 200 OK
- Body:
```json
{
  "user": {
    "_id": "<USER_ID>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

Error Responses
- 401 Unauthorized - Invalid/missing token
```json
{
  "message": "No token, authorization denied"
}
```
- 403 Forbidden - Token blacklisted/expired
```json
{
  "message": "Token is not valid"
}
```

Example cURL
```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## GET /user/logout

Description
- Logs out the user by invalidating their JWT token
- Protected route - requires valid JWT token
- Clears the token cookie and adds token to blacklist

Request Headers
- Authorization: Bearer <JWT_TOKEN>
- Cookie: token=<JWT_TOKEN> (optional)

Success Response
- Status: 200 OK
- Body:
```json
{
  "message": "Logged out successfully"
}
```

Error Responses
- 401 Unauthorized - Invalid/missing token
```json
{
  "message": "No token, authorization denied"
}
```
- 500 Internal Server Error - Failed to blacklist token

Example cURL
```bash
curl -X GET http://localhost:3000/user/logout \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  --cookie "token=<JWT_TOKEN>"
```

## POST /user/login

Description
- Authenticates user credentials and returns JWT token
- Sets token in cookies and response body

Request Headers
- Content-Type: application/json

Request Body
```json
{
  "email": "john@example.com",    // required
  "password": "secret123"         // required
}
```

Validation Rules
- email: must be valid email format
- password: minimum 6 characters

Success Response
- Status: 200 OK
- Sets Cookie: token=<JWT_TOKEN>
- Body:
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "<USER_ID>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

Error Responses
- 400 Bad Request - Validation errors
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
- 401 Unauthorized - Invalid credentials
```json
{
  "message": "Invalid credentials"
}
```
- 404 Not Found - User not found
```json
{
  "message": "User not found"
}
```

Example cURL
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secret123"
  }'
```

# Captain Registration Endpoint

## POST /captain/register

**Description:**  
Registers a new captain (driver) with personal and vehicle details.

**Request Headers:**  
- Content-Type: application/json

**Request Body Example:**
```json
{
  "fullname": {
    "firstname": "Jane",      // required, min 3 chars
    "lastname": "Smith"       // optional, min 3 chars
  },
  "email": "jane@captain.com", // required, valid email
  "password": "secret123",     // required, min 6 chars
  "vehicle": {
    "color": "Black",          // required, min 3 chars
    "plate": "XYZ123",         // required, min 3 chars
    "capacity": 4,             // required, min 1
    "vehicleType": "car"       // required, one of: car, motorcycle, auto
  }
}
```

**Validation Rules:**
- `fullname.firstname`: required, min 3 characters
- `email`: required, valid email
- `password`: required, min 6 characters
- `vehicle.color`: required, min 3 characters
- `vehicle.plate`: required, min 3 characters
- `vehicle.capacity`: required, integer ≥ 1
- `vehicle.vehicleType`: required, must be "car", "motorcycle", or "auto"

**Success Response:**  
- Status: 201 Created
- Body:
```json
{
  "success": true,
  "data": {
    "_id": "<CAPTAIN_ID>",
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@captain.com",
    "vehicle": {
      "color": "Black",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Responses:**
- 400 Bad Request — Validation errors or missing fields
- 409 Conflict — Email already registered
- 500 Internal Server Error — Unexpected error

**Example cURL:**
```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane@captain.com",
    "password": "secret123",
    "vehicle": {
      "color": "Black",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```
