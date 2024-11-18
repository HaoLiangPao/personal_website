---
title: Concept
tags:
  - CS
draft: "true"
---

There are two types of symlinks:

## Usage
### Creation and Deletion
It can be created with [[Bash#ln]], and removed with [[]]

### Use Cases
#### Jenkins build source migration
##### Background
I have a Jenkins pipeline that produce an artifact into one location `/example_mounted_location/continuous/path1` (**path1**), and the pipeline had a few successful builds already. Now a design decision has been made and we need to redirect the output source to `/example_mounted_location/continuous/shared/path2` (**path2**.
##### Approach
We have two approaches now:

1. Create the new **DIRECTORY** at **path2**, within the **path2** create soft links to the build output folders.
2. Don't create any new folder, only create a new **SOFT LINK** and points it to the **path1**

A2 is less tedious and achieve the same goal, so it should be considered as a better approach. And it has the below benefits:
1. If there are some services still using the old prefix that points to the **path1**, they still works in A2 but will fail when A1 is applied
2. A2 and A1 both keep the previous build histories, and A2 is less error prone



## Soft Link
Soft link is a link that only points to the referenced file/directory.



## Hard Link
Soft link is a link that only points to the referenced file/directory.




## Differences
1. Removing the **soft link** will not remove the file/directory been referenced, where removing the **hard link** will remove the original content.