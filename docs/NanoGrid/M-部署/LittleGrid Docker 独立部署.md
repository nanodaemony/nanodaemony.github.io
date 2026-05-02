## 前置准备

```bash
yum install git
git clone https://github.com/nanodaemony/little-grid.git
# 安装1Panel-其实就是安装Docker
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
# 自己安装Docker可以配置这个镜像地址
"https://docker.1panel.live"
```

## 环境配置

创建 `.env` 文件：

```bash
# ============================================================
# LittleGrid Docker 部署环境变量配置
# ============================================================
# ============================================================
# MySQL 数据库配置
# ============================================================
DB_ROOT_PASSWORD=Kx9mPq2vR7nB

# 数据库名称
DB_NAME=little-grid

# 数据库端口映射
DB_PORT=3306

# ============================================================
# Redis 配置
# ============================================================
REDIS_PWD=Wt4jYc8hF3sL

# Redis 端口映射
REDIS_PORT=6379

# ============================================================
# 服务端口配置
# ============================================================
BACKEND_PORT=8000
FRONTEND_PORT=8001

ADMIN_USERNAME=1154720425
ADMIN_PASSWORD=cz1174520425
```

## 部署命令

**部署顺序：MySQL → Redis → Backend → Frontend**

```bash
# 1. 部署 MySQL
./manage.sh mysql

# 2. 部署 Redis
./manage.sh redis

# 3. 部署 Spring Boot Backend
./manage.sh backend

# 4. 部署 Admin Web Frontend
./manage.sh frontend
```

## 管理命令

```bash
# 查看服务状态
./manage.sh status

# 查看 Spring Boot 日志
./manage.sh logs

# 重启后端服务
./manage.sh restart backend

# 停止服务
./manage.sh stop backend   # 停止单个服务
./manage.sh stop           # 停止所有服务

# 查看MySQL日志
docker logs --tail 100 littlegrid-mysql

```

## 访问地址

| 服务        | 地址                  |
| ----------- | --------------------- |
| Admin 后台  | http://服务器 IP:8001 |
| Backend API | http://服务器 IP:8000 |

## 手动部署命令

如不使用脚本，可手动执行：

### MySQL

```bash
docker run -d \
  --name littlegrid-mysql \
  --network littlegrid-network \
  --restart unless-stopped \
  -p 3306:3306 \
  -v littlegrid-mysql-data:/var/lib/mysql \
  -v $(pwd)/backend/sql:/docker-entrypoint-initdb.d:ro \
  -e MYSQL_ROOT_PASSWORD=your_password \
  -e MYSQL_DATABASE=eladmin \
  -e TZ=Asia/Shanghai \
  mysql:8.0 \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

### Redis

```bash
docker run -d \
  --name littlegrid-redis \
  --network littlegrid-network \
  --restart unless-stopped \
  -p 6379:6379 \
  -v littlegrid-redis-data:/data \
  redis:7-alpine \
  redis-server --requirepass your_password --appendonly yes
```

### Backend

```bash
cd backend && docker build -t littlegrid-backend:latest .
docker run -d \
  --name littlegrid-backend \
  --network littlegrid-network \
  --restart unless-stopped \
  -p 8000:8000 \
  -v $(pwd)/logs:/app/logs \
  -e SPRING_DATASOURCE_DRUID_URL="jdbc:p6spy:mysql://littlegrid-mysql:3306/eladmin?serverTimezone=Asia/Shanghai&characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true" \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  -e REDIS_HOST=littlegrid-redis \
  -e REDIS_PWD=your_password \
  littlegrid-backend:latest
```

### Frontend

```bash
cd admin-web && docker build -t littlegrid-frontend:latest .
docker run -d \
  --name littlegrid-frontend \
  --network littlegrid-network \
  --restart unless-stopped \
  -p 8001:8001 \
  --add-host=host.docker.internal:host-gateway \
  littlegrid-frontend:latest
```

### 查看日志

```bash
docker logs -f littlegrid-backend
```
