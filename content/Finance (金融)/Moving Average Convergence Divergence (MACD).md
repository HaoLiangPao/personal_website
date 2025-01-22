---
title: Moving Average Convergence Divergence (MACD)
tags:
  - Finance
draft: "false"
---
## Definition 

MACD shows the difference between two exponential moving averages (EMAs) of different lengths.
It’s a **momentum indicator** that shows changes in trend strength, direction, and duration.

There are three components:
- MACD Line: The difference between two exponential moving averages (EMAs).
- Signal Line: An EMA of the MACD line.
- MACD Histogram: The difference between the MACD line and the signal line.

**The MACD is calculated as:**
$$
MACD(t) = EMA_{\text{short}}(t) - EMA_{\text{long}}(t)
$$

**The Signal Line is defined as:**
$$
\text{Signal Line}(t) = EMA_{\text{signal}}(MACD(t))
$$

## Reference
- https://www.incrediblecharts.com/indicators/macd.php