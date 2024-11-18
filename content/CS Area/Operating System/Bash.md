---
title: Concept
tags:
  - CS
draft: "true"
---

## 



## Commands
*For more detailed usage of some less commonly used flags, *

### rm
Remove a file/directory/link at certain path

==The content been `rm` is not recoverable, so please treat it with 200% caution when using.==

**Example:**
```bash
rm 

# The command that will destroy the world
rm /
```



### ln
Create symlinks 

`-f` Force existing destination pathnames to be removed to allow the link.

`-L` For each _`source_file`_ operand that names a file that is a symbolic link, create a hard link to the file referenced by the symbolic link.

`-P` For each _`source_file`_ operand that names a file that is a symbolic link, create a (hard) link to the symbolic link itself.

`-s` Create symbolic links instead of hard links. If the -s option is specified, the -L and -P options are silently ignored.

If more than one of the mutually-exclusive options `-L` and `-P` is specified the last option specified determines the behavior of the utility.

If the `-s` option is not specified and neither a `-L` nor a `-P` option is specified, the implementation defines which of the `-L` and `-P` options will be used as the default.

**Example:**
```bash
ln -sf <source_file_1> <source_file_2> ... <target_dir>
```
The last is the target directory, and when `-f` is applied, the file/directory at the **target_dir** will be replaced by the link reference file/directory.

### which
To get the version of the service/package/tools you are using

**Example:**
```bash
which node
/usr/local/bin/node

which python
# If no output means you don't have this pkg installed

which python3
/usr/bin/python3
```

### uname
To get the current machine's os information:
> This provides the kernel name, network node hostname, kernel release, kernel version, machine hardware name, processor type, hardware platform, and operating system.

**Example:**
```bash
uname -a

# RHEL machine
Linux rh9test11.fyre.ibm.com 5.14.0-427.28.1.el9_4.x86_64 #1 SMP PREEMPT_DYNAMIC Fri Jul 19 14:40:47 EDT 2024 x86_64 x86_64 x86_64 GNU/Linux

# Mac Machine
Darwin Haos-MBP 23.3.0 Darwin Kernel Version 23.3.0: Wed Dec 20 21:30:44 PST 2023; root:xnu-10002.81.5~7/RELEASE_ARM64_T6000 arm64
```

In the table format:

| **Attribute**         | **Mac Laptop**                                                                                        | **RHEL Server**                                     | **Power Linux Machine** |
| --------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------- |
| Kernel Name           | Darwin                                                                                                | Linux                                               |                         |
| Network Node Hostname | Haos-MBP                                                                                              | rh9test11.fyre.com                                  |                         |
| Kernel Release        | 23.3.0                                                                                                | 5.14.0-427.28.1.el9_4.x86_64                        |                         |
| Kernel Version        | Darwin Kernel Version 23.3.0: Wed Dec 20 21:30:44 PST 2023; root:xnu-10002.81.5~7/RELEASE_ARM64_T6000 | #1 SMP PREEMPT_DYNAMIC Fri Jul 19 14:40:47 EDT 2024 |                         |
| Machine Hardware Name | arm64                                                                                                 | x86_64                                              |                         |
| Processor Type        | arm64                                                                                                 | x86_64                                              |                         |
| Hardware Platform     | arm64                                                                                                 | x86_64                                              |                         |
| Operating System      | Darwin                                                                                                | GNU/Linux                                           |                         |

