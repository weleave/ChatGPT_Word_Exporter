# ChatGPT Word Exporter

这是一个 Chrome/Edge 插件原型，用来把 ChatGPT 网页里的回答导出成 `.docx`，并尽量保留公式为 Word 可识别的数学对象。
（可以参考“下载插件.docx”操作即可）
## 当前能力

- 导出当前页面中最近一条 ChatGPT 回答
- 如果你先在页面里选中一段文字，则只导出选中的部分
- 支持常见正文结构：段落、标题、列表、引用、代码块
- 优先提取页面里的 MathML；如果页面只给出 LaTeX，则退回 LaTeX 转 Word 公式

## 已知限制

- ChatGPT 页面结构如果后续调整，可能需要更新选择器
- 表格目前会被简化成普通段落
- 图片只会保留替代文字，不会嵌入文档

## 本地运行

```bash
npm install
npm run build
```

构建完成后会生成 `dist` 目录。

## 安装到浏览器

1. 打开 Chrome 或 Edge 的扩展管理页
2. 开启“开发者模式”
3. 选择“加载已解压的扩展程序”
4. 选择本项目的 `dist` 目录

## 使用方法

1. 打开 `https://chatgpt.com/` 或 `https://chat.openai.com/`
2. 进入一个包含公式的对话
3. 如果只想导出一部分内容，先手动选中那段回答
4. 点击插件按钮，然后点“导出当前回答”
5. 插件会生成一个 `.docx` 文件，直接用 Word 打开即可

## 验证

可以运行下面的命令做一个最小文档生成验证：

```bash
npm run smoke-test
```

执行后会在项目根目录生成 `smoke-test.docx`。
