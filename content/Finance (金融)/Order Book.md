---
title: Concept
tags:
  - Finance
draft: "false"
---
## Definition 

What happens when you click “buy” on a share of stock through an online broker? Probably a lot more than you might imagine. Let’s dive into the details and discuss orders and the order book.

### The Order Book
Let’s suppose we executed the following order on the exchange, “Buy 100 shares of $IBM at a limit price of $99.95”:
$$ BUY, IBM, 100, LIMIT, 99.95  $$
Suppose this is actually the first order of the day. This action adds a BID entry to the public order book for the exchange:  

| Type | Price | Quantity |
| ---- | ----- | -------- |
| BID  | 99.95 | 100      |

The order itself is **anonymized**, but it becomes public knowledge that there is interest in 100 shares of `$IBM`. *It’s important to note that identical orders are lumped together.* (makes it even more anonymized)

#todo 补全order book的内容

### Making Orders
An order is a well-defined structure that contains very specific instructions about the stock to buy. It is made up of:
- **Action**: this is either a `BUY` or `SELL` instruction.
- **Symbol**: this is the unique stock symbol (like `$AAPL` or `$SPY`) to execute the order on.
- **Quantity**: this is the number of shares to purchase.
- **Price**:  this is the target price for the transaction of the stock
	- for `limit orders`, this specifies the precise minimum value you’re willing to pay or receive for your order.
	- Not available for `market order`
- **Order Type**: this is the type of order, different types behave very differently
#### Order Types

##### Basic Types: `Market` & `Limit`
Usually, it is either a `market` or `limit` order. There are significant differences between these two order types.

> [!Warning] Caution
> A market order does not specify a price for the order

*It generally indicates that you are willing to accept a “good price” for a stock.* In reality, though, it’s filled at whatever price someone is willing to accept the order. 

This can vary wildly during volatile market times. For example, if `$TSLA` stock is plummeting because of Elon’s latest Twitter rant, 
- A market sell order, might get filled at far below the “current” price you saw in your broker’s stock ticker.
- A limit order, on the other hand, does specify a price for the order. It guarantees that when the order is executed, it will be executed at that price. 
	- For buy orders, it can also be filled below that price; 
	- Similarly, for sell orders, it can be filled above your specified sale price. 
	- The outcome is guaranteed to be what you specify or better, however, **it’s entirely possible that your order will not be filled in the reasonable time frame you expect**. During the same aforementioned period of volatility, if you ask for price `x` on your stock, but the market has fallen far below that point, it may take months or years for the share price to recover to `x` and thus for your order to be filled.

##### Other Types: `Stop Loss` & `Stop Limit`
Your online broker may offer you some other order types such as `stop loss` or `stop limit`. 
*These are actually not directly supported by the market but are special orders that your broker automatically converts to one of the above types when the condition is fulfilled.*

**For example:**
A `stop-loss sell order` specifies that once a stock drops below a particular user-defined price, it should be executed as a `market sell`. 

It is generally used to, as the name suggests, stop losses as a stock drops in value. You might, for example, never want to risk losing money on an investment, so you could set a stop-loss order to be at (or slightly below) the price you purchased the stock at; your broker would convert and execute the sale any (!) time the stock dipped that low.

The most impactful and well-known of these is **the ability to sell short**, which we’ll discuss in further detail soon.

金融真的是聪明人搞得东西，一层又一层的嵌套，把这个游戏越弄越复杂了。但同时也靠着巨大的财富玩弄这人们的贪婪趋势着越来越多的人前赴后继地投身这场巨大的游戏中。

### Filling Orders
The path your order takes varies wildly depending on a number of factors. There is always an intermediary between you and a filled order: **your broker**. 

1. Your broker is connected to a number of **exchanges** (like the `NASDAQ` or `NYSE`). 
	1. Certain stocks might be listed at one or more exchanges. 
2. Your broker has devices at each exchange that query in the order book and report back results to the broker’s “home base” where it gathers and analyses that data to give you the best price. 
3. It executes your order on the best exchange and gives you a confirmation.

This is the simplest, clearest scenario. What if there are multiple clients using the same broker to make orders, and you want to buy the same stock that Joe Shmoe is selling? *The trade can be made within the broker without having to contact (or pay fees to) the exchanges for their order information.*

