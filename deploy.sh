#!/bin/bash
SERVER="ubuntu@51.21.160.114"
KEY="~/.ssh/key1"
REMOTE_DIR="/var/www/mysite"

echo "🚀 Deploying static site to $SERVER..."
rsync -avz --delete -e "ssh -i $KEY" ./ $SERVER:$REMOTE_DIR/
echo "✅ Deployment complete!"
