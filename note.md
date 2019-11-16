

6. mysql 老是报1051和1045的错误，
   ```
    code: 'ER_ACCESS_DENIED_ERROR',
    errno: 1045,
    sqlMessage: "Access denied for user 'root'@'localhost' (using password: YES)",
    sqlState: '28000',
    fatal: true
   ```
  按照网上的做法，总是解决不了，因为老是报的root账户的错误，但是我并没有用root，而是另外一个账户，奇了怪了，那么是哪里用了root账户呢？当时就应该在代码里面查找root账户的使用情况的，但是没往这个方向查，导致在网上搜了很多都是重复的内容，但是就是解决不了问题，
  按照5的步骤，能解决1051的问题，但是1045的问题，一直没头绪，找了一天的解决方案，都没找到，最后在看代码的时候，搜索mysql.居然搜索出来一堆的mysql.的调用，但是配置都是错误的，所以一直报deny的错误。当时为何没有想到在代码里面搜索错误的配置的做法呢？要根据错误发散才能较快解决问题。
```
var db = mysql.createPool({ host: 'localhost', user: 'root', password: 'root', database: 'web' });
```