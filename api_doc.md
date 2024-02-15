# Hansmove API Documentation

## Deployed server

- url : []()
- registered user :

```js
user1 = { fullName: "hans", email: "hans@mail.com", password: "hanstu" };
user2 = { fullName: "hans2", email: "hans2@mail.com", password: "hanstu2" };
```

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /google-login`
- `POST /login`

Routes below need authentication:

- `GET /movies`
- `GET /movies/:id`
- `POST /movies/upgrate`
- `GET /favorites`
- `POST /favorites/:id`
- `DELETE /favorites/:id`
- `PUT /users/status/:id`
- `GET //users/status/premium/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "fullName": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Full Name is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "<token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /movies

Description:

- Fetch all movies in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "rank": 1,
    "title": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
    "big_image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@",
    "genre": ["Drama"],
    "thumbnail": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg",
    "rating": "9.3",
    "id": "top1",
    "year": 1994,
    "imdbid": "tt0111161",
    "imdb_link": "https://www.imdb.com/title/tt0111161"
  },
  {
    "rank": 2,
    "title": "The Godfather",
    "description": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR8,0,380,562_.jpg",
    "big_image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_QL75_UY562_CR8,0,380,562_.jpg",
    "genre": ["Crime", "Drama"],
    "thumbnail": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg",
    "rating": "9.2",
    "id": "top2",
    "year": 1972,
    "imdbid": "tt0068646",
    "imdb_link": "https://www.imdb.com/title/tt0068646"
  }
]
```

&nbsp;

## 4. GET /movies/:id

Description:

- Fetch all movies in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
      {
    "rank": 6,
    "title": "Schindler's List",
    "thumbnail": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg",
    "rating": "9.0",
    "id": "top6",
    "year": 1993,
    "image": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,4,380,562_.jpg",
    "big_image": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,4,380,562_.jpg",
    "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    "trailer": "https://www.youtube.com/watch?v=gG22XNhtnoY",
    "trailer_embed_link": "https://www.youtube.com/embed/gG22XNhtnoY",
    "trailer_youtube_id": "gG22XNhtnoY",
    "genre": [
        "Biography",
        "Drama",
        "History"
    ],
    "director": [
        "Steven Spielberg"
    ],
    "writers": [
        "Thomas Keneally(book)",
        "Steven Zaillian(screenplay)"
    ],
    "imdbid": "tt0108052",
    "imdb_link": "https://www.imdb.com/title/tt0108052"
}
  }

]
```

## 5. POST /favorites/:id

Description:

- Add movie to the logged-in user's movie list.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "status": "basic",
  "movie": {
    "id": 25,
    "UserId": 1,
    "MovieId": "top6",
    "title": "Schindler's List",
    "image": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,4,380,562_.jpg",
    "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    "updatedAt": "2024-02-15T06:54:16.699Z",
    "createdAt": "2024-02-15T06:54:16.699Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

&nbsp;

## 6. GET /favorites

Description:

- Fetch all movies in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 25,
    "UserId": 1,
    "MovieId": "top6",
    "title": "Schindler's List",
    "image": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,4,380,562_.jpg",
    "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    "updatedAt": "2024-02-15T06:54:16.699Z",
    "createdAt": "2024-02-15T06:54:16.699Z"
  }
]
```

&nbsp;

## 7. DELETE /favorites/delete/:id

Description:

- Delete user movie by id at fav

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

## 8. PUT /users/status/:id"

Description:

- Update status user by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "status": "basic"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "status is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

## 9. /users/status/premium/:id

Description:

- Fetch all movies in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "status": "premium",
    "message": "Premium status retrieved successfully"
  }
]
```

&nbsp;
