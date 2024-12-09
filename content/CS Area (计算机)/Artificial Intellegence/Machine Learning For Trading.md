---
title: Concept
tags:
  - CS
draft: "false"
---
## Background

It is a course provided on OMSCS.



## Python for Finance



## Learning Algorithms for Trading

The third part of this topic will cover applying machine learning algorithms to financial data in order to create models that give us insights about stock behavior. We can use these insights to (try to) predict future price data and make trading decisions based on those predictions. Financial models have existed for a long time, but using machine learning lets us create *“data-centric models”* in which the evidence speaks for itself; 

*there is no longer a need to subjectively interpret the data.*

Let’s talk about machine learning in broad terms at first, then get into specific techniques and algorithms. 

What problem does machine learning solve?
- Well, given an observation input $X$ (like the last year’s daily returns of a stock, for example),
- we can feed it into a model and get some output prediction $Y$ (like the next set of daily returns).
- The model, of course, is created from massive amounts of data fed into a machine learning algorithm.

### Supervised Regression Learning



### Reinforcement Learning (RL)
Reinforcement learning algorithms come up with policies that specify which actions to take to reach a particular goal. They’re broken down into three main parts: sensing, thinking, and acting. 

RL is often discussed in the context of robotics but it parallels to many other problems. 

The **environment** can be described by 
1. a particular state, $S$.
2. An action by the agent, $a$, is fed into a transition function, $T$, which describes how the environment responds to the action;
3. this cycle continues until the end of time.

An **agent**
1. has a policy, $Π(S)$, which describes its decision-making process of converting environment statement into an action. 
2. This policy (and resulting action) is often computed with the goal of maximizing a reward, $r$. 
3. The reinforcement learning algorithm learns which actions maximize the reward and uses that to enforce a policy.

The same concept is used in [[Markov Decision Problem (MDP)]].

#### Model Trading as a RL Problem
We need to model trading as a reinforcement problem. Much of the things we’ve discussed thus far can be associated with a **state**, **action**, or **reward** in the RL system.

For example,
- buying and selling are clearly **actions**;
- Bollinger bands and trading strategies (like holding long or selling short) are **state**;
- and returns from trades are **rewards**.
- Some thing can be a little more ambiguous, though:
	- daily returns can be considered as both **state** and the **reward**, depending on the trading approach.

We will learn our policy by analyzing how the actions we take (buying and selling) affect our portfolio value and various returns.

#### Trading as an MDP
#todo 


## Computational Investing

### Hedge Funds
In this part of the course, we’ll open up by discussing the different types of hedge funds. Following that, we’ll look at how the market works, then talk about eval- uating a company’s worth and how that can be reflected in its stock price.

Let’s cover a few vocabulary words here before we dive into details.
- **Liquidity** is a measurement of how easy it is to buy or sell shares in a fund.
	- As we’ll see soon, ETFs, or exchange-traded funds are the most liquid of funds. They can be bought and sold easily and near-instantly during the trading day just like individual stocks; ETFs, though, represent some distribution of stocks. The volume of an ETF is just as important to its liquidity: because there are often millions of people trading it, it’s easy to get your buy / sell order filled
- A **large-cap stock** like Apple refers to a stock with a large market capitalization. [[Market Cap]]
- [[Bull Market]]

#### Type of Managed Funds

With that in mind, managed funds can be broken down into three categories:

##### ETFs:
These funds function almost identically to stocks. Though they represent buckets of various ratios of stocks rather than shares in a single company, they can still be bought and sold just like regular stocks during the trading day. *They are (usually) very liquid, especially if they have a high market capitalization.*

They often track either an entire market (like `$SPY` is an **ETF** tracking the **S&P 500**) or a specific sector. 
*Furthermore, they’re completely transparent: their structure, strategy, and distribution of allocations is publicly available.*

For example, `$SMH`, the VanEck Vectors semiconductor **ETF**, tracks various semiconductor producers. Their holdings are publicly available (with their highest allocation ratio falling onto Intel `$INTC` at 12.3%) and are *trade-able via most brokers and trading platforms*.

##### Mutual Funds:
These funds are typically less transparent and less liquid than **ETFs**. *Their allocations are disclosed quarterly, and they can only be traded at the end of a trading day.*

In line with that, their strategies are often much less transparent as well. Often, you have to sign an NDA or some other “hush-hush” agreement to buy shares in a mutual fund; generally-speaking, there’s a much higher barrier to entry relative to an **ETF**.

