---
title: Concept
tags:
  - CS
draft: "false"
---
## Definition 

Markov Decision Problem or MDP. An MDP can be defined as a system with:
- a set of states, $S$;
- a set of actions, $A$;
- a transition function, $T[s,a,s′]$; and
- a reward function, $R[s, a]$.

The transition function is a probability distribution: the sum of all possible “next state”s must be 1. 
We want to find a policy, Π(s), that will maximize our reward. We call this the optimal policy, denoted Π∗(s). There are two algorithms that can help us find this optimal policy: **policy iteration** and **value iteration**. *Unfortunately, though, we won’t know T or R in advance and so these algorithms can’t help us directly.*

### Model-based Learning
In a sense, our agent needs to learn about the available transitions as well as what a good reward is before it can tackle doing that optimally. We can think about our agent’s “life” as a series of experience tuples which are much like the individual samples of training data we received during supervised regression learning:

#todo add transition matrixs

Given enough of this data, we can actually construct a probability distribution which is an approximation of the world based on what we’ve observed, and then treat that as our T and R for policy/value iteration. This is called **model-based learning**.


### Model Free Learning
In contrast, model-free learning methods develop policies directly by looking at the data rather than by converting them to what essentially amounts to a tabular lookup. We’ll specifically be looking at [[Q-Learning]], a well-known model-free learning algorithm.

#todo add robot experinment here



