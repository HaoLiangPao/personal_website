---
title: "Task B"
source: "https://github.gatech.edu/pages/cs6035-tools/cs6035-tools.github.io/Projects/DatabaseSecurity/TaskB.html"
author:
  - "[[CS 6035]]"
published:
created: 2025-04-19
description: "Intro to Information Security"
tags:
  - "clippings"
  - "OMSCS"
---
## TASK B: INFERENCE ATTACK- #1 (flag1 - 20 pts)

**NOTE - Task B is an array flag *\*this is a slightly modified array due to Gradescope, so please review the [Submission Details](https://github.gatech.edu/pages/cs6035-tools/cs6035-tools.github.io/Projects/DatabaseSecurity/Submission.html)***

Your first two attacks will involve what is called an inference attack. This is not an actual hack against a system; it often doesn’t involve hackers. Data security is about keeping data secure. Security regarding an inference attack deals with data confidentiality and providing data access on a need-to-know basis. Data at most companies is secured by permissions that limit who can see data. These permissions can be at the level of the table (the full list of a particular type of data; for instance, the employee table contains the basic data about employees), the level of a row (a row, in this case, would correspond to the record for a single employee), or the level of a column (in this case a piece of information about an employee, like gender or position at work). However, maintaining these controls takes thought and care, which can often be inadvertently and carelessly circumvented. An inference attack usually involves access to standard reports available to many employees. Consider the sensitive salary date, for instance. A company could implement a column restriction to ensure access control, allowing the creation of an employee roster report that is viewable by everyone but excludes sensitive information like employee salary data. However, a company may use other standard reports that are not carefully designed to protect those controls. By combining two or more reports, a rank-and-file employee can discover identifiable details that are not supposed to be known and then use it to infer the missing data, thus the name “inference attack.” You use multiple data sets to “infer” information you are not supposed to know otherwise.

This happened with the first reports you are looking at that were provided to you for testing. You have been given internal reports for a single company. One report is a simple employee roster; one report lists out how long employees have been members of the organization, one report groups data on all employees together to provide the average salary for employees based upon the state that they live in, and the final report lists the average salary for employees based upon how long they have been a part of the company. These four reports do not violate the client’s controls on access to sensitive Human Resource data. However, as you do your analysis, you realize that there has been a hole opened in those controls to someone who puts the reports together and does a little analysis of the contents of the reports.

The audit reveals that, at minimum, at least one person’s salary is publicly available to all employees who can view these four reports. To complete Task B, you need to find a hole in the protection where you can definitively find the actual salary of employees. After finding the first employee, continue looking for a hole in the protection to find the next employee whose salary you can definitively find. Continue this for n employees in an iterative fashion. Each employee will have a hash associated with them. This hash is unique to your VM and was generated when you completed task A. Once you have identified which employees have the exposed salary, record the hash value displayed for that employee and their salary (2 decimal places) on the report in your JSON file for flag1. You will pass Task B if you have the correct hash values. Remember that [submissions](https://github.gatech.edu/pages/cs6035-tools/cs6035-tools.github.io/Projects/DatabaseSecurity/Submission.html) for the entire project are limited, so if you randomly try different hash codes, you will only hurt yourself later in the project.

**For Task B - order matters (order of finding) for the flags (array\[0\] is the first employee found, array\[1\] is the second employee found, etc.)!**

To earn your hash for flag1, you must perform the following actions.

- Hover over the Task B Menu, which will display four reports: Employee, Duration, Salary by State, and Salary by Duration.

![alt_text](https://github.gatech.edu/pages/cs6035-tools/cs6035-tools.github.io/Projects/DatabaseSecurity/images/Task_B_Menu.png "Image of Task B Submenus")

- Click on the report you want to view (e.g., Employee Report). It will open in a new tab.
- Review the data on all four reports. You are searching through the data to see if you can find at least one employee whose salary you can positively identify precisely.
- Once you have found an employee whose salary you know precisely, look at the left of their record on the employee report. In the ID column of the report, there will be a hash (ID) for them. Record this hash and enter it into your JSON file in array\[0\]. NOTE: the hashes are generated in connection with your GTID so that they will be unique to you and your account. You will need to append to this hash a \_ followed by the employee’s salary (2 decimal places \*you may need to do some math).
- With one employee found and hence eliminated, is there another employee whose salary you know precisely? Repeat steps 2-4 until no further elimination is possible. Each employee found they should be added to the next array pointer in the flag (i.e., the employee found order - 1 => array1 for the second employee found).

Hints:

- You need to find a place where data is isolated to a single person. Look at the four reports to see if anything makes the data unique. You might need to combine multiple reports to do this.
- Once you isolate an employee, continue to see if you can isolate another employee. Rinse and repeat until you can no longer isolate an employee.
- If you know it’s elimination, and employee n-1 leads to n, logic should tell you that to find n, n-1 would have something in common with n.
- All Inference flags:
	- Only look at the data relevant to the task \*Don’t get tied up on data that provides no value to the task.
	- If it looks like a table and acts like a table, it is probably a table. While this is unnecessary to complete the task, you can copy data from the report(s) into a spreadsheet program to manipulate it. This may assist you in tracking down the hole that exposes salaries.
	- If you use an external application to troubleshoot the data and try to sort, make sure the entire dataset is sorted
- All Array flags:
	- You will receive credit for each element in the array that is correct
		- For flag arrays with more than the hash (salary/cpt), there is no partial credit for the array if the hash is correct but the other data is not
	- You will not be penalized for not filling in the whole array (i.e., if there are 6 elements in the array, and you have only 2, you will not be penalized for the missing 4)
	- You will be penalized if you overfill the expected array (i.e., if there are 6 elements in the array, and you have 7, you will be penalized for the extra 1)
	- You are reporting a salary which is US currency and hence, 2 decimal places

Include your flag1 array consisting of hashes\_salaries into the JSON file, and now, onto Task C!

**See [Submission Details](https://github.gatech.edu/pages/cs6035-tools/cs6035-tools.github.io/Projects/DatabaseSecurity/Submission.html) for more information.**

---