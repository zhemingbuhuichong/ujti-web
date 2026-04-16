# UJTI GitHub Pages Deployment

这份目录现在是给 GitHub Pages 用的，不再依赖你自己的域名，也不再依赖云服务器。

## 1. 新建一个中性的 GitHub 仓库

建议仓库名和账号名都别带你的真实姓名。

例如：

- GitHub 组织：`ujti-project`
- 仓库：`ujti`

这样以后地址会更干净。

## 2. 把当前目录初始化成新仓库

在项目根目录里执行：

```bash
git init
git add .
git commit -m "feat: prepare github pages deployment"
```

然后把远程仓库接上：

```bash
git remote add origin <你的新 GitHub 仓库地址>
git branch -M main
git push -u origin main
```

## 3. 在 GitHub 仓库里开启 Pages

这个目录里已经带了 GitHub Actions 工作流。

你需要在仓库设置里做两步：

1. 打开 `Settings -> Pages`
2. `Build and deployment` 里选择 `GitHub Actions`

之后每次推送到 `main`，GitHub 都会自动发布。

## 4. 访问地址

默认会是 GitHub Pages 提供的地址，例如：

- `https://<账号或组织名>.github.io/<仓库名>/`

如果你用的是组织主页仓库，也可能是：

- `https://<组织名>.github.io/`

## 5. 这个版本改了什么

为了适配 GitHub Pages，这里已经处理过：

- 删除了原先写死的自定义域名地址
- 保留相对路径资源引用，适合 Pages 静态托管
- 增加了 GitHub Pages 自动部署工作流

## 6. 以后怎么更新

以后只要改完代码再推一次：

```bash
git add .
git commit -m "chore: update site"
git push
```

GitHub Pages 会自动重新发布。
