---
title: zOS
tags:
  - CS
  - IBM
draft: "false"
---
## Definition 





Working with zOS requires a lot of experience and those are hard to gain at the beginning. Below are some of my experience when going through the steep learning curve.

## Tips
### Encoding Issues
The [[Encoding]] of zOS and Linux are very different where zOS uses `IBM-1047` also known as `EBCDIC`. Where the Linux uses `UTF-8` / `ISO8859-1` also known as `ASCII`.

#### Manual Options
So if you are transferring files from linux to zOS, please either change the tag before scp or convert it with [[Bash#iconv]] once the files are on zOS.
**1. Convert Encoding**
```bash
iconv -f ISO8859-1 -t IBM-1047 inputfile.txt > outputfile.txt
```

**2. Adding Tags**
zOS can read ASCII as well but it just can't interpret it and show in a human readable format, so if you don't want to do development work on zOS, you can simply:
1. add a tag to it: ``
2. update the environment variable
```bash
TSC390@TOROLABB ~/hao/bpi.tools $ ls -lT .
total 64
t ISO8859-1   T=on  -rwxrwx---   1 TSC390   CDEV        2830 Jul 23 14:15 Jenkinsfile
t ISO8859-1   T=on  -rw-rw----   1 TSC390   CDEV        1404 Jul 23 14:15 Jenkinsfile.extract.shadow
t ISO8859-1   T=on  -rw-rw----   1 TSC390   CDEV        3404 Jul 23 14:15 README.md
                    drwxrwx---   7 TSC390   CDEV        8192 Jul 23 14:15 build

```

#### Native Options
**Set Options**
`export _BPXK_AUTOCVT=ON;` is a command specific to **IBM z/OS UNIX System Services (USS)** environments. It sets an environment variable called `_BPXK_AUTOCVT` to the value `ON` and exports it so that all child processes inherit this setting.

You can either *set the command when executing the command* or *embed it within the script you are running*, both works.
1. Executing the script like below:
```bash
;export _BPXK_AUTOCVT=ON;../test-gitArificer.sh c390
```
where `test-gitArtificer.sh` is a 

2. Add the below into the script
```bash
# Auto convert the encodings:
# - From EBCDIC to ASCII when reading files.
# - From ASCII to EBCDIC when writing files.
export _BPXK_AUTOCVT=ON;
```


