---
title: Bash
tags:
  - CS
draft: "false"
---
## Defination



## Bash Configurations

It is better to enable a `.bash_profile` or a `.bashrc` to work with zOS in a more efficient way. An example setting would be:

```bash
# .bashrc

# Basic Configuration
# ====================

# Colorize the prompt and other settings
export PS1='\[\e[0;32m\]\u@\h \[\e[0;34m\]\w\[\e[0m\] $ '
export CLICOLOR=1
export LSCOLORS=GxFxCxDxBxegedabagaced


# Alias definitions
# =================

# Navigation shortcuts
alias ..='cd ..'
alias ...='cd ../..'
alias ~='cd ~'

# zOS aliases
alias git='/nfsmnts/data/bpibuild/tools/ZOSOpenTools/bin/git.sh'

# History settings
# =================

# Increase history size
export HISTSIZE=10000
export HISTFILESIZE=20000
```

- Usually, a bash project needs to be setup at the time you setup a new laptop to boost your efficiency.


## Commands
*For more detailed usage of some less commonly used flags, *

### crontab

```bash
# Viewing your user crontab
$ crontab -l
0 9 * * * /var/cronitor/bin/water-the-plants.py
0 7 * * 6 /var/cronitor/bin/take-out-the-garbage.py

# Viewing another user's crontab
$ crontab -u tstark -l
0 0 * * * /jarvis/reboot-arc-reactor

# Editing your user crontab
$ crontab -e
# This will open the your default editor, usually vi or nano

```





### rm
Remove a file/directory/link at certain path

==The content been `rm` is not recoverable, so please treat it with 200% caution when using.==

**Example:**
```bash
rm /tmp/file_to_delete

# The command that will destroy the world (recursively, forcing the removal of the root directory)
rm -rf /
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

### ls
Show a list of content at certain path

```bash
❯ ls -la
total 24
drwxr-xr-x   10 haoliang  staff    320 15 Apr  2024 .
drwx------@ 570 haoliang  staff  18240 21 Nov 10:19 ..
-rw-r--r--@   1 haoliang  staff   6148 28 Feb  2023 .DS_Store
drwxr-xr-x    2 haoliang  staff     64 16 Feb  2023 .ipynb_checkpoints
drwxr-xr-x   21 haoliang  staff    672 14 Feb  2023 ParserFunctions
drwxr-xr-x   12 haoliang  staff    384 25 Apr  2023 artifactory-plugin
drwxr-xr-x    4 haoliang  staff    128  2 Jun  2023 testing
-rw-r--r--@   1 haoliang  staff    677 16 Feb  2023 testing.py
```
- `-a` means all, it gonna show the `.file` as well
- `-l` means show the output in lines, otherwise it will spread the content out
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
To get the current machine's OS information:
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

### iconv
It is usually used as a tool to convert the encodings. 

```bash

```


### curl
It is a command that can interact with the URLs. Usually used as a tool to download a file from certain API or retrieve information.

```bash
curl "https://google.com"
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://www.google.com/">here</A>.
</BODY></HTML>
```

It got the html response returned by google search backend server.

### export
the `export` command in Unix-like operating systems (including z/OS UNIX System Services) **does not make permanent changes to the system-wide environment variables**. Instead, it modifies the **environment variables only for the current session** and its child processes.

**How `export` Works**
- When you set a variable, e.g., `MY_VAR=value`, it only exists in the current shell.
- Using `export`, e.g., `export MY_VAR=value`, makes the variable available to any child processes spawned from the current shell.

You can set it up both within the script or at the time you execute the script
Within the script example:
```bash
MY_VAR=value       # Sets the variable locally in the current shell
export MY_VAR      # Makes MY_VAR available to child processes
```

### 