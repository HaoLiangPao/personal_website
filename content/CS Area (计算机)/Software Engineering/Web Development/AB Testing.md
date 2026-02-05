---
title: AB Testing
tags:
  - CS
  - Web
draft: "false"
---



## **🐳 Containerisation & Orchestration Patterns**

  

### **1. Single-Host Docker Compose (small projects)**

```
version: "3"
services:
  nginx:
    image: nginx:1.27
    ports: ["80:80", "443:443"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro"]

  app:
    image: myorg/checks-api:1.4.2
    command: gunicorn -b 0.0.0.0:8000 app:app -w 4
```

- Compose network = a virtual bridge; **nginx** reaches **app:8000** via DNS.

### **2. Kubernetes: Ingress + Deployments**

```
user → Ingress (nginx-ingress controller) → Service → Pods (Gunicorn)
```

- **Blue/Green or Canary**
    _Two_ Deployments (checks-api-v1, checks-api-v2) behind the same Service.
    Change the weight in an Ingress object or a Service mesh (Istio, Linkerd) to shift 10 % of traffic to v2 for grey testing.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: checks-ingress
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"
spec:
  rules:
  - host: checks.example.com
    http:
      paths:
      - path: /
        backend:
          service:
            name: checks-api-v2   # 10 %
            port: { number: 8000 }
      - path: /
        backend:
          service:
            name: checks-api-v1   # 90 %
            port: { number: 8000 }
```

### **3. Rolling Updates & Zero-Downtime**

- **K8s RollingUpdate** — gradually spins up pods with the new image, waits for readiness probes, then retires old pods.
- **Nginx keeps existing keep-alive connections** while new pods warm up; no dropped traffic.

### **4. Nginx “Always-On” Gateway**

Even when the app image is being rebuilt/redeployed, the **nginx sidecar / ingress controller** remains running, keeping TLS hand-shakes successful and buffering requests until at least one upstream pod is ready.
