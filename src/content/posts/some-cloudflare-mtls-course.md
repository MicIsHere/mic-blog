---
title: 基于 Cloudflare mTLS 如何使用的部分教程
published: 2026-01-11
description: 'mutual TLS 简称 mTLS，是一种相互身份验证的方法，提供了额外的验证。关于 Cloudflare mTLS 如何使用的部分教程/踩坑'
image: 'https://img.miku.ren/i/2026/01/11/696357f7efb61.webp'
tags: [Cloudflare, mTLS]
category: '教程'
draft: false 
lang: ''
---
## 什么是 mTLS ?
https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/  
**mutual TLS** 简称 mTLS，是一种相互身份验证的方法。
mTLS 通过验证他们都拥有正确的私有密钥来确保网络连接两端的各方都是他们声称的身份。他们各自的 TLS 证书中的信息提供了额外的验证。

## 证书创建
https://developers.cloudflare.com/learning-paths/mtls/concepts/mtls-cloudflare/ 
> By default, 100 Client Certificates per Zone are included for free. For more certificates or API Shield features, contact your account team.
"默认情况下，每个区域免费包含 100 个客户端证书。有关更多证书或 API Shield 功能，请联系您的客户团队。"

每个域名最多包含 **100** 个客户端证书，目前不清楚过期后是否占位。
创建的证书不会再显示公钥/私钥，且官方没有提供备注这种方式，所以请一定牢记你的证书。
建议即便进行测试，每天最多创建一个客户端证书，这样可以通过记录到期日期来确定证书，方便处理。

## 证书吊销
在 Cloudflare 中，我们一般使用其作为机构签发的证书，而证书**只能执行吊销，不能删除**。
https://developers.cloudflare.com/ssl/client-certificates/revoke-client-certificate/ 

>It is not possible to permanently delete client certificates generated with the default Cloudflare Managed CA
"无法永久删除使用默认 Cloudflare 托管 CA 生成的客户端证书"

在 Cloudflare 的 WAF 中**默认没有验证证书是否吊销**，同时GUI编辑器中也没有提供这一选项，我们需要自行处理 WAF 防火墙中的自定义规则
```
// 当证书被吊销时返回 True
cf.tls_client_auth.cert_revoked = true
```
例如你可以这样配置: 
```
// 当客户端证书未被验证或证书被吊销，且请求的 URL 路径中包含/admin时进行匹配。
((not cf.tls_client_auth.cert_verified or cf.tls_client_auth.cert_revoked) and http.request.uri.path in {"/admin"}) 
```