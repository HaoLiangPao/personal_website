---
title: Concept
tags:
  - Math
draft: "false"
---
## Definition 
#todo 学一下啥是 Discretization，以前听说过离散数学但是从来没接触过





## Application

**A usage in** [[Machine Learning For Trading#Trading as an MDP]]:
In our formulas and discussion, we’ve been assuming that our state is just an integer. However, clearly the state space we discussed above is far more complicated. We need to take some steps to consolidate our factors into something that can be used as an index to lookup a $q$ value in our $Q$ table.

We need to **discretize** and combine each of our factors. Suppose 
1. we limit each of our 4 example factors, x1,x2,x3, and x4 to the range [0,9].
2. Then, we perform our **discretization** and **concatenate** the numbers together into a single number:

![[discretization_application_1.png]]

A simple method of discretization is shown below:
- A basic pseudocode algorithm for discretizing our learning factors from arbitrary real numbers to fixed-range integers.
```python
step_size = size(data) / steps
data.sort()  
for i in range(0, steps):
    threshold[i] = data[(i + 1) * step_size]
```

It has the benefit of naturally scaling the thresholds to the densities of the dataset. Areas that have a lot of values get smaller thresholds whereas areas that are spread out get larger ones.
