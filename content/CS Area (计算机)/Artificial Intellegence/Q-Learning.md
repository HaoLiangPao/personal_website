---
title: Concept
tags:
  - CS
draft: "false"
---
## Definition 
A well-known [[Markov Decision Problem (MDP)#Model Free Learning]] algorithm, it will glean information about the real-world as it interacts with it, iteratively deducing the properties of $T$ (the transition function) and $R$ (the reward function). *The beauty of Q-learning is that it’s guaranteed to provide an optimal policy.*

The name “Q-learning” comes from the fact that the method relies on a function $Q[s, a]$ which represents as a 2D table for states and actions that grows as our agent interacts with the world. The value in the table is the total reward for taking action $a$ while in the state $s$ which is composed of 
	- the immediate reward and
	- the total discounted reward for future actions.

For now, suppose we fully know Q for our state space. What can we do with that? We can craft a policy $Π(s)$ which is just whatever action maximizes Q given our state:

$$ Π(s) = arg_amax Q[s, a]$$

Eventually, given enough observations, we converge to the optimal policy Π∗(s) and our full table Q∗. Now let’s figure out how to train our agent and build Q

### How to train a Q-Learner

At a high level, we will first split our data into training and testing data as we’ve done with our other machine learning methods, then iterate over time and integrate our experience tuples ⟨s, a, s′, r⟩ into our policy Π until we converge to Π∗(s).

*“Converging” means we’ve reached a point at which the policy doesn’t perform any better on the test data given more experience tuples.* 

The iteration process can be further broken down as follows:
- We choose a “start time” and initialize $Q$ to some default state. 
	- This is usually done by initializing the $Q$ table to small random numbers.
- We compute $s$ and select $a$,  given our policy: $a = Π(s)$. 
	- In other words, we consult $Q$ to find the best action given the current state.
- We observe the reward $r$ and subsequent state $s$′ from the world.
- We use that information to update and improve $Q[s, a]$.

#### A Learning Step

Given an experience tuple, $⟨s, a, s′, r⟩$, how do we update our $Q$ table? 
1. We introduce a scalar $α$ that represents our learning rate which is a metric of how much we “trust” new information. 
2. Without this, we would expect our q-values1 to flail wildly with each observation;
	1. with it, our values adjust more smoothly and eventually converge. 
*A typical value for the learning rate is α ≈ 0.20.*

Updating our Q table is a matter of integrating our improved estimate with our old estimate:

$$ Q′[s, a] = (1 − α)Q[s, a] + α · improved\_estimate $$

This begs the question: what’s the improved estimate? Well as we’ve already discussed, it’s our immediate reward and our discounted future rewards:

$$ Q′[s, a] = (1 − α)Q[s, a] + α(r + γ · later\_rewards) $$

But what are our discounted future rewards? We haven’t seen the future yet! But we can. If we assume that we will behave optimally from this point forward, we can say that our future reward is the q-value of the best action we would’ve chosen from our new state, s′:

$$ Q′[s,a]=(1−α)Q[s,a]+α(r+γ·Q(s′,argmax(Q[s′,a′]))) $$

### Exploitation
The more of our state space we explore, the more likely we are to hone in on the optimal actions to take. If we get one single observation that tells us a state change from $s1 → s2$ is really really good (by accident), the learner has no incentive to ever try another action when in the state s1. 

This process is called exploitation as you already find an optimal strategy (in your opinion), without a mindset to **explore** other options, you will just rely on the strategy you found forever.

### Exploration
The **exploitation** has the limit to possibly miss the overall optimum as described earlier. To alleviate this pitfall, we can introduce the probability of choosing a random action regardless of the best action. Naturally, we want this probability to decrease over time as we converge on the optimal policy, so we additionally need a decay rate.






