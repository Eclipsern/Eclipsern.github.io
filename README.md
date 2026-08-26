# Wenqin Zhou — Homepage

Wenqin Zhou 的个人学术主页。项目使用 React、TypeScript 与 Vite 构建，并通过 GitHub Actions 部署到 GitHub Pages。

## 本地运行

需要 Node.js 24 或更新版本。

```powershell
npm install
npm run dev
```

Vite 会在终端中显示本地访问地址，通常为 `http://127.0.0.1:5173/`。

## 验证

```powershell
npm test
npm run build
```

`npm test` 运行组件与数据测试；`npm run build` 进行 TypeScript 检查并把静态网站输出到 `dist/`。

## 更新个人资料

编辑 [`src/data/profile.ts`](src/data/profile.ts)：

- `name`：姓名
- `email`：公开邮箱
- `bio`：简短介绍
- `avatar`：头像路径
- `avatarAlt`：头像替代文本

更换头像时，用新图片替换 `public/avatar.jpg`，并保持文件名不变。

## 添加论文

编辑 [`src/data/publications.ts`](src/data/publications.ts)，在 `publications` 数组中添加记录。

- `id`：站内唯一标识，建议使用论文标题的短横线写法
- `title`：论文标题
- `authors`：按署名顺序排列的作者数组
- `venue`：会议或期刊名称
- `year`：发表年份
- `summary`：可选的简短说明
- `image`：可选的封面图片路径
- `links.paper`：可选的论文地址
- `links.code`：可选的代码地址

下面仅为数据格式示例，不会出现在当前页面：

```ts
{
  id: 'example-paper',
  title: 'Example Paper Title',
  authors: ['Wenqin Zhou', 'Example Collaborator'],
  venue: 'Example Conference',
  year: 2027,
  summary: 'One sentence describing the contribution.',
  image: './images/example-paper.jpg',
  links: {
    paper: 'https://example.com/paper',
    code: 'https://example.com/code',
  },
}
```

存放论文图片时，在 `public/images/` 中添加图片，并使用相对路径 `./images/文件名`。

## 添加项目

编辑 [`src/data/projects.ts`](src/data/projects.ts)，在 `projects` 数组中添加记录。

- `id`：站内唯一标识
- `name`：项目名称
- `year`：项目年份
- `description`：项目说明
- `image`：可选的项目图片路径
- `link`：可选的项目地址

下面仅为数据格式示例：

```ts
{
  id: 'example-project',
  name: 'Example Project',
  year: 2027,
  description: 'A short description of the project.',
  image: './images/example-project.jpg',
  link: 'https://example.com/project',
}
```

## 添加奖项

编辑 [`src/data/awards.ts`](src/data/awards.ts)，在 `awards` 数组中添加记录。

- `id`：站内唯一标识
- `name`：奖项名称
- `issuer`：颁发机构
- `year`：获奖年份
- `description`：可选的补充说明

下面仅为数据格式示例：

```ts
{
  id: 'example-award',
  name: 'Example Award',
  issuer: 'Example Organization',
  year: 2027,
  description: 'Optional context about the award.',
}
```

当前三个线上数据数组均为空，直到主页所有者加入真实内容。README 中的示例不会被应用导入。

## 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库的 `main` 分支。
2. 打开仓库的 **Settings → Pages**。
3. 在部署来源中选择 **GitHub Actions**。
4. 打开 **Actions** 页面，等待 **Deploy to GitHub Pages** 工作流完成。

工作流会依次执行 `npm ci`、测试和生产构建，验证通过后发布 `dist/`。Vite 使用相对资源路径，因此既支持用户主页仓库，也支持普通项目仓库。