所以一个 brokerage 如果大了，其实是一个马太效应，他内部转账的 fee 也会少，跟别的 brokerage 去比的话优势也会扩大

#### Dark Pool
Can we extrapolate this scenario across brokers? Turns out there’s an entity out there called the **dark pool**, which is an intermediary between **brokerages** and **exchanges**. 
1. The dark pool often makes predictions about price movement; 
2. they pay the brokerages for the privilege of seeing orders before they’re executed, and will actually execute advantageous ones without involving exchanges.
3. Both of these entities—the **brokerages** and the **dark pool members**—claim this is kosher, legally-speaking, because they are still guaranteeing at least as good of a price as is available on the exchanges themselves.

> [!NOTE]
> Apparently around 80-90% of the trades made by “retail traders” never actually make it to the exchanges.


### Exploiting the order book

#todo 把两个scenario 在这里记一下


### Selling Short （做空）
The most important and impactful order type “added” to the stock market by brokers (in addition to those we described previously) enables selling short—the bane of https://www.reddit.com/r/wallstreetbets/.
- Shorting a stock involves taking a negative position;
- You bet that its price will go down rather than up.

Suppose `$IBM` is selling at `$100`. 
1. You think `$IBM` is overhyped and want to short it.
2. Lisa, on the other hand, thinks its still got plenty of growth ahead and wants to buy in.
3. Joe holds 100 shares of `$IBM`, and Joe is a great guy. Even though he wants to hold onto his shares, he’s willing to lend them to you (well, his broker is).
4. You borrow Joe’s shares and sell them to Lisa; she gives you `$10,000` in exchange.
5. At the end of the day, you now have `$10,000` in your account and owe Joe 100 shares of `$IBM`.
6. Joe is eventually going to want his shares back.

Suppose $IBM is now selling at `$90` and you want to cash out.
- Lisa doesn’t want to get rid of her 100 shares; she’s still bullish on `$IBM`.
- Thankfully, there are plenty of people out there buying or selling shares at any given time;
- Nate is willing to sell his 100 shares, you paid `$9,000` for those shares
- You give those 100 shares back to Joe, fulfilling your obligation.

Now as you bet on the correct trend, you’re left with a nice `$1,000` profit in your account!

**What Can Go Wrong?**
What if the price didn’t drop down to `$90`? If you bought them from Nate at `$150` you’d be out `$5,000`. 
This is worse than the situation with regular trades. 
- If your (owned) stock goes down in value after you buy and you decide to sell, you still have money, just less of it.
- In this case, you actually owe your brokerage money once you exit your short position.

