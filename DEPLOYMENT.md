# Deployment Guide

Complete guide to deploy this Vite/React app to a Hetzner server with GitHub Actions.

**Server IP:** 46.224.211.159
**Domain:** viktorvansteenweghen.com

---

## Step 1: Server Initial Setup

SSH into your server:

```bash
ssh root@46.224.211.159
```

Run these commands:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Nginx
apt install -y nginx

# Create deployment directory
mkdir -p /var/www/blog
chown -R www-data:www-data /var/www/blog
```

---

## Step 2: Create Deploy User

```bash
# Create deploy user
adduser --disabled-password --gecos "" deploy

# Give deploy user write access to web directory
chown -R deploy:www-data /var/www/blog
chmod -R 775 /var/www/blog

# Set up SSH for deploy user
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

---

## Step 3: Configure Nginx

Create the site configuration:

```bash
nano /etc/nginx/sites-available/blog
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name viktorvansteenweghen.com www.viktorvansteenweghen.com 46.224.211.159;
    root /var/www/blog;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

---

## Step 4: Generate SSH Key for GitHub Actions

Run this on your **local machine** (not the server):

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy -N ""
```

Display the keys:

```bash
# Public key (add to server in Step 5)
cat ~/.ssh/github_actions_deploy.pub

# Private key (add to GitHub secrets in Step 6)
cat ~/.ssh/github_actions_deploy
```

---

## Step 5: Add Public Key to Server

SSH into your server and add the public key:

```bash
ssh root@46.224.211.159
```

```bash
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> /home/deploy/.ssh/authorized_keys
```

Test the connection from your local machine:

```bash
ssh -i ~/.ssh/github_actions_deploy deploy@46.224.211.159
```

---

## Step 6: Add GitHub Secrets

Go to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

Add these 3 secrets:

| Secret Name | Value |
|-------------|-------|
| `SERVER_HOST` | `46.224.211.159` |
| `SERVER_USER` | `deploy` |
| `SERVER_SSH_KEY` | Contents of `~/.ssh/github_actions_deploy` (the private key, including `-----BEGIN/END-----` lines) |

---

## Step 7: Cloudflare DNS Setup

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **viktorvansteenweghen.com**
3. Go to **DNS → Records**
4. Add these DNS records:

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| A | `@` | `46.224.211.159` | Proxied (orange cloud) |
| A | `www` | `46.224.211.159` | Proxied (orange cloud) |

---

## Step 8: Cloudflare SSL Settings

1. Go to **SSL/TLS → Overview**
2. Set encryption mode to **Full (strict)**
3. Go to **SSL/TLS → Edge Certificates**
4. Enable **Always Use HTTPS**

---

## Step 9: Install SSL Certificate (Optional but Recommended)

For Full (strict) SSL mode, install a certificate on the server:

```bash
ssh root@46.224.211.159
```

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate (follow the prompts)
certbot --nginx -d viktorvansteenweghen.com -d www.viktorvansteenweghen.com

# Verify auto-renewal is working
certbot renew --dry-run
```

---

## Deployment Workflow

The GitHub Actions workflow is located at `.github/workflows/deploy.yml`.

**What happens on every push to `main`:**

1. GitHub checks out the code
2. Installs Node.js 20
3. Runs `npm ci` to install dependencies
4. Runs `npm run build` to create the `dist` folder
5. Copies `dist/*` to `/var/www/blog` on the server via SCP

---

## Manual Deployment (if needed)

If you need to deploy manually:

```bash
# Build locally
npm run build

# Copy to server
scp -r dist/* deploy@46.224.211.159:/var/www/blog/
```

---

## Troubleshooting

### Check Nginx status
```bash
systemctl status nginx
nginx -t
```

### Check Nginx logs
```bash
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### Restart Nginx
```bash
systemctl restart nginx
```

### Check if site is being served
```bash
curl -I http://localhost
```

### Check deploy user permissions
```bash
ls -la /var/www/blog
```

### Test SSH connection
```bash
ssh -i ~/.ssh/github_actions_deploy deploy@46.224.211.159
```

---

## Quick Reference Commands

```bash
# SSH as root
ssh root@46.224.211.159

# SSH as deploy user
ssh deploy@46.224.211.159

# Restart Nginx
systemctl restart nginx

# View deployed files
ls -la /var/www/blog

# Check disk space
df -h

# Check memory
free -m
```
