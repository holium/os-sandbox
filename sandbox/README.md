# OS Sandbox

## Getting started

Install all dependencies with `yarn` or `npm install`.

Start the app in dev mode with `yarn start` or `npm run start`.

### 1. Copy `.env-example` -> `.env`

```.env
APP_URL="http://localhost:3000/apps/<your-app>/"
APP_ID="your-app"
APP_NAME="Your App"
APP_COLOR="#cebef0"
APP_ICON=""
HIDE_TITLEBAR_BORDER=true
APP_INITIAL_WIDTH=1200
APP_INITIAL_HEIGHT=900
```

#### Start zod

```bash
PORT=1212 yarn start
```

#### Start UI dev server

The env format is `.env.<patp>` as seen in the commands below.

```bash
yarn dev:env zod
```

## Developing apps within OS Sandbox
