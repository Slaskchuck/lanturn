## Installation

1. Create the database tables
```bash
npm run db:create
# or
yarn db:create
```

2. Run the migration command
```bash
npm run db:migrate
# or
yarn db:migrate
```

3. Run the seed command
```bash
npm run db:seed
# or
yarn db:seed
```

4. Copy the `.env.sample` and rename it to `.env.` The same with `.env.test.sample` and rename it to `.env.test`. If using **docker compose** follow the code bellow
```bash
DB_HOST=localhost
# for docker compose
DB_HOST=database
```

**Ignore if using docker**\
4. Run the server
```bash
npm run dev
# or
yarn dev
```