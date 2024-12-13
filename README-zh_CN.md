# Marktion

Marktion 是一个基于 [ProseMirror](https://prosemirror.net/) 构建的现代化 Markdown 编辑器，集成了 AI 辅助写作功能。它提供了一个直观的用户界面，支持实时预览和丰富的编辑功能。

## ✨ 特性

- 📝 所见即所得的 Markdown 编辑体验
- 🤖 集成 AI 辅助写作功能（支持 Deepseek）
- 🎨 美观的用户界面和主题支持
- 📦 模块化设计，易于扩展
- 🚀 高性能，支持大文档编辑
- 💾 自动保存和版本控制
- 🔍 强大的搜索和替换功能
- 📱 响应式设计，支持移动端

## 🚀 快速开始

### 在线体验

访问我们的[在线演示](https://marktion.io)来体验 Marktion。

### 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/marktion.git
cd marktion
```

2. 安装依赖：
```bash
pnpm install
```

3. 创建环境配置文件：
```bash
cp apps/site/.env.sample apps/site/.env
```

4. 配置环境变量：
编辑 `.env` 文件，添加必要的配置：
```
DEEPSEEK_API_KEY=your-api-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

5. 启动开发服务器：
```bash
pnpm dev
```

现在你可以访问 http://localhost:3000 来查看项目。

## 🔧 配置说明

### 环境变量

- `DEEPSEEK_API_KEY`: Deepseek API 密钥
- `NEXT_PUBLIC_API_URL`: API 服务器地址
- `DATABASE_URL`: 数据库连接 URL
- `SESSION_KEY`: 会话密钥
- `GITHUB_CLIENT_ID`: GitHub OAuth 客户端 ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth 客户端密钥

### Cloudflare Pages 部署

1. 在 Cloudflare Pages 中创建新项目
2. 配置构建设置：
   - 构建命令：`pnpm install && pnpm build`
   - 输出目录：`.next`
   - Node.js 版本：18.x 或更高
3. 添加环境变量
4. 部署并验证功能

## 🛠️ 技术栈

- 前端框架：Next.js
- UI 组件：Ant Design
- 编辑器核心：ProseMirror
- AI 服务：Deepseek
- 构建工具：Turbo
- 包管理器：pnpm

## 📦 项目结构

```
marktion/
├── apps/                # 应用程序
│   └── site/           # 主站点
├── packages/           # 共享包
│   ├── marktion/      # 核心编辑器
│   └── ui/            # UI 组件
├── examples/          # 示例项目
└── scripts/           # 工具脚本
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -am 'Add some feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- [ProseMirror](https://prosemirror.net/)
- [Deepseek](https://deepseek.com/)
- [Next.js](https://nextjs.org/)
- [Ant Design](https://ant.design/)

## 安装和使用

1. 安装依赖项。

```bash
npm intall marktion
```

2. 使用方法

```tsx
import { ReactEditor } from 'marktion';
import 'marktion/dist/style.css';

function Editor() {
  return <ReactEditor content={`# Hello World`} />;
}
```

3. 示例

您可以查看示例以查看 [marktion.io](https://marktion.io/)  的实际应用。

## API

### ReactEditorProps

| **属性**               | **描述**                   | **类型**                                                                                   | **默认值** |
| ---------------------- | -------------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| content                | 编辑器的初始 Markdown 内容 | string                                                                                     | -          |
| dark                   | 是否启用 Dark 模式         | boolean                                                                                    | false      |
| uploadOptions.uploader | 处理上传图片的回调函数     | `(file: File, event: ClipboardEvent \| InputEvent, view: ProsemirrorView) => Promise<url>` | -          |
| renderer               | 渲染模式                   | `WYSIWYG` \| `SOURCE`                                                                      |            |
| onChange               | 当文档内容变化时回调       | `(editor: Marktion) => void`                                                               |            |

请参考 [tiptap 的文档](https://tiptap.dev/installation/react) 以获取更多 API 信息。

### MarktionRef

| **属性**    | **描述**                            | **类型**       | **默认值** |
| ----------- | ----------------------------------- | -------------- | ---------- |
| getMarkdown | 返回当前编辑器中的 Markdown 内容    | `() => string` | -          |
| editor      | tiptap 编辑器实例，[**了解更多**]() | Editor         | -          |

使用示例：

```tsx
import { ReactEditor, ReactEditorRef } from 'marktion';

function App() {
  const editorRef = useRef<ReactEditorRef>(null);

  const onExport = () => {
    const content = editorRef.current?.editor.getContent();
    console.log(content);
  };

  return (
    <>
      <button onClick={onExport}>export</button>
      <ReactEditor ref={editorRef} />
    </>
  );
}
```

## Plugins

### AI Plugin

> AI Plugin 是基于 vercel ai 实现的，在开始之前，你需要先创建一个 AI router，[参考文档](https://sdk.vercel.ai/docs/getting-started)

使用示例:

```tsx
function Editor() {
  const ai = useAI({
    basePath: import.meta.env.VITE_OPENAI_BASE_URL
  });

  return <ReactEditor ref={editorRef} plugins={[ai.plugin]} />;
}
```

## 贡献

感谢您考虑为 Marktion 做出贡献！如果您希望参与项目，请按照以下步骤：

1. 将仓库 Fork 到您的 GitHub 账户。

2. 将 Fork 的仓库克隆到本地机器。

```bash
git clone https://github.com/yourusername/marktion.git
cd marktion
```

3. 安装依赖项。

```bash
pnpm i
```

4. 进行更改并测试您的修改。

5. 提交您的更改。

6. 创建一个拉取请求。

转到原始仓库并点击“New Pull Request”。填写必要的细节并描述您所做的更改。

我们将尽快审核您的拉取请求。感谢您的贡献！

## 许可证

该项目基于 MIT 许可证。有关更多详细信息，请参阅 [LICENSE](https://github.com/microvoid/marktion/blob/main/LICENSE) 文件。

## 联系方式

如果您有任何疑问、建议或问题，请随时通过以下方式联系我们：

- 电子邮件：<whistleryz@gmail.com>

- Issue Tracker: 项目问题（请在问题标题中注明问题类型）
