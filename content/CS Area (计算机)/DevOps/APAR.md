---
title: APAR
tags:
  - CS
draft: "true"
---
## Definition

`APAR` (Authorized Program Analysis Report)

An `APAR` is a formal report created when a customer identifies a software issue (bug or defect) in a product. It's essentially a problem ticket that details the issue observed by the user or developer.

*Usually used in [[Operating System#Enterprise Systems]]*
## Purpose:

- To analyze and document a specific software defect.
- To provide a tracking mechanism for resolving the issue.
- It helps the software vendor (like IBM) investigate the problem and provide a fix.

#question
1. We are creating APAR when deliver a PTF, then when and how are we receiving the defect reports?
My thoughts are: In my understanding, we create APAR because we want to apply some **self initiated PTFs**

## Process:

1. A customer or support engineer identifies a problem.
2. The issue is documented and submitted as an `APAR`.
3. The vendor investigates the `APAR` and determines if a fix is required.
4. If a fix is necessary, a patch or update will be issued, usually in the form of a [[PTF]].
