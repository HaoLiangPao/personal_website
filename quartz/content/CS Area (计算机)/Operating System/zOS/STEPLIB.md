---
title: STEPLIB
tags:
  - CS
  - IBM
draft: "false"
---
## Definition 

On **z/OS**, `STEPLIB` has a specific meaning in the context of **batch jobs** and **online TSO (Time Sharing Option)** sessions. It is a **DD (Data Definition) statement** that specifies a private library or set of libraries containing the executable programs (load modules) to be used for the job or step.
### Key Points About `STEPLIB`
**Purpose**:
  - Used to define libraries where the system should search for executable modules before searching in system-wide libraries like the **LNKLST** (a list of globally available libraries).
- Allows a specific job or step to use private versions of programs without affecting other jobs.
- **Syntax in JCL** (Job Control Language):
```bash
//STEPLIB DD DSN=MY.PRIVATE.LIB,DISP=SHR
```

**Behavior**:
- The system searches the libraries defined in `STEPLIB` first for programs to execute.
- If the program is not found in the `STEPLIB`, it then searches system libraries.

### Usages in different context
1. **Batch Jobs**:
- If a `STEPLIB` DD is included in a JCL step, it applies only to that step.
- Example:
```bash
//STEP1 EXEC PGM=MYPROG
//STEPLIB DD DSN=MY.PRIVATE.LIB,DISP=SHR
```

2. **TSO Sessions**:
- A user can define `STEPLIB` to use custom program libraries during their TSO session.
- This is done by issuing the `ALLOCATE` command:
```bash
ALLOC F(STEPLIB) DA('MY.PRIVATE.LIB') SHR
```