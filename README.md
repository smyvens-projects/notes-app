#### Use

1. install packages

-   This project uses pnpm as a package manager, to download it run: `npm install -g pnpm`

```bash
pnpm install
```

2. initialize database

```bash
pnpm add -g json-server
json-server --watch db.json --port 4000
```

3. start web server

```bash
pnpm dev
```

-   Navigate to `http:localhost:3000/`
