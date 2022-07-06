## 基于json-db的后端评论系统

1. npm run dev
2. localhost:3000/message/insert, localhost:3000/message/reply 测试接口
3. npm run build 生成bundle.js 拷贝到服务器目录
4.
forever list
forever stop -a dist/bundle.js 
forever start -a dist/bundle.js 

nginx -s reload
