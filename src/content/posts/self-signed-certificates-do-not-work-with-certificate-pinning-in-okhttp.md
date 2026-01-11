---
title: 在OkHTTP中自签名证书无法使用证书钉扎
published: 2025-05-05
description: '由于OkHTTP增加了额外的约束，使得我们无法在使用自定义TrustManagers的情况下使用证书钉扎(Certificate Pinning)'
image: ''
tags: [OKHTTP]
category: '踩坑'
draft: false 
lang: ''
---

:::warning
当前文章未完成，其中的内容随时可能发生改变。
:::

最近在写一些用HTTPS通讯的程序，最初因为使用了Cloudflare而受到免费计划的SSL限制  
更换到国内CDN后想用自签名证书给API接口用，发现不行..客户端会报错  

查询后发现是OkHttp的特别限制:  
[Issue 3951](https://github.com/square/okhttp/issues/3951)  
[Issue 1352](https://github.com/square/okhttp/issues/1352#issuecomment-72201911)  
并且不能够通过自定义TrustManagers，因为会直接不回报指纹:  
```
Exception in thread "main" javax.net.ssl.SSLPeerUnverifiedException: Certificate pinning failure!
  Peer certificate chain: # 自定义TrustManagers后，不回报任何指纹
  Pinned certificates for api.mic.run:
    sha256/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=
	at okhttp3.CertificatePinner.check$okhttp(CertificatePinner.kt:200)
	at okhttp3.internal.connection.RealConnection.connectTls(RealConnection.kt:410)
	at okhttp3.internal.connection.RealConnection.establishProtocol(RealConnection.kt:337)
	at okhttp3.internal.connection.RealConnection.connect(RealConnection.kt:209)
	at okhttp3.internal.connection.ExchangeFinder.findConnection(ExchangeFinder.kt:226)
	at okhttp3.internal.connection.ExchangeFinder.findHealthyConnection(ExchangeFinder.kt:106)
	at okhttp3.internal.connection.ExchangeFinder.find(ExchangeFinder.kt:74)
	at okhttp3.internal.connection.RealCall.initExchange$okhttp(RealCall.kt:255)
```

不自定义TrustManager的话JDK又会报 SSLHandshakeException，因为自签名证书不被信任，目前我想到的解决办法就是把自己验证的逻辑丢到里面，但把 @Overwrite 那里覆盖掉就解决了验证...   
所以在生产环境，还是老老实实用权威CA签发的证书吧。