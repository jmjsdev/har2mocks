# @jmjs/har2mocks

@jmjs/har2mocks is a CLI tool that converts HAR (HTTP Archive) files to JSON mocks. It can also generate Cypress intercepts and MSW (Mock Service Worker) handlers.

## Installation

You can install @jmjs/har2mocks globally using npm:

```bash
npm install -g @jmjs/har2mocks
```

## Usage

```bash
har2mocks [options] <har_file_path> <output_directory>
```

### Arguments

- `<har_file_path>`: Path to the HAR file you want to convert
- `<output_directory>`: Directory where the mocks will be generated

### Options

- `--clean`: Clean the output directory before generating mocks
- `--cypress`: Generate Cypress intercepts in a file named `cypress-intercept.js`
- `--msw`: Generate MSW (mock service worker) handlers in a file named `msw-handlers.js`

## Examples

1. Basic usage:

   ```bash
   har2mocks ./path/to/file.har ./mocks-output
   ```

2. Clean output directory and generate Cypress intercepts:

   ```bash
   har2mocks --clean --cypress ./path/to/file.har ./mocks-output
   ```

3. Generate both Cypress intercepts and MSW handlers:
   ```bash
   har2mocks --cypress --msw ./path/to/file.har ./mocks-output
   ```

## Output

The tool will generate:

- JSON mock files for each API endpoint
- A file tree of the generated mocks
- An API list table
- Cypress intercepts file (if `--cypress` flag is used)
- MSW handlers file (if `--msw` flag is used)

### Example of output

```bash
API List:
| API                            | Method |
|--------------------------------|--------|
| /api/v1/auth/login             | POST   |
| /api/v1/notifications          | GET    |
| /api/v1/reviewable/reviews     | GET    |
| /api/v1/titles/1926514         | GET    |
| /api/v1/titles/1926514/related | GET    |
| /api/v1/users/me/ratings       | GET    |

Generated File Tree:
└── api
    └── v1
        ├── auth
        │   └── login
        │       └── POST.json
        ├── notifications
        │   └── GET.json
        ├── reviewable
        │   └── reviews
        │       └── GET.json
        ├── titles
        │   └── 1926514
        │       ├── GET.json
        │       └── related
        │           └── GET.json
        └── users
            └── me
                └── ratings
                    └── GET.json
```

`cypress-intercept.js`

```javascript
// Cypress intercepts for mocked APIs

cy.intercept("GET", "/api/v1/notifications", { fixture: "api/v1/notifications/GET.json" });
cy.intercept("GET", "/api/v1/users/me/ratings", { fixture: "api/v1/users/me/ratings/GET.json" });
cy.intercept("GET", "/api/v1/users/me/watchlist", { fixture: "api/v1/users/me/watchlist/GET.json" });
```

`msw-handlers.js`

```javascript
// This file contains handlers for Mock Service Worker (MSW) version 2.x
import { http, HttpResponse } from "msw";

import post_auth_loginMock from "./auth/login/POST.json";
import get_api_v1_notificationsMock from "./api/v1/notifications/GET.json";
import get_api_v1_reviewable_reviewsMock from "./api/v1/reviewable/reviews/GET.json";

export const handlers = [
  http.post("/api/v1/auth/login", () => {
    return HttpResponse.json(post_auth_loginMock);
  }),

  http.get("/api/v1/notifications", () => {
    return HttpResponse.json(get_api_v1_notificationsMock);
  }),

  http.get("/api/v1/reviewable/reviews", () => {
    return HttpResponse.json(get_api_v1_reviewable_reviewsMock);
  }),
];

## License

ISC
```
