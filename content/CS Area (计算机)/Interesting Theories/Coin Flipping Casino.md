---
title: Concept
tags:
  - CS
draft: "true"
---
## Definition 

It is a thought experiment which can be used to understand the concept of risk.

Instead of trading stocks, we’ll be flipped a biased coin. This bias is much like `α`; we want to do better than random chance. We’ll say the coin has a 51% chance to come up heads. Similarly, the uncertainty of the outcome like `β`.

Betting works as follows: 
1. if you bet n coins and win, you have 2n coins.
2. If you lose, you have zero and the game is over.
3. The casino has 1000 tables, each with its own biased coin
4. and you have 1000 tokens (an indication of a bet) that you can distribute among the tables as you see fit.

How would you distribute your tokens? 
1. Is it better to go all-in on one coin flip, 
2. spread your tokens among all of the betting tables,
3. or something in between? 

> [!NOTE]
> We need to consider both risk and reward.

The expected return of any bet is the chance of winning times the subsequent winnings plus the chance of losing times the resulting losses. If Pr [win] = 0.51, then for a single bet:

$$ 0.51 · 1000 + 0.49 · −1000 = $20 $$

So we should expect to win (on average, over infinite trials) $20 if we put 1000 coins down on one table. For multiple bets, the loss or gain is ±$1 but we have 1000 trials, so

$$ 1000 · (0.51 · $1 + 0.49 · −$1) = $20 $$

**The reward is the same for both scenarios!** How can we prove, then, that the spread- out bet is better? We need to calculate **risk**, and there are a couple of ways to demonstrate it.

### Losing It All
What’s the chance that we lose all of our money? For a single bet, we have a 49% chance we’ll lose everything. For multiple bets, we have 1000 flips and each one has a 49% chance of being lost, but to lose all of them, it’d be (0.49)1000 which is astronomically unlikely.

### Standard Deviation
Another way to analyze risk is by looking at the standard deviation of the individual bets. Assume we bet one token per table and we’re now looking at the result after-the-fact. For example, we might lose one, gain one, lose one, lose another one, and so on, for our 1000 trials:

The standard deviation is just 1; any given trial is either a win or a loss.1

What about for one 1000 token bet and 999 zero token bets? The standard deviation is a lot different. On the first table, we either win or lose 1000, and the rest of the tables are 0: