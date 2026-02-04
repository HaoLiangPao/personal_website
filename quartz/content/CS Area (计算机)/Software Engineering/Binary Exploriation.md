---
title: Binary Exploriation
tags:
  - CS
  - cyber_security
draft: "false"
---
## Definition 



It has a lot to do with ASSEMBLY LANGUAGE and BINARRY ADDRESS. One thing you have to be crystal clear is that **"All of the function calls are all based on register addresses under the hood"**. So if there is a way to manipulate the address, in theory, you can do whatever things you want on a computer.


### Use of DBG (C debugger)

**Useful Commands:**
```bash
c # Show the C code
n # Move the debugger to tne next line
p / print <pointer> # Print the value of the pointer
p buffer[<index>] # Print the value of a specif index within a buffer
set buffer[<index>] = <value>
ctx / context # Show the default view
q / quit # Exit the dbg debugger mode


<x / exam>/100<tag> <thing you want to exam>
# decimal - d, hexidecimal -x
# $rsp the 64bit stack pointer
# exmaple: x/10gx $rsp

info registers # this will return the values of all the registers
```


### objdump

```bash
# objdump -D <binary_executable> > <output file>
objdump -D flag > flag.asm
```

