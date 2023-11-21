#!/bin/bash

file="public/stun.json"
token="CmH6FDe1DR7Gr5hycfiasjFlYa7yGKpp"

cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd

## Step 1: 获取token
#token=$(curl -s -X POST -H "Content-Type: application/json" -d '{"Account":"666","Password":"666","TwoFA":""}' http://192.168.1.11:16601/api/login | jq -r '.token')
#if [ -z "$token" ]; then
#    echo "获取token失败. Exiting."
#    exit 1
#fi

# Step 2: 获取stun列表
response=$(curl -s -X GET -H "Content-Type: application/json" -H "OpenToken: $token" "http://192.168.1.11:16601/api/stunrulelist?_=$(date +%s)" | sed 's/\\\"/'\''/g' | sed 's/"LogContent":".*","LogTime"/"LogContent":"","LogTime"/')
if [ -z "$response" ]; then
    echo "Error: Failed to fetch stun information."
    exit 1
fi
# Step 3: 解析生成stun.json文件
echo "$response" | jq -r '.list | map({name: .Name, public: .PublicAddr})' > $file
if [ ! -s "$file" ]; then
    echo "生成文件[${file}]失败."
    exit 1
fi

git add .
git commit -m "$(date '+%Y-%m-%d %H:%M:%S')"
git pull origin main
git push origin main
echo "success!"
