---
title: SSH connections
tags:
  - CS
draft: "false"
---

## Usage

How SSH works 
- Uses public-key cryptography to authenticate the remote computer and user
- Protects the privacy and integrity of data, files, and identities
- Runs on most computers and servers

SSH is widely used to :
- Secure file transfers
- Remote terminal connections
- Automated data transfers
- Establishing VPNs
- Testing applications
- Rebooting systems
- Changing file permissions
- Managing user access

## Terms
### SSH Server
**SSH Server**: A software service running on a machine (e.g., MachineB) that listens for incoming SSH connections on port 22 (by default). It authenticates clients and provides secure remote access (e.g., shell, file transfer).  
  - Example: `sshd` (SSH Daemon) on Linux.

### SSH Client
**SSH Client**: A software tool used to initiate an SSH connection (e.g., MachineA). It connects to the SSH server and handles authentication.  
  - Example: `ssh` command on Linux, PuTTY on Windows.


> [!NOTE] Tips
> So if you ssh from **MachineA** to **MachineB**, you are communicating with the **SSH SERVER** running on the **MachineB**. Also, **MachineA** is playing a role as `CLIENT` in the SSH CONNECTION, where **MachineB** is playing a role as `SERVER`.

*The usages of the world `SERVER` and `CLIENT` are different, please be careful here*

### SSH Keys
You can generate ssh keys based on SSH Algorithms.