##### Hedge Funds:
These funds (the biggest kahuna of them all :)) are highly secretive about their strategy and don’t have to disclose their allocations or plans at all. They entice people to invest in them by demonstrating results—if they can show you a 30% gain in value over the last quarter, do you really care what their strategy is? Yeah, me neither :)

*Of course, there is evidence that hedge funds generally don’t outperform mutual funds, but that’s beside the point here.*


#### Compensation
Let’s discuss how the managers of each of these funds is compensated for their hard work of deciding how to spend other people’s money. First let’s introduce the idea of assets under management or AUM, which is the amount of other people’s money

the fund manager is responsible for.

In ETFs, managers are compensated by an expense ratio which is often simply a percentage of the AUM. They’re generally pretty low: anything from 0.01% (1 “bip”) to 1% is typical (though the higher end is more unusual).

In mutual funds, the managers are also compensated by an expense ratio, though it’s much higher than that of an ETF. They typically range from about 0.5% to 3%. If you ask a mutual fund manager why they get compensated more, they’re tell you it’s because their job requires more skill than an ETF’s manager. An ETF is typically designed to track an index; the manager of $SPY, for example, just needs to make sure s/he allocates the stocks in the S&P 500 as they are represented. Because a mutual fund has more discretion about the ratios in its portfolio, it can incorporate research, deeper insights, etc. into its strategy to get better returns than an index.

Hedge funds follow an “old school” model known as two and twenty: they get 2% of the AUM as well as 20% of the profits. Now that’s quite a big chunk of the profits; however, if you’re an investor and you’re making more money than you would be at a mutual fund (even after the manager’s cut), why do you care?

Modern-day hedge funds typically don’t offer this classic 2/20 rate anymore. More common is things like 1/10 or somewhere inbetween, but the split compensation structure usually remains the same.

With the compensation model in mind, what motivates each respective fund man- ager? Well with just AUM factoring into the expense ratio, increasing that number is basically the only motivation for managers of expense-ratio-compensated funds—ETFs and mutual funds. Hedge funds, on the other hand, are additionally-motivated by profit, and so are consequently also motivated by risk-taking strategies.

Let’s move forward assuming we want to be hedge fund managers since it seems like the most glamorous option and look deeper into what that entails.

#### Hedge Fund Details
![[Hedge Fund]]

### Order Books
![[Order Book]]


### Anomalous Price Changes

Somethings can happen that changes the price of a stock but doesn't indicate the changes of value in a company value. For example *stock splits* and *dividends*.

To study the stock market data, we need to do a preparation step first: [[Data Aggregation]] 
i

#### Stock Splits
A stock split is a way for a company to lower its per-price share. This may occur to make the stock more accessible (i.e. its price is too high), to make the shares more divisible, etc. 

*If you own stock in company and it undergoes a split, you still come out with the same total value, just split across more shares.*

> [!NOTE] Why it can makes the stock **more accessible**?
> Options trading—like shorting—often happens on multiples of 100 shares; given a high-enough stock price, this becomes relatively inaccessible.

In a price chart, this is dealt with usage of an `adjusted closing value`. Going backwards in time, when encountering a split, the “actual” price is divided by the split factor to create the adjusted price. This adjusted price is easier to understand.

#todo  add a picture here


#### Dividend
Dividends are issued periodically and they have an effect on the stock price.

**Learn from an example:**
Consider a company that pays out a $1 dividend whose “true worth” is $100 per share. What should its stock price look like the day before and the day of the dividend? 

*Remember, that would mean we own the $1 dividend AND a share of the company that’s worth $100.*

What ends up happening is that as the payout day gets closer, the share price will grow towards $101, sharply dropping off back to $100 after the payout. This is because people know that they will get $101 worth of value on that day: the dividend and the share.

**Question:**
1. Will the dividend percentage be announced earlier? If I know how much the dividend will be (or I have an expectation so do the others). The price will be changing towards the $common\_expected * dividend + stock\_price$ , then there must be a differences between the actual dividend and the transacted price. (Might be some opportunity for trading....)



### The Efficient Markets Hypothesis (EMH)
The **EMH** hinges on a couple of (fairly true) assumptions about the market. It assumes that 
1. the market has a large number of investors
2. new information about the market arrives relatively randomly
3. prices will adjust quickly in response (to the point 2)
4. thus prices already reflect all available information

#### Three forms
**Weak Form:**
The weak form of the EMH asserts that **future prices cannot be predicted by analyzing historical prices**. Because the current price already integrates all possible information from the past, such an analysis has no bearing due to the impact of future, unknown information.

