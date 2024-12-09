---
title: Concept
tags:
  - CS
draft: "false"
---
## Definition 

It is a technique often been used to study the relationship between different categories of data.
- As those data will result in different value range, and it is hard to plot them on the same graph or trained in the same model.

As a result, we need to generalize those data in the same range but keep the relative sizes the same. So what we do is 

$$ Normalization (X new) = (X – Xmin) / (Xmax – Xmin) $$

*while this normalization formula brings all results into a range between zero and one, there is a variation on the normalization formula to use if you're trying to put all data within a custom range where the lowest value is `a` and the highest value is `b`:*
$$xnormalized = a + ( ((x - xminimum) * (b - a)) / range of x)$$

This formula may be better if you're normalizing values for a particular use, like scoring exams or comparing data on a scale from one to 10.
- Or calculating the GPA distributions etc.





