#!/bin/bash

file="$(hostname).json"
token="CmH6FDe1DR7Gr5hycfiasjFlYa7yGKpp"

cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd

# Step 1: 获取stun列表
response=$(curl -s -X GET -H "Content-Type: application/json" -H "OpenToken: $token" "http://192.168.1.11:16601/api/stunrulelist?_=$(date +%s)")
if [ -z "$response" ]; then
    echo "Error: Failed to fetch stun information."
    exit 1
fi

# Step 2: 解析生成stun.json文件
echo "$response" | jq -r '.list | map({name: .Name, public: .PublicAddr})' > $file

if [ ! -s "$file" ]; then
    echo "生成文件[${file}]失败."
    exit 1
fi

# Step 3: 上传
git add .
git commit -m "$(hostname) $(date '+%Y-%m-%d %H:%M:%S')"
git pull origin script
git push origin script
echo "success!"
