# react-drag-and-drop


This repository contains a setup for a taskmanagement app using Vite for the React frontend, Node.js with Express for the backend, and PostgreSQL for the database.

## Table of Contents
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Env Setup](#env-setup)
4. [Running the Application](#running-the-application)


## Requirements

- Node.js (>= 18.x)
- Yarn and npm

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. **Install dependencies for the client and server:**

```bash
cd server
npm install
cd ../client
npm install 
```
## Env Setup

1. **Set variable in .env file of server:**

```bash
PORT = "8099"
DB_HOST="hostname"
DB_PORT="5432"
DB_USERNAME="usernmae"
DB_PASSWORD="userpassword"
DB_DATABASE="dbname"
NODE_ENV="production"
JWT_SECRET ="jwtsected"
GOOGLE_CLIENT_ID = "googleclientID"
GOOGLE_CLIENT_SECRET = "googleClientSecretCode"
CLIENT_URL = "http://localhost:3000"
GOOGLE_CALLBACK_URL = "/auth/google/callback"
SESSION_SECRET="sessionSecret"
OPENAI_API_KEY="openaiapikey"
OPENAI_MODEL="modelname"
OPENAI_SYSTEM_TONE="model-tone"



```

2. **Set variable in .env file of client:**

```bash

NEXT_PUBLIC_API_URL = "http://localhost:8099"

```

## Running the Application

1. **Running Server:**

```bash
cd server
npm run migration
npm run dev

```

2. **Running Client:**

```bash
cd ../client
npm run dev
```




