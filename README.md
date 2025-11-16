# Story Splitter AI
Story Splitter AI is a utility that takes a user story or a text with detailed description of the feature
and decomposes it into structured JSON object.

## Getting started


## Endpoints

### [POST] /user-stories/split

Accept: application/json
```json
{
  "text": "A detailed description of the feature"
}
```

Produce: application/json
```json
{
  "epic": "Authentication",
  "tasks": [
    {
      "title": "Add sign-in form",
      "complexity": 2
    },
    {
      "title": "Implement password validation",
      "complexity": 1
    }
  ]
}
```

## Examples

### Example of a request to decompose a user story

Request: [POST] {{hostname}}/user-stories/split
```json
{
  "text": "As a registered user I want to securely log in to the website using my email and password so that I can access my personalized dashboard and protected features. The authentication feature allows users to log in, log out, and maintain an active session. The system must validate credentials, handle incorrect login attempts, and enforce security best practices such as password hashing, rate limiting, and optional multi-factor authentication."
}
```

Response:
```json
{
    "epic": "User Authentication Feature",
    "tasks": [
        {
            "title": "Implement login functionality with email and password",
            "complexity": 5
        },
        {
            "title": "Create session management for active user sessions",
            "complexity": 3
        },
        {
            "title": "Validate user credentials against the database",
            "complexity": 5
        },
        {
            "title": "Handle incorrect login attempts and provide feedback",
            "complexity": 3
        },
        {
            "title": "Implement password hashing for security",
            "complexity": 8
        },
        {
            "title": "Set up rate limiting for login attempts",
            "complexity": 5
        },
        {
            "title": "Integrate optional multi-factor authentication",
            "complexity": 8
        },
        {
            "title": "Develop logout functionality",
            "complexity": 2
        }
    ]
}
```

