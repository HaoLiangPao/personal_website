---
title: Concept
tags:
  - CS
draft: "false"
---
## Definition 
There are many data we want to study together like a paired data point described in the [[#Application]] section. (volume of the trade and the price of the stock bought). Aggregating them together will ease the decision making process.


## Application


### Trading Market
Take [[Machine Learning For Trading]] as an example, the data we’re working with—volume and price data—is discretized by a ***tick***, or a single **buy/sell** transaction. 
- For high-volume and highly-liquid stocks, there might be hundreds of thousands of **ticks** occurring every second over several exchanges, which is a massive amount of data. 
- For ease-of-use, brokers often aggregate the **tick** data on a *minute-by-minute* or *hour-by-hour* basis, summarized by its volume as well as its `open`, `high`, `low`, and `close` values. These should all be fairly self-explanatory: 
	- over a given time period, open and close are the first and last transactions; 
	- high and low are the highest and lowest prices;
	- and volume is the number of trades that occurred.


