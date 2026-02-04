---
title: Commodity Channel Index (CCI)
tags:
  - Finance
draft: "false"
---
## Definition 

Similar as the [[Bollinger Bands (BB)]], the Commodity Channel Index (CCI) measures **the deviation of the price from its average**. 

Compared to BB, it is a less bounded oscillator that indicates whether the price is above or below the average price. 

Moreover, it not only reveals how much different the current price is compared to the historical prices, it also reveals the trend of the prices moving upwards or downwards in the near future.

**The CCI is calculated as:**
$$
CCI(t) = \frac{P(t) - SMA_{\text{typ}}(t)}{0.015 \times \text{Mean Deviation}(t)}
$$

Where
- $P(t)$ is the typical price at time $t$ (calculated as the average of the high, low, and adjusted close prices).
- $SMA_{\text{typ}}(t)$ is the simple moving average ([[Simple Moving Average (SMA)]]) of the typical price.
- The constant $0.015$ is used to ensure that the most CCI values fall within the -100 to +100 range.

[^1]: Donald Lambert, Commodity Channel Index: Tools for Trading Cyclical Trends (Technical Analysis of Stocks \& Commodities Magazine, 1980)