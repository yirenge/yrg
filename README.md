# yrg
yrg

yrg is a wonderful project ,i am working now.



## 注意事项  
### windows 端口占用情况参考
https://blog.csdn.net/PETER327447/article/details/80564579

1. 根据网上博客查询哪些PID暂用端口，命令如下：
netstat -aon | findstr :80

2. 根据所查进程PID=4，使用如下命令：
tasklist|findstr “4300”

3. 启动项设置
   msconfig

4. npm registry,设置为淘宝之后，立马快了
   config get registry https://registry.npm.taobao.org/
### nginx 1.17.5在window上proxy_pass无效，更换为1.16.1终于工作了。

### ref
https://github.com/xuguangwen/nodeStation