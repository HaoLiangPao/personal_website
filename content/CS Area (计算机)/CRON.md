---
title: CRON
tags:
  - CS
draft: "false"
---
## Definition 
Cron is a time-based job scheduler in Unix-like operating systems, including Linux and macOS.

It enables users to automate the execution of scripts, commands, or programs at specified times and intervals, facilitating the automation of repetitive tasks.

### Example Usage
Cron is commonly used for:
- **System Maintenance:** Automating tasks such as backups, log rotations, and system updates.
- **Data Processing:** Scheduling data imports, exports, or transformations at regular intervals.
- **Monitoring:** Running scripts to check system health, disk space, or service statuses.
- **Email Notifications:** Sending periodic reports or alerts via email.

### How Cron Works

Cron operates by reading configuration files known as "crontabs" (cron tables), which specify the commands to execute and their schedules. Each line in a crontab file represents a scheduled task with the following syntax:

```bash
* * * * * command_to_execute
- - - - -
| | | | |
| | | | +---- Day of the week (0 - 7) (Sunday is both 0 and 7)
| | | +------ Month (1 - 12)
| | +-------- Day of the month (1 - 31)
| +---------- Hour (0 - 23)
+------------ Minute (0 - 59)

```
Each asterisk (`*`) represents a field that can be specified to determine when the command runs. 

For example, to schedule a script to run every day at 3:30 AM, the crontab entry would be:
```bash
30 3 * * * /path/to/script.sh
```

## Details

### cron jobs
If your system has `/etc/cron.hourly`, `/etc/cron.daily`, `/etc/cron.weekly`, and `/etc/cron.monthly` directories, these can be used to schedule jobs by copying or symlinking a script or command.

In distributions like Ubuntu, you can see when these scripts will be invoked by looking for lines in `/etc/crontab`:

```bash
$ head /etc/crontab
7 * * * *  root cd / && run-parts — report /etc/cron.hourly
5 23 * * * root cd / && run-parts — report /etc/cron.daily
5 23 * * 7 root cd / && run-parts — report /etc/cron.weekly
5 23 1 * * root cd / && run-parts — report /etc/cron.monthly
```

#### System crontab file (`/etc/crontab`)

The original and still commonly used way to schedule system-wide cron jobs is by adding entries to the crontab file `/etc/crontab`.

*Writing to `/etc/crontab` requires admin privileges and jobs scheduled here can be run as any user.* 

To specify the user, provide a username as the first word after the schedule expression. 

```bash
$ tail /etc/crontab
* 0 * * * dataproc /var/cronitor/bin/database-backup.sh
```
In this example, the job will be run by user _dataproc_:

#### System drop-in directory (`/etc/cron.d`)

Another common way to schedule system-wide cron jobs is by adding a crontab file to `/etc/cron.d`.

Like jobs scheduled in `/etc/crontab`, writing to `/etc/cron.d` requires elevated privileges and the first word after the expression of each cron job must specify which user will run the job.

_**Tip:** For installers and scripts, adding a file to /etc/cron.d is a much cleaner option than adding entries to crontab files._

#### User specific cron jobs defination (`/var/spool/cron/crontabs`)
When individual user crontabs are edited using `crontab -e`, the crontab files themselves are stored in `/var/spool/cron/crontabs`.

You can look, but avoid the temptation to edit crontab files here directly and always use `crontab -e`. 
- *If you edit files in /var/spool/cron directly you will lose the benefit of syntax checking that the crontab editor provides, and your changes will not be detected without sending a reload signal to the cron daemon.*

### cron log
#### Where are cron logs stored?

Cron logs are written to
- `/var/log/syslog` on Ubuntu and Debian
- `/var/log/cron` on RedHat and CentOS

Show recent cron events in your syslog (Ubuntu and Debian):

```
grep CRON /var/log/syslog | tail -10
```

Show recent cron events in the cron log (RedHat and CentOS)

```
tail -10 /var/log/cron
```

_You will likely require root/sudo privileges to access these logs._

#### What you will find in the logs
Logs are written by the _cron daemon_
- when it starts-up,
- when it executes each job,
- when it has an error reading a crontab file or running a requested command. 

*Cron logs will **not** contain any of your cron job output or even their exit statuses.*

#### How to read your cron logs

Cron logs store
- the time the job was started,
- the hostname of the machine,
- the user account,
- and the command run. 

**Example snippet of cron log:**
```
Mar 29 16:15:01 data-processing CRON[12624]: (dataproc) CMD (/home/data-pipeline.py)
```
In this example, a cron job
- ran on `Mar 29 16:15:01`
- on the `data-processing` host
- as the `dataproc` user
- the command executed was `/home/data-pipeline.py`

> [!NOTE] Tips
> As valuable as cron logs are, they can't tell you which cron jobs _didn't_ run.


## Referenced
- cron jobs can be reached by using [[Bash#crontab]]
- cron jobs should be migrated (both [system wide]([[CRON#System crontab file (`/etc/crontab`)]]) and the jobs defined at the [user levels]([[CRON#User specific cron jobs defination (`/var/spool/cron/crontabs`)]])) when you are trying to migrate from one system to another [[How to migrate from RHEL7 to RHEL9]]
- 