*Got from link: https://medium.com/itversity/basic-system-commands-to-get-cpu-memory-and-storage-details-in-linux-9ee7f2778749*


This article will teach you how to get CPU, Memory, and storage details using Linux shell commands.

**_👨🏽‍💻🧑🏻‍💻_**_For more frequent ARTICLES, FOLLOW_

[**_Vamsi Penmetsa_**](https://medium.com/u/d96bca8417c1?source=post_page---user_mention--9ee7f2778749---------------------------------------)

Let’s get started.

## Overview of core components of a computer

A computer is any machine that can be programmed to carry out a set of algorithms and arithmetic instructions.

Whether it’s a gaming system or a home PC, the five main components that make up a typical, present-day computer include:

> 🚨👉🏼 You can also check the complete udemy course (Linux Shell Commands for Absolute Beginners using Ubuntu 20x)🔗[Referral link](https://www.udemy.com/course/linux-fundamentals-for-it-professionals/?referralCode=A055B5F676B6C171D786)

> **_A motherboard_**
> 
> **_A Central Processing Unit (CPU)_**
> 
> **_A Graphics Processing Unit (GPU), also known as a video card_**
> 
> **_Random Access Memory (RAM), also known as volatile memory_**
> 
> **_Storage: Solid State Drive (SSD) or Hard Disk Drive (HDD)_**

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*sxCM7rj_6kbh9YUspq9Qbg.png)

Basic components of the computer

Overview of core components of a computer detailed video

## Get CPU Details using lscpu command in Linux

`lscpu` is an essential command in Linux to learn about your CPU configuration. You can get more details about `lscpu` by running `lscpu --help` .

> Checkout in depth usercases of [**lscpu command**](https://medium.com/itversity/decoding-your-cpu-with-lscpu-c82589795580)

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*gsoD-7euo2Rq6m-fD4X4Gg.png)

getting usage details of lscpu command in linux

A command-line utility “lscpu” in Linux is **used to get CPU information of the system**. The “lscpu” command fetches the CPU architecture information from the “sysfs” and /proc/cpuinfo files and displays it in a terminal.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*OTRtpn5OEZkMsbHxtShR4w.png)

Details we get by using lscpu command

A detailed explanation of lscpu command in Linux

## Get Memory Details using free on Linux

The Linux `free` command is used to get the full usage of RAM in the computer. You can get the full details of `free` command by running `free --help` .

> [Detailed use cases on free command](https://vamsipenmetsa.medium.com/decoding-memory-usage-with-the-free-command-df2be82f2079)

the `free` command can be used with the control arguments as shown in the below picture.👇🏻

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*kmTG4wwKH8v6VXjC-rjl5w.png)

free command in Linux with control arguments.

This is what the output to the free command looks like in the Linux terminal.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*LL02W0O00F89CyW-bJ32ww.png)

output to free command in Linux

If you want the human-readable output of the `free` command you can use `-h` the control argument along with the `free`.

free -h

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*Jjn2IRtpj0sYaDYbbQzbAA.png)

Human readable output for the free command in Linux

A detailed video on the explanation of the free command in Linux

## Get Storage Details using df in Linux

The `df`command in Linux is used to Show information about the file system on which each FILE resides, or all file systems by default. In layman’s terms, program df aids in the retrieval of data from any hard disc or mounted device, including CD, DVD, and flash drives.

You can get the full usage details of the `df`command by running the following command in the Linux terminal

> Check out detailed [use cases of df and du commands](https://medium.com/@vamsipenmetsa/disk-space-101-using-df-and-du-for-advanced-monitoring-2b40fdad59d2)

df --help

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*OhxckFI9xX1euUCMvPvC3w.png)

The df command in Linux usage

If you want the output in Human readable format you can use `df -h` command on Linux.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*yUE4pFshnz1ILcHNI6pOkw.png)

Output for df command in Linux.

If you want the storage details of the current working directory in the human-readable format you can run the following command in Linux. Here `.` represents the current working directory.

df -h .

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*gV6HsfNkPhKjqlpjZiVnXQ.png)

Storage details of the current working directory in Linux

A detailed video that explains the df command in Linux

## Get Disk Usage Details using du in Linux

The `du` command in Linux is used to get the disk usage. And this `du` command will go through each and every folder recursively and get the storage details of each and every file.

## Get Vamsi Penmetsa’s stories in your inbox

Join Medium for free to get updates from this writer.

In simple words the `du` command will Summarize disk usage of the set of files, recursively for directories. You can get the full details of the `du` command by running `du --help` .

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*Y4YyQO3avjYOsUDWPFPJzw.png)

How to get du command usage details in Linux

The output of the `du` command will look something like the below image.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*-rd64ujJgZrkS12G_HiJzw.png)

The output of the du command in Linux

If you want only the details of the storage at the folder level without going recursively through each and every folder to get the details of the file. Then you can use the following command in Linux.

du -sh *-s, --summarize       display only a total for each argument  
-h, --human-readable  print sizes in human readable format (e.g., 1K 234M 2G)

The output will look something like the following👇🏻

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*D-WBzdXCxLLzjBUkQEHHmA.png)

The du command to get storage details in the folder level

A detailed explanation of the du command in Linux

## Get the largest folders and files using du and sort on Linux

You can use `du` command with `sort` command to troubleshoot the file which is using the highest storage in the Linux file system. The way in which you can do this is by the piping output of `du` command to the `sort` command.

du -s * | sort -n

The output of the above file will look something like this👇🏻

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*qt5TvNJs5j-ef1EdRQwNCw.png)

usage of sort command along with a du command in Linux

A detailed explanation of the du command and sort command in Linux

## Understand Storage Details of Directories using du on Windows

The detailed explanation of the Storage Details of Directories using `du`on Windows is in the following video time stamp.

Details of Directories using du command in WSL windows.

## Get storage use of folders and files

You can get the storage usage of files and folders in the Linux terminal by running the following command

du -sh .

When you run into permission-related issues while running the above command in the Linux terminal. You can use the following command to ignore the `operation not permitted` message.

du -sm * 2>/dev/null

The output will be displayed without permission-related errors.

You can pipe the above output to the sort command to sort the output in ascending order.

du -sm * 2>/dev/null | sort -n

How to get storage usage of files and folders in the Linux terminal?

## Get Storage Details of larger files using find and du

You can use the `find` command along with `du` the command to get the larger file details.

> checkout the detailed real world [use cases of find command](https://medium.com/@vamsipenmetsa/hunt-down-files-with-the-find-command-256b43a65b0f)

find [STRING] -type f -exec du -m {} +;

You can also sort the output by the piping `sort -n` command to the above command.

find [STRING] -type f -exec du -m {} + | sort -n

This is how you can troubleshoot the files and folders which are consuming more amount of storage in your Linux system.

A detailed video on how to get the details of larger files using the find and fu command in Linux

**🙏🏼Thank you, for reading the article. If you find it valuable please follow our publication** [itversity](https://medium.com/itversity)

> 🚨👉🏼 You can also check the complete udemy course (Linux Shell Commands for Absolute Beginners using Ubuntu 20x)🔗[Referral link](https://www.udemy.com/course/linux-fundamentals-for-it-professionals/?referralCode=A055B5F676B6C171D786)