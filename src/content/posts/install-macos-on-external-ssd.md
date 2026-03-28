---
title: 将MacOS安装到外置硬盘中的部分踩坑
published: 2026-02-19
description: '实际用了两三个月，除了硬盘盒发热严重，导致需要配一个散热器以外，大容量存储带来的好处是巨大的。'
image: 'https://cdn.imgos.cn/vip/2026/03/28/69c7e918c9771.png'
tags: [MacOS]
category: '踩坑'
draft: false 
lang: ''
---

:::warning[文章中不包含完整安装教程]
该文章是 https://www.bilibili.com/video/BV1m2rUYcEQA 视频的补充  
安装流程请观看此视频，确保做好功课。
:::

# 前言与实际体验
这篇文章是在安装时编写的，装好后我实际用了两三个月。  
除了硬盘盒发热严重，导致需要配一个散热器（或者买带散热器的硬盘盒）以外，大容量存储带来的好处是巨大的。  
**文章中操作的主机为 Mac Mini (2024)，理论 M 系列芯片通用**

# 部分建议与踩坑

## 购买设备
笔者用的是很久之前买的致钛 Ti600 1TB，硬盘盒是看测评买的麦沃  
麦沃这款硬盘盒没有散热器，所以我随便挑了一个半导体散热器 ~~可能有点灵车方案但是便宜要什么自行车~~  
![购买记录](https://cdn.imgos.cn/vip/2026/03/28/69c7e9762bdcb.png)  

至于绿联...只能说预算超标吧，不过多一个风扇就比原产品贵了 100 多，这...
![家境贫寒](https://cdn.imgos.cn/vip/2026/03/28/69c7e9b0b1f47.png)  
我这一套才 242 块（）

## 安装硬盘建议

这是内置硬盘速度
![Mac Mini内置硬盘](https://cdn.imgos.cn/vip/2026/03/28/69c7ea0ed4d2c.png)

这是外接硬盘速度
![外接致钛 Ti600 1TB](https://cdn.imgos.cn/vip/2026/03/28/69c7ea0ed7b9c.png)

而这是 PCIE3.0 的盘搭配 10Gbps的硬盘盒
![0994e15a12ac5d097db7e6f3061aac2e](https://cdn.imgos.cn/vip/2026/03/28/69c7ea0e936ba.png)
可以看出 40Gbps 的硬盘盒速度比内置的硬盘还要快，但10Gbps的很明显不够用。

## 在 AppStore 中搜索不到 macOS Tahoe (26.1)
https://support.apple.com/zh-cn/102662  
查询得知需要使用终端下载
> 使用 “终端”  
你可以使用 “终端” 来下载兼容的 macOS 版本（需不低于 Mac 出厂时安装的版本，或者为仍然可用的最接近版本）的安装器。  
确保你的 Mac 运行的是 macOS Catalina 10.15 或更高版本。  

打开“终端”，它位于“应用程序”文件夹的“实用工具”文件夹中。或者使用菜单栏中的“聚焦”查找并打开它。  
在“终端”中键入以下命令，将 <number> 替换为你想下载的兼容 macOS 所对应的最新 macOS 版本号
```
softwareupdate --fetch-full-installer --full-installer-version <number>
```
在这里我们需要下载 26.1的版本，所以输入
```
softwareupdate --fetch-full-installer --full-installer-version 26.1
```
![截屏2026-01-15 10.30.26](https://cdn.imgos.cn/vip/2026/03/28/69c7ea7d8671c.png)

按下 Return 键以输入这个命令。当 macOS 下载到“应用程序”文件夹时，“终端”会显示已安装（已下载）的百分比。如果“终端”显示未找到更新，则表示这个版本的 macOS 不适用于你的 Mac。  
你可以输入 `softwareupdate --list-full-installers` 以获取当前适用于你的 Mac 的 macOS 版本列表。  
打开“应用程序”文件夹，然后连按两下名为“安装 [版本名称]”的 macOS 安装器，接着按照屏幕上的安装说明操作。或者，将安装器留在“应用程序”文件夹中供以后使用。  

### 报错：Install failed with error: This Mac does not have enough free space to update.
![截屏2026-01-15 10.28.24](https://cdn.imgos.cn/vip/2026/03/28/69c7ea7b1dde2.png)

使用终端下载安装器时会出现，清理你的系统硬盘即可，建议至少留出32Gb的空间

# 常见错误
## 不能从你正运行的 macOS 版本使用此安装器
![](https://cdn.imgos.cn/vip/2026/03/28/69c7eabe4b944.png)  
错误常见于系统为 macOS Tahoe 但尝试运行更低的系统版本安装器（比如运行macOS Sequoia）
下载与你当前系统版本一致的安装器即可，如果你的系统是 macOS Tahoe，安装教程在上面

## 当前启动宗卷的…还需要…空间才能安装在此磁盘上
![](https://cdn.imgos.cn/vip/2026/03/28/69c7eaea89163.png)
原因是用于 **启动 MacOS** 的硬盘空间不足
按照安装器的提示清理出所需空间即可

## 提示迁移流程已完成，但重启后仍出现提示，无法进入桌面
:::caution[有关 '迁移助理' 可能出现问题的重要警告]
在 MacOS 版本为 26.1 的环境中，**使用迁移助理进行传输数据后，系统无法正常使用**。  
包括但不限于直接从内置磁盘导入、从时间机器备份中导入。  
以上两种行为会导致无法连接到任何网络、系统异常卡顿、甚至无法启动，目前未找到任何解决方案。  
:::

**正常情况下重启两至三次是正常的**
![](https://cdn.imgos.cn/vip/2026/03/28/69c7eb351159c.png)

![](https://cdn.imgos.cn/vip/2026/03/28/69c7eb352346d.png)
按下 Command+Q 可以直接退出。

### 由于此 Mac 的安全性设置被修改，Apple Pay 已停用
![](https://cdn.imgos.cn/vip/2026/03/28/69c7eb33c3d8d.png)
系统自身限制，当从外置硬盘启动后无法使用内建的硬件级加密。

:::note[有关 MacOS 的安全介绍 (引用自 BV1Kx4y1k7bs 视频评论区)]
相比安装在内置硬盘（仅限搭载了T2芯片或Apple Silicon的机型）的macOS，数据加密（FileVault）的安全性有很大地下降。  
外置硬盘数据加密的密钥没有 SoC 内硬件加密引擎的保护，不提供防暴力破解机制以及安全数据删除功能，纯粹基于软件管理加密密钥，所以外置硬盘的FileVault可以在不同的设备上解密（内置硬盘只能在本机解密）。  
而且安全数据删除困难。如果是内置硬盘的加密，只要在设置里执行了抹掉所有内容，所有曾经在内置硬盘的加密数据立马就立刻被永久销毁，不可恢复，甚至在扩容后的新硬盘上执行抹掉，把旧硬盘装回去也不能恢复旧硬盘上的数据了，只要是经过内置加密引擎管理，密钥都会在此刻失效。
:::

### 使用时掉盘 / 断电，连接到C口的设备全都断电
这个问题我没遇见过，以下引用自 BV1Kx4y1k7bs 视频评论区
> MacMini M4 后侧的三个 C 口似乎是共用一个雷电芯片  
> 单口供电是 TB4 协议要求的最低值: 5V-3A。  
> 当一个口的功率超过负载后，后面三个口"有可能"同时断电，即相当于突然拔掉硬盘。