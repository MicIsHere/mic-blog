---
title: MacOS 如何将Sublime Text作为文件默认打开方式
published: 2026-02-04
description: ''
image: 'https://cdn.imgos.cn/vip/2026/03/28/69c7e80a387c8.png'
tags: [DUTI, MacOS, Sublime Text]
category: '教程'
draft: false 
lang: ''
---
教程对大部分文本编辑器应该都是通用的，这里用Sublime Text做演示。

## 安装 DUTI
::github{repo="moretension/duti"}  
DUTI（Do Utility）是一个开源的命令行工具，专门用于配置 macOS 系统中文件类型与应用程序之间的关联。通过 duti，你可以设置特定文件类型、URL 协议等的默认打开方式。
```
brew install duti
```

## 获取软件包名
安装完成后使用以下代码获取编辑器的包名，得到结果 com.sublimetext.4  
其中 **"Sublime Text"** 更改为你需要作为默认打开方式的编辑器名称
```
osascript -e 'id of app "Sublime Text"'
```
## 执行脚本

执行以下脚本，把上文获取的包名填入 APP_ID  
如果你需要让更多的文件以这个软件打开，按照格式向 extensions 内增加即可
```
APP_ID="com.sublimetext.4"

duti -s "$APP_ID" public.json all
duti -s "$APP_ID" public.plain-text all
duti -s "$APP_ID" public.python-script all
duti -s "$APP_ID" public.shell-script all
duti -s "$APP_ID" public.source-code all
duti -s "$APP_ID" public.text all
duti -s "$APP_ID" public.unix-executable all
duti -s "$APP_ID" public.data all

extensions=(
  c cpp cs css go java js sass scss less vue
  cfg json jsx log lua md php pl py rb ts tsx
  txt conf yaml yml toml
)

for ext in "${extensions[@]}"; do
  duti -s "$APP_ID" ".$ext" all
done
```
