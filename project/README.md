# 盲盒抽奖商城系统

## 技术选型

- 前端：Vite + React + TailwindCSS
- 后端：Node.js（可选 Express/Koa 等框架）

## 项目结构

```
project/
├── frontend/    # 前端项目（Vite + React + TailwindCSS）
└── backend/     # 后端项目（Node.js 技术栈）
```

## 初始化步骤

### 1. 前端
```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# 配置 TailwindCSS
```

### 2. 后端
```bash
cd backend
npm init -y
npm install express
# 或根据需要选择其他 Node.js 框架
```

---

你可以根据上述结构和命令初始化你的项目。如果需要自动化脚本或详细配置，请告知！ 