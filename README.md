# laf-mqtt-aedes
在laf云平台上，使用aedes库，提供基于websocket的mqtt-broker服务

## 参考资料
- https://www.lafyun.com
- [aedes](https://github.com/moscajs/aedes)
- [物联网应用中，mqtt对比http](https://zhuanlan.zhihu.com/p/473594063)
- [发布-订阅模式](https://zhuanlan.zhihu.com/p/182546537)

## 项目优势
- 利用laf云的在线云函数优势，可以快速建立自己的云服务
- 建设以云函数为中心的物联网系统，实时管理成千上万的设备
- 采用标准的mqtt协议，基于websocket技术，进行双向通讯管理

## lafyun配置
- 注册并登录，建立你自己的应用，会获取一个 https://xxx.lafyun.com的应用域名
- 在云函数中，建立好3个云函数
  - init-mqtt-broker，配置为`App:ready`事件触发，app启动时候运行
  - ws-init-mqtt，配置为Websocket:onconnection事件触发
  - test-mqtt，供调试查询服务器mqtt状态使用

## 测试mqtt服务器场景
- 参见测试文章：

## 改进和贡献
- 请提出你的issue，我会不定期查看
