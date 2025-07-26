---
title: 修复 TrueNas 无法获取应用程序列表
published: 2025-03-09
description: '如何修复 TrueNas 在线获取应用程序列表时出现错误:  Failed to clone https://github.com/truenas/apps repository at...'
image: 'https://img.miku.ren/i/2025/03/09/67cd6da5d7e0b.png'
tags: [TrueNas]
category: '教程'
draft: false 
lang: ''
---

:::note[总结]
查看你的 **网络 - 全局配置 - 设置 - DNS服务器** 是否填写。  
一般填写网关IP即可，如果你的网关不提供 DNS 服务，请自行寻找可用的 DNS 服务。
:::

## 前言
从黑群晖转到了 TrueNas，安装好后发现获取不到应用列表，网上找了很多方法都没有用。  
结果在测 Nas 网络连通性的时候发现不太对。  
![?](https://img.miku.ren/i/2025/03/09/67cd70c710d15.png)

## 解决办法
进入 网络 - 全局配置 - 设置 - DNS服务器  
设置 DNS 为网关IP后解决。