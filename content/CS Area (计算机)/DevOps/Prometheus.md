---
title: Prometheus
tags:
  - CS
draft: "false"
---
## Definition 

Built to monitor
- highly dynamic container environments
- also can be used for traditional bare servers (have apps running)

*If there are more than 1000+ services running, it is curised by the big number that at least of one will go down* -> We need to keep watching the service health status at both hardware and application levels.

**It is a tool that constantly monitors all the services that you ever want to monitor** so it can fire an alert before the incidence triggered.

## Components
### Data Retrieval Worker
Collect metric data through pulling over HTTP (it requires the target to have a `/metrics` endpoint defined in specific format)
#### exporters
##### Executables
https://prometheus.io/docs/instrumenting/exporters/
There are many open source tools (developed by Prometheus or Third-party), that collect metrics data from the corresponding **targets** then convert them into the format the prometheus understand, and expose them on a HTTP endpoints.

Usually you need to
1. Download the executables
2. Untar it and execute
	1. Convert the metrics of the target
	2. Expose them on a `/metrics` endpoint
3. Configure **prometheus** to scrape from that endpoint.

##### Client Libraries
https://prometheus.io/docs/instrumenting/clientlibs/
It supports many languages, so you can implement expose logics within your application. It is more customizable and usually implemented in larger applications.

##### Benefits of having exporters
Many cloud service provider like AWS, they have implemented a **Push System** compared with the **Pull System** implemented by Prometheus.

1. **Push systems** will sometimes overload the monitoring service if there are larger number of microservices. (*monitoring system becomes the bottle neck*)
2. **Push systems** will require a deamon been installed on the target. **Pull systems** will require an endpoints exposed on the target.
3. ??**Push systems** could be affected by network issues, the monitoring system will not be able to differentiate it easily. (I think **Pull System** has the same issue here)
	1. But Prometheus has `push_gateways` for short-lived jobs (not long enough to experience one scrape interval)

##### Multi-target exporter pattern
https://prometheus.io/docs/guides/multi-target-exporter/

It shows how **black-box exporter** and **[[Simple Network Management Protocol (SNMP)]] exporter** needs to be configured as **multi-target**. As they are not required to be running on the same machine as the targets, they can be configured from anywhere (better at the place the service is consumed), as the data are received via network protocols.

### Metrics
Prometheus stores the metric data on disk (HDD/SDD) by default (*In a special time series format*) , it can be integrated with remote storage systems too.
- The format of the data decides that you can not store it in a standard relational database.

#### Count

#### Gauge

#### Histogram


### HTTP Server
The prometheus UI page, use PromptQL as the query language. (This is also where the Grafana comes into play)

```bash
# Qery all http status codes except 4xx ones
http_requests_total{status!~"4.."}

# Return the 5 mins rate of the http_requests_total metric for the past 30 mins
rate(http_requests_total[5m])[30m:]
```

### Alert Manager
Reading the alert rules defined in the config files



## Experience Overall

### Pros
1. It is very reliable, it is running even the other services are not
2. No extensive setup needed and it is a stand-alone / self-containing service

### Cons
1. It is very hard to scale
2. As the way it stores the data
	1. aggregating multiple prometheus services together is very difficult
	2. there is a limit for the data it monitors
3. 

