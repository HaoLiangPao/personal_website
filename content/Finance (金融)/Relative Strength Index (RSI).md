---
title: Relative Strength Index (RSI)
tags:
  - CS
draft: "false"
---
## Definition 

RSI measures **the speed and change of price movements**, oscillating between 0 and 100. It is used to identify overbought or oversold conditions. Please see the equations we use for BB analysis below:

The formula for the Relative Strength Index (RSI) is given by:
$$
RSI(t) = 100 - \left( \frac{100}{1 + RS(t)} \right)
$$

where $RS(t)$ is the average of upward price changes divided by the average of downward price changes over a specific window (e.g., 14 days).

The Relative Strength (RS) is calculated as:
$$
RS = \frac{\text{Average Gain}}{\text{Average Loss}}
$$

*Usually the threshold can be listed below:*
- $RSI < 30$ indicates over sold
- $RSI > 70$ indicates over bought

## Reference
- [Fidelity Investment Article](https://www.fidelity.com/learning-center/trading-investing/technical-analysis/technical-indicator-guide/RSI)
