---
title: Concept
tags:
  - CS
draft: "false"
---
## Definition 
[[Q-Learning]]’s biggest limitation is that it requires many experience tuples (and thus real-world steps) to converge. 

As discussed in the [[Machine Learning For Trading]], given our context of trading on the stock market, we’d probably burn through a lot of capital before we reach $Π∗(s)$. To alleviate this, we introduce the **Dyna** algorithm which will allow us to learn $T$ and $R$ by “**hallucinating**” many interactions based on a single real-world interaction, expanding our total number of experiences tuples without costing us big bucks.

**Dyna-Q** is a blend of [[Markov Decision Problem (MDP)#Model Free Learning]] and [[Markov Decision Problem (MDP)#Model-based Learning]] methods that builds on traditional Q-learning. 
1. We leverage the expensive experiences we gained on real data to develop a model
2. then use that model to simulate hundreds more experiences and make our Q table even better.
3. We can repeat this for all of our real experiences, essentially using each real experience to bring back our model closer to reality.

### Hallucination
How do we create fake experiences based on the real world? As our model of T and R gets better with real observations, our fake ones will get more and more representative of the world.

1. We choose a random $s$ and random $a$
2. then we infer the resulting state $s′$ from our approximate transition model, so $s′ = T [s, a]$.
3. Similarly, we infer our reward from our approximate reward model, so $r = R[s, a]$.

This begs the question, of course, of how we approximate $T$ and $R$.

### Learning Transitions 

Recall that $T[s,a,s′]$ represents the probability to land in state $s′$ given that you took the action $a$ from state $s$. To learn $T$, we simply observe how often these transitions actually occur and count:
1. Initialize $Tcount$ to some small number to avoid division by zero: $Tcount = 1e−6$.
2. For every experience with the real world, observe $⟨s, a, s′⟩$.
3. Given experience, simply increment $Tcount[s, a, s′]$.  
How do we use $Tcount$ to then evaluate a transition probability of $T [s, a, s′ ]$? Just divide the instance’s number of occurrences by the total:

#todo 

Where S is the set of all states we’ve observed when taking action a from state s.

### Learning Rewards 
Recall that R[s, a] is the total (immediate and discounted fu- ture) reward for taking the action a from state s. We are given the immediate reward r as part of our experience tuple. To build our model, then, we simply discount old rewards and integrate immediate ones (note that R = 0 to start):

$$ R′[s, a] = (1 − α)R[s, a] + αr $$

