---
title: PostgresSQL
tags:
  - CS
  - Database
draft: "false"
---
## Definition 





## Usage

### Setup
1. Install the postgresql on a linux machine and start it
```bash
# Install
sudo apt install postgresql

# Start
sudo systemctl start postgresql
```

2. Create users and necessary databases
```bash
# Start an interractive terminal
sudo -u postgres psql

CREATE USER myuser WITH PASSWORD 'mypassword'; # 1. Create user
CREATE DATABASE checks; # 2. Create the database
GRANT ALL PRIVILEGES ON DATABASE checks TO myuser; # 3. Add user to the database
```

#### Open the (default) local connection to the remote internet
1. **Locate the Configuration Files:**
   - **Find `postgresql.conf`:**  
     You can locate the file by connecting to your PostgreSQL instance with `psql` and running:
     ```sql
     SHOW config_file;
     ```
     On many Linux systems, if installed via apt-get (like on Ubuntu), the file is often found at:
     ```
     /etc/postgresql/<version>/main/postgresql.conf
     ```
     Replace `<version>` with your actual PostgreSQL version.

2. **Edit postgresql.conf:**
   - Open the file in a text editor with root privileges. For example:
     ```bash
     sudo nano /etc/postgresql/<version>/main/postgresql.conf
     ```
   - Locate the `listen_addresses` setting. By default, it might be commented out:
     ```conf
     #listen_addresses = 'localhost'
     ```
   - Change it to allow connections from all interfaces:
     ```conf
     listen_addresses = '*'
     ```
     This tells PostgreSQL to listen on all available IP addresses.

3. **Configure pg_hba.conf for Remote Connections:**
   - Locate the `pg_hba.conf` file, usually in the same directory as `postgresql.conf`.
     ```bash
     sudo nano /etc/postgresql/<version>/main/pg_hba.conf
     ```
   - Add or modify a line to allow remote connections. For example, to allow password (md5) authentication from any IP address, add:
     ```conf
     host    all    all    0.0.0.0/0    md5
     ```
     **Security Note:** Allowing all IPs (`0.0.0.0/0`) is not recommended for production. Instead, restrict it to trusted IP ranges whenever possible.

**If you want to add just the IPV6 localhost**
Add the below to the `pg_hba.conf`.
```bash
    host    all     postgres        ::1/128         trust
```

4. **Restart PostgreSQL:**
   - Save your changes and restart the PostgreSQL service to apply them:
     ```bash
     sudo systemctl restart postgresql
     ```

5. **Adjust Your Firewall Settings:**
   - Ensure your firewall allows incoming connections on PostgreSQL’s default port (5432). For example, if you're using `ufw` on Ubuntu:
     ```bash
     sudo ufw allow 5432/tcp
     ```
   - If you’re on a cloud platform, also update your security group rules to permit incoming traffic on port 5432.

6. **Test the Remote Connection:**
   - Use a remote client such as pgAdmin to connect by specifying your server’s public IP address and port 5432.
   - Verify that you can authenticate and interact with the database.

#### Check whether postgres db is running at the right port

Check the default **5432** port (it is been defined in the `postgresql.conf`)
```bash
sudo netstat -tlnp | grep 5432
```
You should see something like:
```bash
# IPv4
tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN      52366/postmaster
# IPv6
tcp6       0      0 :::5432                 :::*                    LISTEN      52594/postmaster
```






---

**Important Security Reminder:**  
Exposing your database to the internet increases security risks. Make sure to:
- Use strong passwords.
- Restrict IP ranges in `pg_hba.conf` to only trusted hosts if possible.
- Consider using SSL/TLS for encrypted connections.
- Keep your PostgreSQL installation updated with the latest security patches.

Following these steps will configure PostgreSQL to listen on all interfaces and accept remote connections, while keeping in mind best practices for security.

### Interactive Terminal
Login as a superuser so that you can check all the databases and their schemas:

```sql
sudo su - postgres
```

Then we can get to postgresql shell by using following command:-

```sql
psql
```

You can now check all the databases list by using the following command:-

```sql
\l
```

If you would like to check the sizes of the databases as well use:-

```sql
\l+
```

Press `q` to go back.

Once you have found your database now you can connect to that database using the following command:-

```sql
\c database_name
```

Once connected you can check the database tables or schema by:-

```sql
\d
```

Now to return back to the shell use:-

```sql
q
```

Now to further see the details of a certain table use:-

```sql
\d table_name
```

To go back to postgresql_shell press `\q`.

And to return back to terminal press `exit`.

### Migration
For **Flask** applications using **SQLAlchemy**, **Alembic** (typically used via Flask-Migrate) is considered a robust and well-integrated solution.

#### Init alembic
```bash
cd ./backend # go to where your backend server code is
flask db init
```
This will use **alembic** under the hood, and generate a `migrations` folder.

#### Updating database
You should do the below version control commit every time you make change to the models:
```bash
flask db migrate -m '<message>'
```
- This will generate a migration script under `migrations/versions`
- The script will have two function defined and some config info recorded about this change

When you want to apply the version control change, you just upgrade (similarly, you can downgrade if you want to go back to the previous version)
```bash
flask db upgrade
```