*I always use this [link](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to generate keys. Below is the short version of it:*
```shell
# Generate the key with your EMAIL and (optional) PASSPHRASE
ssh-keygen -t ed25519 -C "your_email@example.com"
> Enter a file in which to save the key (/Users/YOU/.ssh/id_ALGORITHM): [Press enter]
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]


$ eval "$(ssh-agent -s)"
> Agent pid 59566
```

### SSH Config
The config file that associated with a user in linux.

*Below is just an example*
```sh
Host laba.toronto.com
    HostName=laba.toronto.com
    RequiredRSASize=1024
    HostKeyAlgorithms=+ssh-rsa,ssh-dss
    PubkeyAcceptedAlgorithms=+ssh-rsa
    User=user33
```
This configuration will be fetched everytime your machine is trying to establish a SSH connection. 
*you can find how your machine is doing it exactly (step in step) by executing:*
```bash
ssh -vvv user33@laba.toronto.com
```

## SSH Algorithms (flow)

### SSH Connection Process: MachineA (Client) → MachineB (Server)
Here’s a detailed breakdown of the communication:
#### 1. TCP Handshake  
**Goal**: Establish a basic network connection.  
- MachineA sends a TCP `SYN` packet to MachineB’s port 22.  
- MachineB responds with a `SYN-ACK`.  
- MachineA sends an `ACK` to finalize the connection.  
- **Result**: A TCP connection is established.

---

#### 2. Protocol Version Exchange  
**Goal**: Agree on the SSH protocol version (e.g., SSH-2.0).  
- MachineB (server) sends its SSH protocol version:  
  ```plaintext
  SSH-2.0-OpenSSH_8.9p1
  ```  
- MachineA (client) responds with its version:  
  ```plaintext
  SSH-2.0-OpenSSH_9.0p1
  ```  
- **Result**: Both agree to use SSH protocol version 2.

---

#### 3. Key Exchange (KEX)  
**Goal**: Securely negotiate encryption algorithms and generate session keys.  
- **Step 1**: Algorithm Negotiation  
  - MachineA and MachineB exchange lists of supported:  
    - **Key Exchange (KEX) Algorithms** (e.g., `curve25519-sha256`).  
    - **Encryption Algorithms** (e.g., `aes256-ctr`).  
    - **MAC Algorithms** (e.g., `hmac-sha2-256`).  
  - They agree on the strongest mutually supported algorithms.

- **Step 2**: Diffie-Hellman Key Exchange  
  - Using the chosen KEX algorithm, they perform a **Diffie-Hellman exchange** to generate a shared secret.  
  - This secret is used to derive **session keys** for encrypting traffic.

- **Result**: Both sides now have symmetric session keys for encryption/decryption.

---

#### 4. Server Authentication  
**Goal**: MachineB proves its identity to MachineA.  
- MachineB sends its **host key** (e.g., an RSA or ED25519 public key) to MachineA.  
- MachineA checks if this key is in its `~/.ssh/known_hosts` file.  
  - **If trusted**: Proceed.  
  - **If unknown**: MachineA prompts the user:  
    ```plaintext
    The authenticity of host 'MachineB (1.2.3.4)' can't be established.
    RSA key fingerprint is SHA256:AbCdEf...
    Are you sure you want to continue (yes/no)?
    ```  
    - Answering `yes` adds MachineB’s host key to `known_hosts`.

It is an extra step to protect the users, as a user will remember connecting to this hostname before. 
However, something happened and the machine's network info changed. *This method will successfully detect that and help the users evaluate the risk of connecting to it*
1. the machine got re-imaged 
2. Could be some malicious action too

TODO: If encounter the error been described above, attach the log here

---

#### 5. Client Authentication  
**Goal**: MachineA proves its identity to MachineB.  
Common methods:  
1. **Password Authentication**:  
   - MachineA sends a username/password (encrypted with the session key).  
   - MachineB verifies the credentials against its user database.  

#todo Check how is the password/username been protected here, if I hijacked the key exchange algorithm before, am I able to decrypt the message?

2. **Public Key Authentication** (more secure):  
   - MachineA sends a **public key** (e.g., `id_rsa.pub`) to MachineB.  
   - MachineB checks if this key is in `~/.ssh/authorized_keys` on the server.  
   - MachineA signs a challenge with its **private key** (`id_rsa`), and MachineB verifies it.  

3. **Other Methods**: Certificate-based, Kerberos, etc.

---

#### **6**. Encrypted Session**  
**Goal**: Securely transmit data.  
- All further communication is encrypted using the session keys.  
- Example:  
  - MachineA runs `ls -l`, and the command is encrypted and sent to MachineB.  
  - MachineB executes the command, encrypts the output, and sends it back.  
  - MachineA decrypts and displays the result.  

---

### **Key** Components in the Process**  
| Component         | Purpose                                                              |
| ----------------- | -------------------------------------------------------------------- |
| **Host Key**      | MachineB’s identity (stored in `/etc/ssh/ssh_host_*` on the server). |
| **Session Keys**  | Symmetric keys generated during KEX to encrypt/decrypt traffic.      |
| `known_hosts`     | Client-side list of trusted server host keys.                        |
| `authorized_keys` | Server-side list of allowed client public keys.                      |

---

### **Why SSH is Secure**  
1. **Encryption**: All data is encrypted (confidentiality).  
2. **Authentication**: Both server and client verify each other’s identity.  
3. **Integrity**: MAC algorithms ensure data isn’t tampered with.  
4. **Forward Secrecy**: Session keys are temporary and not reused.  

---

### **Visual Flow**  
```
MachineA (Client)                              MachineB (Server)
       |                                               |
       |--- TCP SYN ---------------------------------->|
       |<-- TCP SYN-ACK -------------------------------|
       |--- TCP ACK ---------------------------------->|
       |                                               |
       |<-- SSH-2.0-OpenSSH_8.9p1 ---------------------|
       |--- SSH-2.0-OpenSSH_9.0p1 -------------------->|
       |                                               |
       |=== Key Exchange (KEX) ========================|
       |                                               |
       |<-- Server Host Key (e.g., RSA) ---------------|
       |--- Accept/Verify Host Key ------------------->|
       |                                               |
       |=== Client Authentication (e.g., Public Key) ==|
       |                                               |
       |=== Encrypted Session Established =============|
       |--- Encrypted "ls -l" ------------------------>|
       |<-- Encrypted "output" ------------------------|
```


## Troubleshoot

### Host key issue
```bash
ssh <hostname>
Unable to negotiate with <ip_address> port 22: no matching host key type found. Their offer: ssh-rsa,ssh-dss
```

**Why This Happens:**
- **SSH-RSA and SSH-DSS are deprecated**: Modern SSH clients (like OpenSSH 8.8 and later) disable support for `ssh-rsa` and `ssh-dss` by default because these algorithms are considered insecure.
- **Mismatch in supported key types**: The server is offering `ssh-rsa` or `ssh-dss`, but your SSH client is configured to only accept more secure key types (e.g., `ecdsa-sha2-nistp256`, `ssh-ed25519`).

**How to fix this:**
1. **Reconfiguring the SSH server** to use modern key types (recommended). 
2. **Reconfiguring your SSH client** to temporarily allow the outdated key types (less secure, but useful for connecting to legacy systems).

So the SSH server
