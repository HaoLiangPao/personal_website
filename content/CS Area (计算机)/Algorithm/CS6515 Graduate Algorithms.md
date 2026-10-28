---
title: CS6515 Graduate Algorithms
tags:
  - CS
  - OMSCS
draft: false
---

<div class="cs6515-bilingual">
<input type="radio" name="cs6515-language" id="cs6515-english" class="cs6515-language-option" checked aria-label="English">
<label for="cs6515-english">English</label>
<input type="radio" name="cs6515-language" id="cs6515-chinese" class="cs6515-language-option" aria-label="中文">
<label for="cs6515-chinese" lang="zh-CN">中文</label>
<div class="cs6515-locale-en" lang="en">
<h1>CS6515 Algorithm Review</h1>
<p>My Graduate Algorithms study notes connect algorithm preconditions, execution steps, and problem-solving techniques. The three interactive reviews below cover dynamic programming, divide and conquer, and graph algorithms. Each opens in its own full-page view, starts in English, and includes a Chinese language switch.</p>
<h2>Interactive reviews</h2>
<div class="cs6515-cards">
<a class="cs6515-card cs6515-dp" href="interactive/cs6515/dynamic-programming.html" target="_blank" rel="noopener" data-router-ignore data-standalone>
<svg viewBox="0 0 120 70" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M28 8h64v54H28zM28 26h64M28 44h64M49 8v54M70 8v54"/><path d="M31 11h15v12H31zM52 29h15v12H52zM73 47h16v12H73z" fill="currentColor" stroke="none" opacity=".35"/></svg>
<strong>Dynamic Programming</strong>
<span>Follow subproblems and recurrences as the solution takes shape, cell by cell.</span>
<span class="cs6515-topics">LIS, LCS, knapsack, matrix-chain multiplication</span>
<span class="cs6515-open">Open the DP review</span>
</a>
<a class="cs6515-card cs6515-dc" href="interactive/cs6515/divide-and-conquer.html" target="_blank" rel="noopener" data-router-ignore data-standalone>
<svg viewBox="0 0 120 70" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M60 19 32 40M60 19l28 21M32 47 18 62M32 47l14 15M88 47 74 62M88 47l14 15"/><rect x="48" y="4" width="24" height="15" rx="2" fill="currentColor" fill-opacity=".2"/><rect x="21" y="34" width="22" height="13" rx="2"/><rect x="77" y="34" width="22" height="13" rx="2"/></svg>
<strong>Divide and Conquer</strong>
<span>Split the problem, solve recursively, and combine the results.</span>
<span class="cs6515-topics">Binary search, mergesort, Fast Select, recurrences</span>
<span class="cs6515-open">Open the D&amp;C review</span>
</a>
<a class="cs6515-card cs6515-graph" href="interactive/cs6515/graph-algorithms.html" target="_blank" rel="noopener" data-router-ignore data-standalone>
<svg viewBox="0 0 120 70" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M24 35 58 12 96 30 72 58 24 35M58 12l14 46M24 35l72-5"/><circle cx="24" cy="35" r="6" fill="var(--light)"/><circle cx="58" cy="12" r="6" fill="currentColor"/><circle cx="96" cy="30" r="6" fill="var(--light)"/><circle cx="72" cy="58" r="6" fill="var(--light)"/></svg>
<strong>Graph Algorithms</strong>
<span>Check graph conditions, then follow search, relaxation, and augmentation.</span>
<span class="cs6515-topics">Traversal, shortest paths, spanning trees, maximum flow</span>
<span class="cs6515-open">Open the graph review</span>
</a>
</div>
<h2>How I use these reviews</h2>
<ol>
<li>Check the input conditions and decide which algorithms can be used as black boxes.</li>
<li>Step through the changing state, then explain why the algorithm is correct.</li>
<li>For a variant, identify what changes, justify correctness, and analyze the running time.</li>
<li>Return to the original problem and work through the solution independently.</li>
</ol>
<h2>Next additions</h2>
<ul>
<li>Connect representative problems to the relevant walkthroughs.</li>
<li>Collect commonly confused preconditions, complexity bounds, and solution formats.</li>
<li>Add recurring questions and the explanations that help me understand them.</li>
</ul>
</div>
<div class="cs6515-locale-zh" lang="zh-CN">
<h1>CS6515 算法复习</h1>
<p>这里整理我的 Graduate Algorithms 学习资料，把算法的适用条件、执行过程和解题思路连接起来。下面三个互动页面分别覆盖动态规划、分治和图算法；每个页面会独立打开，默认显示英文，也可以切换为中文。</p>
<h2>交互复习</h2>
<div class="cs6515-cards">
<a class="cs6515-card cs6515-dp" href="interactive/cs6515/dynamic-programming.html" target="_blank" rel="noopener" data-router-ignore data-standalone>
<svg viewBox="0 0 120 70" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M28 8h64v54H28zM28 26h64M28 44h64M49 8v54M70 8v54"/><path d="M31 11h15v12H31zM52 29h15v12H52zM73 47h16v12H73z" fill="currentColor" stroke="none" opacity=".35"/></svg>
<strong>动态规划</strong>
<span>从子问题到状态转移，逐格看清答案如何形成。</span>
<span class="cs6515-topics">LIS、LCS、背包、矩阵链乘</span>
<span class="cs6515-open">打开 DP 互动复习</span>
</a>
<a class="cs6515-card cs6515-dc" href="interactive/cs6515/divide-and-conquer.html" target="_blank" rel="noopener" data-router-ignore data-standalone>
<svg viewBox="0 0 120 70" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M60 19 32 40M60 19l28 21M32 47 18 62M32 47l14 15M88 47 74 62M88 47l14 15"/><rect x="48" y="4" width="24" height="15" rx="2" fill="currentColor" fill-opacity=".2"/><rect x="21" y="34" width="22" height="13" rx="2"/><rect x="77" y="34" width="22" height="13" rx="2"/></svg>
<strong>分治</strong>
<span>拆开问题、递归求解，再把局部结果合起来。</span>
<span class="cs6515-topics">二分、归并、Fast Select、递推</span>
<span class="cs6515-open">打开 D&amp;C 互动复习</span>
</a>
<a class="cs6515-card cs6515-graph" href="interactive/cs6515/graph-algorithms.html" target="_blank" rel="noopener" data-router-ignore data-standalone>
<svg viewBox="0 0 120 70" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M24 35 58 12 96 30 72 58 24 35M58 12l14 46M24 35l72-5"/><circle cx="24" cy="35" r="6" fill="var(--light)"/><circle cx="58" cy="12" r="6" fill="currentColor"/><circle cx="96" cy="30" r="6" fill="var(--light)"/><circle cx="72" cy="58" r="6" fill="var(--light)"/></svg>
<strong>图算法</strong>
<span>先辨认图的条件，再跟随搜索、松弛与增广。</span>
<span class="cs6515-topics">遍历、最短路、生成树、最大流</span>
<span class="cs6515-open">打开图算法互动复习</span>
</a>
</div>
<h2>我会怎样使用这些资料</h2>
<ol>
<li>先看输入条件，判断哪些算法可以作为 black box 使用。</li>
<li>按步骤观察状态变化，再自己解释算法为什么正确。</li>
<li>遇到变体时，写清修改的位置、正确性理由与运行时间。</li>
<li>最后回到自己的题目，尝试独立完成推导。</li>
</ol>
<h2>后续补充</h2>
<ul>
<li>把每个模块中的典型例题与复习页对应起来。</li>
<li>整理容易混淆的前置条件、复杂度和解题写法。</li>
<li>补充学习过程中反复出现的问题与自己的理解。</li>
</ul>
</div>
</div>
