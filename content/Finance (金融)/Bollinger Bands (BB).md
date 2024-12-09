---
title: Bollinger Bands (BB)
tags:
  - Finance
draft: "true"
---
## Definition

Bollinger Bands is composed of a moving average and two standard deviation lines. 
- One standard deviation ($sd$) line is above the moving average and the other is below it. 
- The standard deviation measures how much variation exists in the data; therefore

Bollinger Bands measure **volatility**. It operates under the assumption that all data tends to return to the middle band (the [[Simple Moving Average (SMA)]]). 
- When the price crosses the upper or lower band, it is considered unlikely to happen and could be treated as an indicator. 

Here is the reformatted version using the correct Obsidian approach:

## Equation

![[Simple Moving Average (SMA)]]

---

**The Lower Band is defined by:**

$$
Lower\ Band(t) = SMA(t) - (2 \times Stdev(t))
$$

**The Upper Band is defined by:**

$$
Lower\ Band(t) = SMA(t) + (2 \times Stdev(t))
$$

---

**Bollinger %B is expressed as:**
Sometimes `bbp` is used when referring to this percentage value.

$$
BB\%B(t) = \frac{P(t) - Lower\ Band(t)}{Upper\ Band(t) - Lower\ Band(t)}
$$

[^1]: John Bollinger, *Bollinger on Bollinger Bands* (McGraw-Hill, 2002)