This is called the “weak” form of the EMH because *it still leaves room for fundamental analysis which evaluates the company as a whole rather than by searching for trading patterns*.

**Semi-strong Form**
The semi-strong form of the EMH asserts that prices adjust rapidly in response to new public information. This breaks down the fundamental analysis “loophole” in the weak form: 
- when a company’s quarterly reports become public, the market responds immediately, making it nearly impossible to act on these changes.

**Strong Form**
Of course, we can still rely on insider information, right? Wrong, according to the strong form of the efficient markets hypothesis. It (boldly) asserts that the price always reflects all **public** and **private** information. Secret information that might indicate a price increase will already be incorporated into the price.

**Comparision**

|             | Technical Analysis | Fundamental Analysis | Insider Info Analysis |
| ----------- | ------------------ | -------------------- | --------------------- |
| Week        | **No**             | **Yes**              | **Yes**               |
| Semi-strong | **No**             | **No**               | **Yes**               |
| Strong      | **No**             | **No**               | **No**                |

#### Contradict Opinions
The weakest of these assumptions, in my opinion, that may “prevent” a savvy investor from making money is that 
- (a) information arrives randomly
- (b) the market reacts quickly

**Source of information:**
Even if (a) is the case, information will at some point randomly come to you early on enough to act. Where does information come from? Typically, traders look at the indicators involved in both 
1. fundamental (earnings, dividends, etc.)
2. technical (price, volume, etc.) analysis.
3. Exogenous information as well as information from company insiders can also be incredibly impactful. 
Each of these “categories” of information has a relationship to the efficient markets hypothesis.

### How to BEAT the market
There are many evidence can be used that many forms of the EMH are problematic in the real world, and that is why hedge funds can make money. The below are some techniques they used:

#### Diversification
Diversification is necessary, especially if you don’t know what you’re doing (e.g. most of us).

Richard Grinold was seeking to relate the following metrics as a guideline towards portfolio composition: performance, skill, and breadth. For example, you may be highly-skilled at picking stocks that do well, but you don’t have enough breadth to find those stocks often. He came up with Grinold’s fundamental law for active portfolio management:

$$ Performance = skill * \sqrt{breadth} $$
This law implies that your portfolio’s performance can improve by **getting better skill** or by simply **including more stocks**, although this secondary growth method is far slower. 

This equation simplifies to an information ratio:
$$ IR = IC * \sqrt{BR} $$
- $IR$: Information Ratio
- $IC$: Information Coefficient
- $BR$: Breadth

*[[Coin Flipping Casino]] can be used to better understand this law.*

##### Examples
**RenTec** is a hedge fund founded by a math and computer science professor that uses algorithms much like those we’ve covered in this course to make its trades. It makes on the order of 100,000 trades a day. On the other hand, **Warren Buffet’s** hedge fund typically just purchases and holds 120 stocks.

Both of these funds have comparable performance and produce similar returns. This is Grinold’s Law in action: *RenTec’s lack of skill in choosing stocks is downplayed by its diversity*.


#### Portfolio Optimization
Suppose you have a set of stocks that you have determined are good investments; given that your pocketbook is limited, how many of each should you choose?

There are many potential answers to that question. In this section, we’ll return to the idea of Portfolio Optimization.

> We can find the weighted average of those comparisons by giving each stock a weight relative to its allocation ratio.
> Naturally, we can control the amount of risk in our portfolio by giving higher weights to lower-risk stocks.

##### Covariance
We can study the covariance between each stock (A, B, C). If A moves in the same direction of B ($AB_covariance$ is 0.9, and C moves in the opposite direction of A ($AC_covariance$ is -0.9), then we can have 25% of A, 25% of B and 50% of C.

##### Mean Variance Optimization
The idea boils down to a simple concept: blend anti-correlated assets together to lower the overall variance of the portfolio. 

> [!Of course, we still want to make money over time]
> So **long-term** correlations of our blends should be **positive** while **short-term** correlations are **negative**.

A number of algorithms grew out of this idea, one of which is **mean variance optimization** or **MVO**. Our inputs are:
- an expected (predicted) return for each stock,
- volatility for each stock based on historic data,
- a covariance matrix showing the correlation between every pair of assets
- a target return that we want for our blended portfolio

###### The Efficient Frontier
The frontier defines the optimal return for any level of risk; anything on the “inside” of the frontier is suboptimal, inferior set of allocation ratios.
#todo 





