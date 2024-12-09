---
title: Concept
tags:
  - Finance
draft: "false"
---
## Definition 



### Attracting Investors
A hedge fund with no investors is meaningless. How can we make money without risking someone else’s? Invest our own? Unbelievable. So let’s talk about how we can con attract some people to give us their money to invest.

For whatever reason, hedge funds typically don’t have more than 100 investors. As a result, they generally want each one to offer them a fairly large principal investment. So who are they targeting? Investors can be broken down into three categories:
- (very wealthy) individuals, 
- (very large) institutions, 
- and funds of funds.

Now why would anyone trust someone like you with their wealth? 

1. At the very least, you need to offer them a track record of success in the past, a convincing simulation and story for your **investment strategy**, and a portfolio fit that aligns with their investment goals. If you want to go all-in on the technology startup sector whereas Georgia Tech’s foundation needs a stable place to keep their money, it might not be a good fit.
2. In addition to strategy, **variety** might be important to keep in mind. Diversity is key in a good portfolio that can endure market dips and general volatility. If an investor already has a particular area covered (like small-cap growth stocks, for instance), if you can only offer them a similar sector, things might not work out.

### Goals
Obvious your goal as a hedge fund manager is to make money. Things can be a little more nuanced than that, though. Some common goals that are helpful in attracting investors include:
- **Beating a benchmark**: if our portfolio can consistently beat the **S&P 500** by choosing the best-performing stocks of the bunch, that can be a good and convincing benchmark.
- **Absolute return**: no matter what happens, we want a way to ensure a positive return overall. This is typically accomplished by “going long” (investing long-term) on good stocks and “selling short” (betting on declines on bad stocks in the short-term) on bad stocks. We’ll discuss shorting later. （追涨杀跌）

Your choice of goal as a hedge fund manager should depend on your experience and expertise. For example, if you’re really good at picking stocks in emerging markets overseas, your best bet is targeting beating an index that tracks a similar investment strategy.

### Metrics
Given these goals, how can we measure our fund to see if our portfolio meets them? Well we already discussed quite a few metrics in the previous minicourse. 

Some reliable and convincing metrics are:
- Cumulative returns,
- volatility, 
- and a measurement of the risk / reward (like the Sharpe ratio)

### Architecture

Hedge funds and high-frequency trading firms are some of the most computationally demanding environments out there. There is a massive interconnected infrastructure that connects real-time market data, massive databases of historical pricing data, and state-of-the-art machine learning models to create trading algorithms. The figure below maps out a (very) high-level architecture for a typical firm.

![[hedge_fund_architecture.png]]

The current prices constitute a real portfolio. The trading algorithm uses that as well as real-time data about the market (pending orders, etc. which we’ll get to shortly) to send out orders that make progress towards matching the target portfolio. 

There are complexities in this “progress-making” process: 
- if your target portfolio wants 10,000 shares of $AAPL, buying those 10,000 shares outright would be detrimental to our portfolio and probably make us change our target portfolio midway. 
- This is because buying such a large quantity of shares will make the price rise as the market price goes up to meet demand. 
*Hence there is a financial benefit to incrementally reaching the target portfolio with minimal market effecets.*

