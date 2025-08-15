# User Registration Endpoint

## Endpoint

POST /user/register

## Description

Registers a new user and returns an authentication token plus the created user record. Request body must include a fullname object (with firstname required), email, and password. Validation is applied on the incoming fields.

## Request Headers

- Content-Type: application/json

## Request Body (JSON)

```json
{
  "fullname": {
    "firstname": "John", // required, string, min length 3
    "lastname": "Doe" // optional, string, min length 3 if provided
  },
  "email": "john@example.com", // required, valid email
  "password": "secret123" // required, string, min length 6
}
```

## Validation Rules

- fullname.firstname: required, string, minimum 3 characters
- fullname.lastname: optional, string, minimum 3 characters if present
- email: required, must be a valid email address
- password: required, minimum 6 characters

(These rules are enforced via express-validator and the Mongoose schema.)

## Success Response

- Status: 201 Created
- Body (JSON):

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

## Error Responses

- 400 Bad Request — Validation errors or missing fields

```json
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" },
    ...
  ]
}
```

- 409 Conflict — Email already registered (duplicate key)

```json
{
  "error": "Email already in use"
}
```

- 500 Internal Server Error — Unexpected server/database error

```json
{
  "error": "Internal server error"
}
```

## Example cURL

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
```
