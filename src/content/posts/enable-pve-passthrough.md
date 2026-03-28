---
title: PVE显卡直通的部分踩坑
published: 2026-03-28
description: '仅记录了个人配置时的踩的一些坑，后续文章可能会有更新。'
image: 'https://cdn.imgos.cn/vip/2026/03/28/69c7efc86453b.png'
tags: [PVE]
category: '踩坑'
draft: false 
lang: ''
---

# PVE 显卡直通的部分踩坑
:::note[文章不包含所有的问题]
仅记录了个人配置时的踩的一些坑，后续文章可能会有更新。
:::

## 开启VT-d后，依旧提示 doesn't support X2APIC mode
```
mic@moe-pve:~# dmesg | grep remapping
[    0.522241] DMAR-IR: Enabled IRQ remapping in xapic mode
[    0.522243] x2apic: IRQ remapping doesn't support X2APIC mode
```
检查 BIOS 中的如下选项是否开启，如图需要设置为 Enabl:   
IntelRCSetup - X2APIC   
IntelRCSetup - X2APIC_OPT_OUT Flag
![](https://cdn.imgos.cn/vip/2026/03/28/69c7efc86453b.png)
