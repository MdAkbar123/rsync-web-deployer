# 🚀 Static Site Deployment via Bash + rsync

This repository automates deploying a static website to an AWS EC2 Ubuntu instance using a simple Bash script and rsync over SSH. It performs incremental updates so only changed files are transferred.

## ⚙️ Prerequisites
- Running EC2 instance (Ubuntu recommended) with public or Elastic IP.
- SSH key pair (.pem/.key) downloaded from AWS.
- Nginx (or Apache) installed on the EC2 instance.
- Verified SSH access from your local machine.

## 🧠 Setup Steps

1. Connect to the EC2 instance
```bash
ssh -i /path/to/key.pem ubuntu@<EC2-IP>
```

2. Install and start Nginx
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

3. Create deployment directory and set ownership
```bash
sudo mkdir -p /var/www/mysite
sudo chown -R ubuntu:ubuntu /var/www/mysite
```

4. Create Nginx site config
Create `/etc/nginx/sites-available/mysite` and add:
```nginx
server {
    listen 80;
    server_name _;

    root /var/www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
Enable and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

5. Create deploy script `deploy.sh` (example)
```bash
#!/bin/bash
SERVER="ubuntu@51.21.160.114"      # <- replace with your user@EC2-IP
KEY="$HOME/.ssh/key1"              # <- replace with your private key path
REMOTE_DIR="/var/www/mysite"

echo "🚀 Deploying static site to $SERVER..."
rsync -avz --delete -e "ssh -i $KEY" ./ $SERVER:$REMOTE_DIR/
echo "✅ Deployment complete!"
```
Make it executable:
```bash
chmod +x deploy.sh
```

6. Deploy your site
From your project root:
```bash
./deploy.sh
```

7. Verify
Open in browser:
```
http://<EC2-IP>/
```

## 🔁 Updating the site
After local changes, run:
```bash
./deploy.sh
```
Rsync will transmit only modified files and delete removed files (due to --delete).

## Notes / Security
- Keep your private key permissions strict: `chmod 600 /path/to/key.pem`
- Replace example IP/key with your actual values.
- If using a non-default user or path, update SERVER, KEY and REMOTE_DIR accordingly.

That's it — a minimal, repeatable deploy flow for static sites using Bash + rsync.
https://roadmap.sh/projects/static-site-server
