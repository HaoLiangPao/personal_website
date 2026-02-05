---
title: Operating System
tags:
  - CS
draft: "false"
---
# Theory



### Type of OS

#### Personal Systems

#### Enterprise Systems
Usually ES are toB systems instead of toC systems, mostly sold through sales/consulting service providers.
*IBM is a big player in the Enterprise Systems.* 


# Application





### Bash Interaction
#### How to find the os info of the current machine

You can use [[Bash#uname]] to find out the specific information about a machine.

```bash
uname -a
```


## Environment Variables

Environment variables in Unix-like systems can be set temporarily or permanently, and they can be defined in several places depending on your needs. Let’s break down your questions:

---

### 1. Temporary vs. Permanent Environment Variables

#### Temporary Change with `export`
**Command Example:**
```bash
export PERL5LIB=/path/to/your/modules:$PERL5LIB
```

**Effect:**  
This command sets or prepends the specified directory to the `PERL5LIB` environment variable **only for the current shell session** and any processes spawned from it. Once you close the shell or start a new session, the change will be lost.
**Reverting the Change:**
- **For the Current Session
	- You can either close the session or 
	- remove the variable using:
        ```bash
        unset PERL5LIB
        ```

- **For Permanent Changes:**  
	If you added the `export` command to a startup file (like `~/.bashrc`, `~/.profile`, or even a system-wide file), you must remove or comment out that line and then start a new session (or source the file again) to revert the change.

### 2. Role of `/etc/profile` (and Similar Files)

#### What `/etc/profile` Does
**System-Wide Configuration:**  
The file `/etc/profile` is a system-wide configuration script that is executed for **login shells**. It sets environment variables and runs startup scripts for all users.

**Setting Environment Variables:**  
Variables defined in `/etc/profile` (or files sourced by it) become part of the environment for all users when they log in. For example, if an administrator sets:
```bash
export PERL5LIB=/some/system/path
```
then every login shell will have that value for `PERL5LIB` unless it’s overridden later.
### Other Files That Can Store Environment Variables

There isn’t a single place for environment variables; the following are common locations:

- **System-Wide Files:**
    - `/etc/profile`  
        Used for setting environment variables for login shells.
    - `/etc/bashrc` or `/etc/bash.bashrc`  
        Typically executed for non-login interactive shells.
    - `/etc/environment`  
        (On some systems) A simple file to define environment variables system-wide.
- **User-Specific Files:**
    - `~/.profile`  
        Executed for login shells (often when using sh, dash, or bash in login mode).
    - `~/.bash_profile` or `~/.bash_login`  
        Specific to bash login shells.
    - `~/.bashrc`  
        Executed for interactive non-login shells.
    - Other shell-specific startup files (like `~/.zshrc` for Zsh).

==**Note:** The exact files used and the order in which they’re executed can vary based on your operating system and shell configuration.==
### Additional Resources

- **Bash Manual (Section on Startup Files):**  
    [GNU Bash Reference Manual – Bash Startup Files](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)
- **man bash:**  
    Run `man bash` in your terminal and look for the “INVOCATION” section to learn about startup files and environment variable settings.
- **Environment Variables in Linux:**  
    [https://www.cyberciti.biz/faq/linux-unix-set-environment-variable/](https://www.cyberciti.biz/faq/linux-unix-set-environment-variable/)

### `LIBPATH` variable
> **LIBPATH** (or its analogs) is an environment variable used by the operating system’s dynamic linker/loader to locate shared libraries (DLLs on Windows, `.so` files on Unix-like systems). On some platforms (for example, AIX uses `LIBPATH`, while Linux typically uses `LD_LIBRARY_PATH`), this variable tells the OS where to look for shared libraries at runtime.

The system will look for this value to find the correct path for executables

*On linux systems*, you can use `which <command>` to find the default path of the executable.

### Example: PERL
#### 1. The Executable Installation Location

When you build Perl (or any software), you typically specify a _prefix_ (for example, `/usr/local` or `/opt/perl`) that determines where the binary executables, libraries, and supporting files are installed. For Perl this process is controlled by its configuration (e.g., via the `Configure` script or the `Makefile.PL`/`Build.PL` in later versions). For example, if you install Perl with a prefix of `/usr/local`, then:

- The Perl executable might be installed as `/usr/local/bin/perl`
- Core libraries (the standard modules) are installed in directories like `/usr/local/lib/perl5/`
- Other architecture-specific files might be under `/usr/local/lib/perl5/` or `/usr/local/lib/perl5/<arch>`

These locations become part of the “built-in” configuration for the Perl interpreter.
#### 2. @INC — Perl’s Module Search Path

**@INC** is an array variable in Perl that contains the list of directories the interpreter searches when you use or require a module. When you compile Perl, the locations for the core modules (and sometimes for site/vendor modules) are compiled into the executable. In other words, the directories in **@INC** are determined by the installation layout that was set at build time.

For example, if you print out **@INC** using a simple script:

```perl
#!/usr/bin/env perl
use strict;
use warnings;

print "Module search paths (@INC):\n";
print "$_\n" for @INC;
```

You might see directories like:

- `/usr/local/lib/perl5`
- `/usr/local/lib/perl5/<arch>`
- `/usr/local/share/perl5`

These directories reflect where the core modules were installed based on the prefix and configuration you provided.

_Note:_ You can add directories to **@INC** at runtime by using the `-I` command-line option, setting the environment variable `PERL5LIB`, or using the `lib` pragma in your script.

#### 3. LIBPATH — Runtime Library Search Path
**Usage in Perl’s context:**  
The Perl executable itself is a compiled binary that depends on certain shared libraries (such as the C library or other dynamically linked libraries). The value of **LIBPATH** (or the system equivalent) can affect whether the correct shared libraries are found when you run the Perl executable.  

==**However, LIBPATH does not influence Perl’s @INC.** That is, even if LIBPATH points somewhere, Perl will not use that to look for Perl modules; it relies on its built-in configuration and any modifications through `PERL5LIB`, `-I`, or the `lib` pragma.==

#### 4. How They Relate (Using Perl as an Example)

|**Concept**|**Purpose**|**Determined By**|**Impact on Perl**|
|---|---|---|---|
|**Executable Installation Location**|Location where Perl’s binary and related files reside.|Build configuration (prefix, installation options).|Sets up the default locations for core binaries and libraries.|
|**@INC**|List of directories to search for Perl modules.|Compiled into Perl based on the installation layout.|Dictates where Perl looks for modules when you `use` or `require` them.|
|**LIBPATH (or LD_LIBRARY_PATH)**|List of directories to search for shared libraries (dynamic linking).|OS environment variable or linker configuration.|Affects the dynamic linker finding C libraries that Perl (or other programs) depend on; it does not affect Perl module search paths.|

#### In Practice

- **During Build and Installation:**  
    When you compile and install Perl, you configure it with a prefix (say, `/usr/local`). The build process embeds paths into the Perl executable that become the default directories for **@INC**. For example, modules might be found in `/usr/local/lib/perl5/` or `/usr/local/lib/perl5/<arch>`.
- **At Runtime:**
    - When you run `perl myscript.pl`, the interpreter refers to its compiled-in **@INC** list to find modules.
    - If you set `PERL5LIB` or use the `-I` switch, you can modify or extend **@INC** temporarily.
    - Separately, if the Perl executable depends on a shared library that isn’t in the standard OS library paths, you might need to set **LIBPATH** (or `LD_LIBRARY_PATH`) so that the dynamic linker can locate that shared library.
- **Why It Matters:**  
    If you have multiple Perl installations (say, one in `/usr/bin` and another in `/usr/local/bin`), each installation may have different compiled-in **@INC** paths. This affects which modules are found by each version. Likewise, if a Perl installation depends on certain shared libraries, and those libraries are installed in non-standard locations, you might have to adjust **LIBPATH** to ensure the correct shared libraries are loaded when you run Perl.


## Encodings

### Get Encoding Status

1. Use the file Command
The file command is pre-installed and provides basic encoding detection:
```bash
file -i filename
# Example output:
filename: text/plain; charset=utf-8
```

The `-i` flag explicitly shows the MIME type and charset. Without -i, it may still display encoding (e.g., UTF-8 Unicode text).
2. Enca (Extremely Naive Charset Analyser)

Install enca for more detailed detection (supports multiple languages):
```bash
sudo apt install enca   # Debian/Ubuntu
sudo dnf install enca   # Fedora

# Then run
enca filename
```

3. Chardet (Python Library)
*For non-English texts, specify the language (e.g., enca -L russian filename).*

```bash
Install chardet via pip for probabilistic detection:
pip install chardet

# Use it with:
chardetect filename
# Example output:
filename: utf-8 with confidence 0.99
```

4. uchardet (C++ Implementation)
Faster alternative to chardet:
```bash
sudo apt install uchardet   # Debian/Ubuntu
sudo dnf install uchardet   # Fedora

# Then run
uchardet filename
```


5. Check in Vim

Open the file in Vim and check the encoding:
```bash
vim filename
```

Inside Vim, type:
```bash
:set fileencoding?
```

The result (e.g., utf-8) will appear at the bottom.
6. nkf (Network Kanji Filter)

Useful for Japanese encodings but works generally:
```bash
nkf --guess filename
```

### Converting Encodings
The encoding of zOS and Linux are very different where zOS uses `IBM-1047` also known as `EBCDIC`. Where the Linux uses `UTF-8` / `ISO8859-1` also known as `ASCII`.

So if you are transferring files from linux to zOS, please either change the tag before scp or convert it once the files are on zOS.
```bash
iconv -f ISO8859-1 -t IBM-1047 inputfile.txt > outputfile.txt
iconv -f IBM-1047 -t ISO8859-1 inputfile.txt > outputfile.txt
```

### Encoding Types

| **Encoding**            | **Description**                                                                                                                  | **Bits per Code Unit**  | **Relationship to ASCII**                                                       | **Primary Use Cases**                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **ASCII**               | A 7‑bit encoding standard that represents basic Latin letters, digits, punctuation, and control characters.                      | 7 bits (128 characters) | The original encoding; forms the basis for many later encodings.                | Early computing, legacy systems.                          |
| **EBCDIC**              | IBM’s proprietary 8‑bit encoding with a different character mapping than ASCII.                                                  | 8 bits (256 characters) | Not compatible with ASCII; uses a different layout entirely.                    | IBM mainframes and legacy systems.                        |
| **ISO8859-1 (Latin‑1)** | An 8‑bit extension of ASCII designed to support Western European languages by adding accented characters and additional symbols. | 8 bits (256 characters) | The first 128 characters are identical to ASCII, making it an extension.        | Text processing in Western European locales.              |
| **UTF‑8**               | A variable‑length encoding for Unicode that uses one to four bytes per character.                                                | 1–4 bytes per character | Backward compatible with ASCII (the first 128 Unicode code points match ASCII). | Modern computing, web applications, internationalization. |

**Summary**

- **ASCII** is the foundational 7‑bit character set used in early computing.
- **ISO8859-1** builds on ASCII by extending it to 8‑bit, adding support for Western European characters.
- **UTF‑8** further expands on this by being a variable‑length encoding that covers the entire Unicode standard while keeping the original ASCII characters unchanged.
- **EBCDIC** is an entirely different 8‑bit encoding created by IBM and does not share compatibility with ASCII.

For further reading, you can check out:

- [ASCII on Wikipedia](https://en.wikipedia.org/wiki/ASCII)
- [EBCDIC on Wikipedia](https://en.wikipedia.org/wiki/EBCDIC)
- [ISO/IEC 8859-1 on Wikipedia](https://en.wikipedia.org/wiki/ISO/IEC_8859-1)
- [UTF-8 on Wikipedia](https://en.wikipedia.org/wiki/UTF-8)


### Filehandler
*I have encountered this concept while working with **perl** where it sets the filehandler for input and output sources*
```perl
binmode($in, :raw)
binmode($out, :raw)
```


A **filehandle** is an abstract reference or identifier that a program uses to interact with an open file. While Perl uses filehandles as its primary means for file I/O, the concept isn’t unique to Perl—it exists in most programming languages (often as streams, file descriptors, or similar objects). They all serve the same purpose: to provide a way to read from, write to, and control access to files without dealing with the underlying system details directly.

Below is a summary of the concept:

|**Aspect**|**Explanation**|
|---|---|
|**Definition**|An abstract reference to an open file used for reading, writing, or performing other file operations.|
|**In Perl**|A filehandle is used with built-in functions (e.g., `open`, `binmode`, `<$fh>`, `print $fh`) to perform file I/O, often with configurable I/O layers.|
|**General Idea**|Similar to streams or file descriptors in languages like C, Python, or Java, providing an interface to interact with files.|
|**Usage**|Used to control file I/O modes, such as binary or text, and manage data encoding and buffering.|

# Usage
## How to find which OS you are running?
Once you login a server, you might want to know the configurations of the server. Cloud platforms maybe provide a UI for it, but it is better to know a way to find that out within the terminal

Once you've SSHed into a Linux server, there are several ways to find out what operating system it's running. Here are the most common and reliable methods:

### ✅ 1. **Check `/etc/os-release` (most reliable and standard)**

```Shell
cat /etc/os-release
```

This will output something like:

```
NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu
...
```

---

### ✅ 2. **Use `hostnamectl` (if available)**

```Shell
hostnamectl
```

This shows OS info along with kernel and architecture, e.g.:

```
Operating System: Ubuntu 22.04.3 LTS
Kernel: Linux 5.15.0-91-generic
Architecture: x86-64
```

---

### ✅ 3. **Use `lsb_release` (if installed)**

```Shell
lsb_release -a
```

This gives a clean summary like:

```
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.3 LTS
Release:        22.04
Codename:       jammy
```

> If `lsb_release` is not found, you can install it with:

```Shell
sudo apt install lsb-release  # Debian/Ubuntu
```

---

### ✅ 4. **Fallback: Check kernel version**

```Shell
uname -a
```

This shows the kernel version and architecture, which can give clues about the OS, though it's less specific.
