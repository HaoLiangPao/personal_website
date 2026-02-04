---
title: HTTPs
tags:
  - CS
  - Web
draft: "false"
---



## Web App Deployment

Usually we use `gunicorn` for `python` web apps, and we use `nginx` for **reverse proxy** (although `gunicorn` can take care of the **certs** too, please see the below for two different `gunicorn` commands)
### 🔍 Key Differences Between the Two Gunicorn Commands:

**Compare the differences between the below two `gunicorn` command**
```bash
gunicorn -b 127.0.0.1:5000 app:app --log-level 'info'

export CERT_PATH="$HOME/certs"
gunicorn -b 0.0.0.0:5000 app:app \
  --timeout 300 --log-level 'info' \
  --certfile="$CERT_PATH/cert.pem" \
  --keyfile="$CERT_PATH/key.pem"
```

| Feature      | `127.0.0.1:5000`                                               | `0.0.0.0:5000` + Certs                                                 |
| ------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Binding**  | `127.0.0.1:5000` binds to **localhost only** (internal access) | `0.0.0.0:5000` binds to **all interfaces** (publicly accessible)       |
| **Timeout**  | Default (typically 30s)                                        | Increased to 300 seconds                                               |
| **SSL/TLS**  | No SSL — HTTP only                                             | SSL enabled using `certfile` and `keyfile`                             |
| **Access**   | Only accessible from the local machine                         | Accessible from anywhere (if firewall allows), via **HTTPS**           |
| **Security** | Not encrypted; best for use behind a reverse proxy             | Encrypted; suitable for public-facing services                         |
| **Use Case** | Behind Nginx, or for local testing                             | Direct HTTPS service (e.g., minimal deploys or testing HTTPS directly) |
### The Stack: Roles of Each Component

### 1. **Gunicorn (Application Server)**

**Role**: Runs your Python web app (e.g., Flask, Django)
- Accepts WSGI requests and translates them to Python function calls.
- Efficiently handles multiple worker processes to serve requests concurrently.
	- multi-process (configured when starting)
- Listens on a local socket or port (e.g., `127.0.0.1:8000`).
- **Does not serve static files well** or handle HTTPS in production ideally.
	- *It can still do it as displaied in the example above*

Think of Gunicorn as your app’s **engine** — it does the actual computation and response generation.

### 2. **Nginx (Reverse Proxy / Web Server)**

**Role**: Sits in front of Gunicorn to handle incoming HTTP(S) traffic.
- Accepts connections on port `80` (HTTP) and/or `443` (HTTPS).
- Serves static files directly (e.g., images, JS, CSS).
- Forwards dynamic requests (e.g., `/api`) to Gunicorn.
- Manages SSL termination (i.e., decrypts HTTPS).
- Handles timeouts, connection limits, buffering, etc.

Nginx is like a **traffic director** — smartly routing and protecting access to your backend app.

### 3. **HTTPS (TLS/SSL Encryption)**

**Role**: Secures communication between the client (browser) and your server.
- Ensures **data privacy and integrity** over the web.
- Requires an **SSL certificate** (from a Certificate Authority).
- Typically terminated at Nginx (Nginx decrypts, Gunicorn doesn’t deal with it).

HTTPS is your **security layer**, protecting data from eavesdropping and tampering.

### Thinking
#### How They Work Together (Request Flow)
Here’s the typical flow:
```plaintext
Browser → HTTPS (port 443) → Nginx → HTTP (127.0.0.1:8000) → Gunicorn → Your Python app
```
1. A user visits `https://yourdomain.com`.
2. **Nginx** accepts the connection, decrypts it (using SSL cert).
3. If it’s a static file (e.g., `/style.css`), Nginx serves it directly.
4. If it’s a dynamic route (e.g., `/login`), Nginx forwards it to **Gunicorn**.
5. **Gunicorn** passes it to your Python app (Flask, Django).
6. Your app responds, and the whole chain works in reverse.

#### Why This Setup?

| Feature                    | Benefit                                               |
| -------------------------- | ----------------------------------------------------- |
| **Security**               | Nginx handles HTTPS — Gunicorn stays simpler          |
| **Performance**            | Nginx serves static assets faster                     |
| **Scalability**            | You can restart Gunicorn without dropping connections |
| **Separation of concerns** | Nginx: networking + security; Gunicorn: app logic     |

####  Fits in a Computer-Networking Picture

| **Layer**                         | **What happens**                                                        | **Nginx’s part**                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **L7 – Application (HTTP/HTTPS)** | Parses the HTTP request line, headers, cookies, gzip, WebSocket upgrade | - Virtual hosts, routing rules, rewrite/redirects, header manipulation                                |
| **L4 – Transport (TCP/UDP)**      | Opens a TCP socket on :80 or :443, applies backlog limits, keep-alives  | - Connection pooling, proxy buffering, rate limits, TLS hand-shake                                    |
| **L3 – Network**                  | Binds to a host IP, advertises ARP/ND entries, obeys firewall rules     | - Can sit on any routable IP (public or private); upstream back-ends may be on a different subnet/VPC |

So in the “Browser → Nginx → Gunicorn → App” chain, **Nginx is the L7 reverse-proxy front end** that also does a bit of L4 house-keeping.

Gunicorn receives a _clean_ HTTP request over an internal TCP connection (often a UNIX socket).

#### Should `Nginx` and `gunicorn` are deployed on the same machine?

| **Scenario**                                           | **Pros**                                                                                                                                 | **Cons**                                                                                                                |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Nginx + Gunicorn on the same host**                  | _•_ Simpler deploy.<br>_•_ No cross-machine latency.<br>_•_ One firewall rule.                                                           | _•_ One OS image to patch.<br>_•_ Scaling == bigger VM.                                                                 |
| **Nginx on a public node, Gunicorn on a private node** | _•_ App server stays in a private subnet.<br>_•_ You can scale Gunicorn nodes horizontally.<br>_•_ Add WAF, IDS, etc. only on the front. | _•_ Need secure link between nodes (VPN / VPC peering).<br>_•_ Slight latency hit.<br>_•_ Two boxes to monitor + patch. |

As long as **Nginx can reach Gunicorn’s bind address** (TCP/UNIX socket, or a private IP/port) they do _not_ have to run on the same machine. Many cloud setups look like:

```
            +-------------+
internet ──►│  Nginx VM   │──► 10.0.1.24:8000  (Gunicorn)
            +-------------+
```
