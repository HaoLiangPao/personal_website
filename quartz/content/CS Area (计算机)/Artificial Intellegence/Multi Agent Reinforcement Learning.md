---
title: Multi Agent Reinforcement Learning
tags:
  - CS
draft: "false"
---
## Definition 



### Notes


## Challenges:

MARL algorithms suffer from multi-agent specific challenges:  
- **Non-stationarity**: exacerbated due to changing policies of all agents
- **Equilibrium selection**: how to converge to a stable equilibrium?  
- **Multi-agent credit assignment**: how to attribute rewards to agents’ actions?
- **Scaling to many agents**: how to efficiently scale to large numbers of agents?


**Solutions**
Here is a list of the common techniques used to tackle those specific challenges:
### 1. Non-stationarity
* **Centralized Training, Decentralized Execution (CTDE):** The main paradigm.
* **MADDPG (Multi-Agent DDPG):** A concrete algorithm using CTDE.
* **Multi-Agent Replay Buffers:** Storing joint transitions ($s, a_1...a_N, r_1...r_N, s'$) so the critic can learn from the full context.
* **Opponent Modeling:** Explicitly trying to learn a model of other agents' policies.

### 2. Equilibrium Selection
* **Self-Play (and Policy Self-Play):** Training agents against copies of themselves to find a stable strategy (a Nash Equilibrium).
* **Pareto Optimality (as a Solution Concept):** Explicitly searching for solutions that are on the Pareto frontier (no agent can be made better off without making another worse off).
* **Fictitious Play:** A classic method where agents play against the *average historical policy* of their opponents, which can converge to a stable equilibrium.

### 3. Multi-agent Credit Assignment
* **Value Decomposition / Factorisation:** The key technique.
* **Counterfactual Methods:**
    * **COMA (Counterfactual Multi-Agent Policy Gradients):** Calculates an agent's reward by comparing the current outcome to a "counterfactual" outcome (what *would have* happened if that agent did nothing).

### 4. Scaling to Many Agents
* **Parameter Sharing:** The most common technique. All agents use the *exact same* policy network weights. They still act independently based on their own observations.
* **Graph Neural Networks (GNNs):** Modeling agents as nodes in a graph and using the GNN to learn to pass messages between them. This focuses on *local interactions* rather than global complexity.
* **Mean-Field Approximations:** Treating other agents as an "average" population rather than modeling each one individually.
* **Attention Mechanisms (Transformers):** Allowing agents to *learn* which other agents are most important to pay attention to.kkkkkkkkkk




#### Value Decomposition
1. **VDN (Value-Decomposition Networks):** Assumes the team Q-value is a simple *sum* of individual Q-values.
2. **QMIX:** A more sophisticated method that uses a mixing network to combine Q-values, enforcing that improving an individual's Q-value will always improve the team's Q-value.