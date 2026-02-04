---
title: Simple Moving Average (SMA)
tags:
  - Finance
draft: "false"
---
## Definition

A simple moving average (SMA) calculates the average price of an asset, usually using closing prices, during a specified period of days.

- A simple moving average calculates the average price during a specified period of time.
- A simple moving average is a technical indicator that can aid in determining if an asset price will continue or if it will reverse a bull or bear trend.
- A simple moving average can be enhanced as an exponential moving average (EMA) that is more heavily weighted on recent price action.

It usually been used to **determine the price changing trend**.
## Equation

$$
SMA(t) = \frac{1}{N} \sum_{i=t-N+1}^{t} P(i)
$$

Where:

- $SMA(t)$ = Simple Moving Average at time $t$,
- $P(i)$ = Price at time $i$,
- $N$ = Window length (e.g., 20 days),
- $\sum_{i=t-N+1}^{t}$ = Summation of prices from time $t-N+1$ to time $t$.

The SMA is computed as the average of the prices over the specified window of $N$.