### Exchange-Traded Options （期权）
**Brokers** often offer a variety of order types to fulfill needs for complex and deep trading strategies. As we covered in [[#Making Orders]], **exchanges** only support `market` and `limit` orders, *but brokers are free to add infinite layers of complexity on top of those as long as they can somehow be reduced to aside*.

Another such custom order type is **Options**, and this section will provide a barebones introduction to the topic. We’ll cover 
1. what options are
2. how to read an options chain
3. what call and put options are
4. and the basic strategies we can employ with options.
5. Furthermore, we’ll discuss the purpose of options, how to price them, and how to combine options contracts into more advanced strategies that correspond to a very specific position based on a very specific prediction of market behaviour well beyond our tradition “long” and “short” positions.

> [!NOTE] Notes
An option is a legal contract which gives the buyer the right, but not the obligation, to buy or sell the underlying stock at a specific price on or before the expiration date.

Specifically, 
- a **call option** gives you the right to buy a stock at a specific price
- a **put option** gives you the right to sell a stock at a particular price. 

We’ll start with the former.

The “specific price” we’re referring to is known as the **strike price**. The “expiration date” in reference specifically refers to U.S.-based options trading: in the European model, options contracts can only be executed on the expiration date.

#### Options Chain
Take a look at an options chain for $AAPL stock below:
![[option_chain_aapl.png]]
- The calls column is the **expiration date**: 
	- you would have up until (and including) that day to *exercise* your **option**.
	- Otherwise, it simply goes away. 
- The **root** is the underlying security, in this case: Apple stock `$AAPL`.
- The **strike** column specifies the *guaranteed* price at which you can purchase the stock if you exercise the option, regardless of what the real price of the **root** is. 
- The **last** column specifies the price at which that option traded at, at market close for that day. 
- The **Net** shows the change in options price from the previous time period (if any). 
- The **open interest** column shows how many pending orders for that option are in the market right now.
	- *Notice that the interest for “round numbers” is much higher for no apparent reason: the $105 and $110 options have far more orders.*

> [!Important]
> An option holds 100 shares of the underlying stock; never more, never less.

The price, though, is per share. That means if you wanted to buy a call option at $103, it’d cost you $795 based on the last price in the figure included above.

这是提前多少年的看涨期权？从苹果股价只有7块的时候买，买他能涨到105？金融市场的复杂程度超乎想象！！

Once you own an option, *at any time during the trading day until December 16th*, you can buy Apple stock at a guaranteed price of $103 per share (running with the same example). Of course, *the money you actually spent on the option is long-gone*, so you’d want to ensure that to break even, the actual price of Apple is far-enough above $103 that if you were to sell, you’d make enough money to recoup the price of the option.

#### Why Options?
Why wouldn’t we just buy the stock? What flexibility or benefit does trading options on that stock give us?

Let’s work with a running example of an `$AAPL` call option for a strike price of `$110` for `$2.73` a share in the previous example. Suppose that the price of `$AAPL` today is `$111.57`. Then, suppose that `$AAPL` rises to `$120` on or before December 16th.

**Buy stocks directly:**
If we bought 100 shares, we’d be out `$11,157`, then gain `$12,000` upon selling, netting us `$843`.

**Buy call options:**
Suppose that instead we buy the 110 call option.
1. We’d be out `$273`. If we were to exercise our option on the day `$AAPL` hits `$120`, we can buy it at `$110` per share, costing us `$11,000`. We can then immediately sell it for the same `$12,000` gain, but that nets us `$727` of profit.

> [!NOTE] Compare the two:
> **Call options**' profit is lower, but our risk was far less*. This is an example of the **leverage** benefit.
- We only spent `$273` up front instead of `$11,157` in our “bet” that `$AAPL` would go up. 
- The rest of our available funds are not tied up and can be used for other things. 

*behind options; we can control more money with less money. Similarly, if things don’t go our way, we lose far less.*

Suppose instead that by December 16th, $AAPL fell to `$100` instead of rising. 
- Our “buy-and-hold” strategy loses `$1,157`
- but our options strategy only cost us that same `$273` as before; 
- we’re under no obligation to exercise our option (it’s in the name: exercising is optional).

**Summary:**
We like that we:
- **cannot lose more** than the premium we paid up-front for the option; and 
- get **leverage**, in that we still get most of the upside potential but cap the downside
	- and only tie up the cost of the option rather than full cost of 100 shares of the stock. 

However, we don’t like that we:
- lose money on the premium; 
	- it’s impossible to get back.
	- Some people prefer to have an asset, even if it drops in value, rather than put up with the sunk cost of the options （沉没成本）.
- have an expiration date;
	- by owning the asset, we bet that it will go up eventually, whereas options place a very specific restriction on the period of growth (or loss, for put options) that has value.
- don’t own the stock.
	- This might seem obvious, but there are implications: by not owning the stock, you have no voting rights in the company, nor can you accrue dividends that may come with it.

#### Properties of an Option
Notice that the cost of an option goes down as it gets closer to $11. This is a depiction of the **moneyness** of that option.

##### Intrinsic Value
Remember, you can exercise an option any time before an expiration date. That means you can buy and execute an option immediately; if the strike price is below the current price, you could be making instantaneous profit. The price of the option itself has to account for that.

For example, suppose the current price of `$AAPL` is `$110.55`. You can buy a 110 call option, immediately exercise the option, and sell your 100 shares of `$AAPL` for the market price; this would net you `$55` in profits. To prevent this from happening, the option naturally costs more than that profit; in the case of the previous example, it costs $273 to buy that option.

This base profit difference is a measurement of the option’s **intrinsic value**, a concept we’ll return to later, but in the context of a company. More specifically, the intrinsic value of an option is the difference between its **strike price** and the **underlying stock’s price**; it’s a metric of immediately exercising and acting upon that **“in-the-money”** option. 

*Not all options have an intrinsic value; you can’t always make a profit with an immediate turnaround. These are called **“out-of-the-money”** options. The intrinsic value of the 110 call from before is $0.55.*

##### Time Value
What explains the remaining gap between the `$0.55` intrinsic value and the actual `$2.73` option price? As the options get closer to their expiration date, their likelihood changes drastically. On December 15th, it’s incredibly unlikely that `$AAPL` will fall from `$110.55` to `$101`, for example.

This is called the time value of the option: it’s the excess premium cost of an option beyond its intrinsic value, attributed to time-to-expiration.

**Question**
所以是时间越长这个 value 越大，时间越短这个 value 越小？

##### Time Decay
Remember, the option itself is an asset that can be bought or sold. If you change your mind about it, you can sell it to another individual on an exchange the same way you can buy or sell a stock. However, if the stock hasn’t gone in the direction of your option, it’s likely that you will lose money by selling it (though hopefully less money than you would’ve lost by simply letting it expire).

*This loss also grows as the expiration date gets closer*; it’s called the **time decay** of the option. It’s also called $theta (θ)$, the rate at which an option is currently losing its time value. *In other words, it’s the first derivative of the option’s time value.*

As the expiration date approaches, the time decay approaches zero as options approach their intrinsic value; you would have to exercise the option immediately at that point to realize some gains. *People that trade options (rather than buy options to exercise them) typically try to close out their position 2-4 weeks before the expiration date*, passing off the option to someone who actually wants to take that bet. 击鼓传花

#todo  Black Scholes' Model

#### Visualizing Options Strategies
We can use a profit-loss curve (P/L curve) mapped against spot price to visualize how an options strategy will perform. The “spot price” is just the market price of the stock we’re working with.

##### Buy-Call Option
For example, observe the plot below. We can see that
1. we start out with a loss that is the size of the premium we pay for the option 
2. until the spot price matches the strike price. 
3. Once we’ve hit the strike price, we can exercise our option and immediately sell our shares to make a small profit.
	1. That profit does not cancel out the premium, of course, 
4. until a certain point in time which is called the **break-even point**. 
	1. It’s a linear relationship because for every dollar above the strike price, we can make a dollar (per share) in profit by immediately exercise the option and selling our shares. 
5. The profits then continues to grow with indefinite potential.

![[simple_buy_call_option.png]]

This is the simplest model of a buy call option. The further we get from it, the more interesting things become and the more complex strategies we can visualize.

**Maximum loss**: premium of the option
**Maximum gain**: theoretically infinite


##### Buy-Put Option
A put option is the opposite of a call. 
1. We are still buying the right to a certain price and we still pay a premium for that right. 
2. However, we are now buying the right to sell the stock at a certain price.
3. You don’t actually need to own the stock in order to sell it, since you will likely be on a **margin account** and have the ability to sell short, then immediately buy the stock to close out your short position.
	1. In other words, we’ll be able to sell the stock for more and buy it back for less, pocketing the difference.

We should expect our P/L curve to be opposite the buy-call curve from [[#Buy-Call Option]], and that’s exactly what we see here. There is a minor, though important difference, though: *our maximum profit is capped because a stock’s value cannot dip below $0.*

![[simple_buy_put_option.png]]

**Maximum loss**: premium of the option 
**Maximum gain**: strike price minus the premium

##### Write-Call Option
We’ve been operating under the assumption that we’ll always be buying options, but doesn’t that imply that someone out there is selling them? And if so, that means we could be the ones selling them. **This opens up a new world of possibilities.** Selling an option is known as **writing** options, and that’s what we’ll dive into next.
1. When you sell someone a call option, you are essentially selling them the right to force you to buy the underlying stock at whatever price you can (the spot price), then sell it to them at a specific price (the strike price).
2. In this case, we pocket the premium for the option immediately, however we are now taking on the risk of an unprofitable trade in the future. 
3. As the price of the stock passes the strike price, we are now losing money with every step the stock grows beyond the strike price.

![[simple_write_call_option.png]]

**Maximum loss**: theoretically infinite 
**Maximum gain**: premium of the option

##### Write-Put Option
If the write-call was the flipped version of the buy-call, then we should expect the write-put to be the flipped version of the buy-put.

![[simple_write_put_option.png]]

**Maximum loss**: strike price minus the premium 
**Maximum gain**: premium of the option


> [!Important] Fun Fact
> About 90% of all options are not realized and allowed to expire. This fact is very important to consider when thinking about various trading strategies; most of the time, you’ll be able to put that premium in your pocket.


##### Covered Calls
The power of trading options is not in these “naked” strategies which can have dev- astating results if your bet is wrong. It’s about combining the strategies together to hedge your bets and to take a very specific position on the market.

The most common of these “advanced” strategies is a **covered call**, in which you buy a stock and then write a call. 
- This means the call buyer can force you to sell him your shares at a particular price, but you have predetermined that price and might not be forced into a certain market price point for the stock. 

There are three outcome scenarios for this strategy:

###### the stock ends above strike price:

In this case, the stock is “**called away**,” meaning we sell the stock at the specified strike price and lose any profits that would come from the stock’s growth beyond the strike price.

In other words, if we bought `$AAPL` at `$110` and a write-call at `$115`, then `$AAPL` rises to `$120`, we sell to our options buyer at `$115` and s/he gets to realize the gains beyond `$115`. However, we still get to realize the gains from `$110` to `$115` as well as the premium they paid us.

$$ profit = strike − purchase price + premium $$

**We still make money, but not as much money as we would’ve just from buying the stock**. Similarly, we no longer own the stock anymore, so if we want to continue profiting from an upward trend, we need to buy the stock again.


###### stock ends up, but below strike price
**This is the optimal case:** 
we realize the profits from the rise and make money from the premium, but we don’t have to deal with the fallout of the option being exercised. We made money on the stock and we still own the stock.
$$ profit = current − purchase + premium $$
###### stocks ends down:
Once again, **the option isn’t exercised and we still own the stock**. 

Our losses are theoretical and only actualized if we take the step forward and sell the stock. The premium actually (partially) offsets the loss.
$$ loss = current − purchase + premium $$

> [!NOTE] Summary
The covered call has the downside of not realizing maximal gains if the stock rises significantly, however it does prevent losses from hitting you as hard by offsetting it with the premium.
    
We can take a similar position except with a write-put option called a **married put**

##### Butterfly
The butterfly strategy embodies a combination of **options** that are ideal for when the market **goes sideways**. By “going sideways” we mean that the prices of our investments remain within a tight range for a certain period; fluctuations are minor and there are no breakouts or significant dips.

The strategy involves buying 4 calls, all of which are at different price points relative to the current price: one above, one below, and two close by.

For example, if `$AAPL` is at `$111`, we would buy
1. a 105-call
2. a 115-call, and 
3. two 110 write-calls.

If we use the same premium prices we had in Table 3.1, we would have a net payment of $223 worth of premiums:

$$ −7.16 + (2 · 2.73) − 0.53 = −2.23 $$

This is the cost to enter the butterfly position.

Let’s look at the profit/loss curve on the right. Again, we are hoping for a period of

![[butterfly_option.png]]

low volatility; it hurts us if the spot price dips far below or above our strike prices. Notice that the loss and gain potential is about the same; this is an intentional part of our strategy.

At different points in time, different calls can be worthless. For example, at the first intersection with the break-even point (a spot price of $107.23), the 105-call is worth `$223`, whereas the 110 and 115s are worthless. At the peak, our 105-call is worth `$500`, and the others are still worthless. At our second break-even point, the 105-call is worth `$777`, whereas our 110s are worth `-$277` each.

**Maximum loss**: total premiums for the options 
**Maximum gain**: $(middle − lower) ∗ 100 − premiums$

We’ve used four calls—two buys and two writes—to construct an exact profit-loss curve that we’re comfortable with given the prediction that the market will stay steady (not fluctuate much). This is just one example of using combinations of options to craft specific strategies.

We could likewise spread out, compress, or dis-balance the butterfly by changing the spread between the calls.

