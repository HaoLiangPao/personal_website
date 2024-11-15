---
title: How to migrate from RHEL7 to RHEL9
tags:
  - Tech
  - Blog
  - OS
Draft: "true"
---
## Pain Point
RHEL does not provide an official plan to migrate from main version 7 to main version 9. It is crucial that we have a complete coverage of system migration. Also, we would like to have a snapshot of the previous system so we can easily been backed up from there.

Main requirements:
1. Create a stencil (a snapshot which is easy to boost from) for the old RHEL7 system which is on a machine with RHEL9 system
2. Create an ansible playbook for it so more SYSTEM migration can be handled by this automated process (less wheels to be invented)

## Approach

There are a list of items we need to migrate

**bpidevlinx01** resources:
- [x] Installed packages
	- [x]  dnf package management tool
	- [x]  pip package management tool
		- [ ] some packages are failing to be installed, need to work on a list and hand it to Steven for validation.
	- [x]  directly downloading through `curl` (for example: `node`)
- [ ] Users
	- [ ] user/group configuration
	- [ ] configuration files
		- [ ] `.ssh` files
		- [ ] `.profile` file
		- [ ] `.kshrc` file
	- [ ] home directories (`/home/user_name`)
	- [ ] Services and Deamon
		- [ ] Service specifc config files (for example: `/etc/nginx`)
	    - [ ]  Service Softwares (which should be installed by the **installed packages** step
	- [ ]  Cron jobs and scheduled tasks **(In Progress)**  
- [ ] Central storage mounting
	- [x] GSA
	- [ ] compgpfs **(blocked)**
		- [x] Ask Steven to add Hao into the export list (encountered a mounting error as included in the comments)
	- [ ] nfsmnts
- [ ] Static files
	- [ ] /etc
	- [x] /var
- [ ] Processing
	- [ ] Any running process (for example `mysql` needs to be start and running on the stencil as well)


### Preparation
For the ansible playbooks to work, you have to set up ssh keys and configure the right python interpreter.





### Steps

In general, all steps can be divided into two steps:
1. Capture the current state (store it somewhere in a specific format. e.g. zip file, txt file, yml file)
2. Reproduce the current state on the target machine (based on the backups generated from the previous step)


#### Package
1. Capture `DNF`, `PIP` and `CURL` installation configurations (on **source machine**)
2. Save a few files indicating the list of libraries been installed (on **control machine**)
3. Install the corresponding libraries on the **target machine** through `DNF`, `PIP` and `CURL`

#### User
1. Run an execution script to collect these files (on *source machine*), and them move them to `users/user_files.tar.gz` (on *control machine*)
	2. `.profile`
	3. `.kshrc` 
	4. `.bashrc` 
	5. `.ssh`
2. Get a list of users as a reference point (on *source machine*), create a copy of the list at `users/user_list.txt` (on *control machine*)
3. Based on the two files generated on *control machine*, move the files to its corresponding place (on *target machine*)

#### Mounting (GSA)
SKIP for now

#### Mounting (Compgpfs) #done
1. Run an execution script to collect current mounts (on *source machine*), create two snapshot files (`mounts.txt` and `current_mounts.txt`) (on *control machine*)
	```
	# Gather all mount points from /etc/fstab
	awk 'NF' /etc/fstab | grep -v '^#' | awk '{print $1,$2,$3}'
	# Gather currently mounted filesystems
	findmnt -n -o SOURCE,TARGET,FSTYPE
	```
2. Based on the two files generated on *control machine*, mount the storage points accordingly (on *target machine*)

#### Logs
1. Archive log files under `/var/log` (on *source machine*), create a zip file (on *control machine*)
2. Unzip the logs (on *target machine*)

#### Service Jobs #done 
**Content:**
1. record enabled_services: `systemctl list-unit-files --type=service --state=enabled --no-pager | awk '/enabled/{print $1}'`
2. copy **custom service unit files** in: `/etc/systemd/system`
3. archive **service configuration directories**: `service_configs.tar.gz`

**When installing**
1. Make sure all the required packages are installed for the services been migrating
2. Restore **custom service unit files**
3. Unzip the **service configuration directories**
4. Enable and start the services

#### Cron Jobs
*It requires **root** access to grab the cron jobs info such as the configs under `/etc/crontab.hourly/`, `/etc/crontab.daily/`*
1. Get the 

**Check:**
1. If 


#### Process been running
1. 


```ansible
---
- name: Migrate RHEL 7 to RHEL 9
  hosts: all
  gather_facts: true

# 1. Packages
# Run gathering playbook on RHEL 7 machine
- import_playbook: steps/pkgs/gather_packages.yml
# Run installing playbook on RHEL 9 machine
- import_playbook: steps/pkgs/install_packages.yml

# 2. User
- import_playbook: steps/User/collect_user_info.yml
- import_playbook: steps/User/user_setup.yml

# 3. GSA & Mounting Setup
- import_playbook: steps/GSA/install_gsa.yml

# TODO: 4. add mounting filesystems
- import_playbook: steps/mounts/fetch_mount.yml
- import_playbook: steps/mounts/add_mount.yml

# 5. log files
- import_playbook: steps/logs/grab_log.yml
- import_playbook: steps/logs/migrate_log.yml

# 6. Service Jobs
# - import_playbook: steps/Service/gather_services.yml
# - import_playbook: steps/Service/migrate_services.yml

# 7. Cron Jobs (System & User)
# - import_playbook: steps/cron/grab_cron_configs.yml
# - import_playbook: steps/cron/migrate_cron.yml

# 8. Process been running on the system

# 9. static files

```