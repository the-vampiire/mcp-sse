# MCP SSE demo

reproducible demo that shows an MCP SSE server fails using the bun runtime but succeeds using nodejs.

# steps

1. install dependencies

```bash
# or npm | yarn | pnpm install, same effect
bun install
```

2. run the MCP inspector

```bash
npm run inspect
```

3. open the inspector [http://localhost:5173](http://localhost:5173)

4. select SSE as the transport and enter `http://localhost:3500/sse` as the url

5. open dev tools network tab to inspect traffic

6. in another terminal tab / session run the server using bun

```bash
npm run start:bun
```

7. try to connect to the server using the inspector, observe the network (pending SSE connection), server and inspector logs

8. kill the bun server then  run the server using nodejs

```bash
npm run start:node
```

9. try to connect to the server using the inspector, observe the network (successful SSE connection and message posting), server and inspector logs







