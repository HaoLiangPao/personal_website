---
title: Concept
tags:
  - CS
draft: "true"
---
## Definition 
Ansible is a *GOOD ENOUGH* tool to automate a series of simple OS operations that can be executed across the platforms.
- It is not aiming at the **fastest** performance, it will be satisfied if a hack can be done to achieve the goal (according to the stack-overflow comments)

## Tips
**How to debug on Ansible Playbook:**

You would like to use `debug` module
- `var`: to directly print out the content of a **predefined variable** (it will give you variable not defined otherwise)
- `msg`: here you can 
```yml
    - name: Get list of users with UID >= 1000
      getent:
        database: passwd
      register: passwd_entries

    - name: Convert passwd_entries to items
      set_fact:
        group_items: "{{ group_entries.ansible_facts.getent_group | dict2items }}"

	- name: debug passwd_entries
      debug:
        var: passwd_entries

	- name: debug passwd_entries (top 5) 
	  debug:
		 msg: "{{ passwd_entries[:5] }}"
```


**Extract information from a dict:**
- You don't apply complex filter lines when extracting the info. (shown in the step `Convert getent_passwd to items`)
- Instead, you use loops to iterate through the items. So that you can apply conditional [map](https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.map).
```yml
    # Users 
    - name: Get passwd entries
      getent:
        database: passwd
      register: passwd_entries

    - name: Convert getent_passwd to items
      set_fact:
        passwd_items: "{{ passwd_entries.ansible_facts.getent_passwd | dict2items }}"

    # The user infor return at passwd_entries.ansible_facts.getent_passwd.<user> is a list of values like below:
    # [0]: Password placeholder (usually "x").
    # [1]: User ID (uid).
    # [2]: Group ID (gid).
    # [3]: GECOS (user information).
    # [4]: Home directory.
    # [5]: Shell.

    - name: Initialize user_data_list
      set_fact:
        user_data_list: []

    - name: Build user_data_list
      set_fact:
        user_data_list: "{{ user_data_list + [ {
          'name': item.key,
          'password': item.value[0],
          'uid': item.value[1] | int,
          'gid': item.value[2] | int,
          'gecos': item.value[3],
          'dir': item.value[4],
          'shell': item.value[5]
        } ] }}"
      when: (item.value[1] | int) >= 1000
      loop: "{{ passwd_items }}"
      loop_control:
        label: "{{ item.key }}"
    
    - name: Debug user_data_list
      debug:
        msg: "{{ user_data_list[:5] }}"
	
```
