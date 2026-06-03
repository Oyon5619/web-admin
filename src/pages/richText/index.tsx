import { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TurndownService from "turndown";
import { Button, Space, message, Tag, Tabs, Card } from "antd";
import { downloadFile } from "@/utils/fileUtils";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  BlockOutlined,
  CodeOutlined,
  LinkOutlined,
  UndoOutlined,
  RedoOutlined,
  LoadingOutlined,
  MinusOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import styles from "./richText.module.less";

const RichTextDemo = () => {
  const [previewMode, setPreviewMode] = useState<"html" | "markdown">("html");
  const [copied, setCopied] = useState(false);

  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: `<h2>欢迎使用富文本编辑器</h2>
      <p>这是一个基于 <strong>Tiptap</strong> 的富文本编辑器 demo。</p>
      <p>你可以：</p>
      <ul>
        <li>编辑文本并设置 <strong>粗体</strong>、<em>斜体</em>、<u>下划线</u>、~~删除线~~</li>
        <li>创建标题、列表、代码块、引用等</li>
        <li>一键导出为 <strong>HTML</strong> 或 <strong>Markdown</strong> 文件</li>
      </ul>
      <blockquote>开始编辑你的内容吧！</blockquote>`,
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("输入链接地址：");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const getHTML = () => editor?.getHTML() ?? "";
  const getMarkdown = () => turndownService.turndown(getHTML());

  const handleCopy = async () => {
    const text = previewMode === "html" ? getHTML() : getMarkdown();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    message.success(`已复制${previewMode.toUpperCase()}到剪贴板`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = previewMode === "html" ? getHTML() : getMarkdown();
    const ext = previewMode === "html" ? "html" : "md";
    const mimeType = previewMode === "html" ? "text/html" : "text/markdown";
    downloadFile({ content, mimeType });
    message.success(`已导出为 .${ext} 文件`);
  };

  if (!editor) return null;

  const btnType = (active: boolean) => (active ? "primary" : "default");

  const previewContent = previewMode === "html" ? getHTML() : getMarkdown();

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>富文本编辑器 Demo</h2>

      {/* ===== 工具栏 ===== */}
      <Card size="small" style={{ marginBottom: 12 }}>
        <Space wrap>
          <Button
            icon={<LoadingOutlined />}
            type={btnType(editor.isActive("heading", { level: 1 }))}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          />
          <Button
            icon={<LoadingOutlined />}
            type={btnType(editor.isActive("heading", { level: 2 }))}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          />
          <Button
            icon={<LoadingOutlined />}
            type={btnType(editor.isActive("heading", { level: 3 }))}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          />
          <Button
            icon={<BoldOutlined />}
            type={btnType(editor.isActive("bold"))}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <Button
            icon={<ItalicOutlined />}
            type={btnType(editor.isActive("italic"))}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <Button
            icon={<UnderlineOutlined />}
            type={btnType(editor.isActive("underline"))}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
          <Button
            icon={<StrikethroughOutlined />}
            type={btnType(editor.isActive("strike"))}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />
          <Button
            icon={<CodeOutlined />}
            type={btnType(editor.isActive("code"))}
            onClick={() => editor.chain().focus().toggleCode().run()}
          />
          <Button
            icon={<CodeOutlined />}
            type={btnType(editor.isActive("codeBlock"))}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={btnType(editor.isActive("bulletList"))}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <Button
            icon={<OrderedListOutlined />}
            type={btnType(editor.isActive("orderedList"))}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <Button
            icon={<BlockOutlined />}
            type={btnType(editor.isActive("blockquote"))}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <Button
            icon={<MinusOutlined />}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
          <Button
            icon={<LinkOutlined />}
            type={btnType(editor.isActive("link"))}
            onClick={setLink}
          />
          <Button
            icon={<LinkOutlined />}
            disabled={!editor.isActive("link")}
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            移除链接
          </Button>
          <Button
            icon={<UndoOutlined />}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <Button
            icon={<RedoOutlined />}
            onClick={() => editor.chain().focus().redo().run()}
          />
        </Space>
      </Card>

      {/* ===== 编辑区域 ===== */}
      <Card size="small" style={{ marginBottom: 12 }}>
        <div
          className={styles.editorContent}
          style={{
            minHeight: 260,
            padding: "12px 16px",
            border: "1px solid #d9d9d9",
            borderRadius: 4,
            outline: "none",
          }}
        >
          <EditorContent editor={editor} />
        </div>
      </Card>

      {/* ===== 预览 & 导出 ===== */}
      <Card
        size="small"
        title="预览 & 导出"
        extra={
          <Space>
            <Tag color={editor.isActive("bold") ? "blue" : "default"}>
              光标所在:{" "}
              {editor.isActive("heading", { level: 1 })
                ? "标题1"
                : editor.isActive("heading", { level: 2 })
                  ? "标题2"
                  : editor.isActive("heading", { level: 3 })
                    ? "标题3"
                    : "正文"}
            </Tag>
          </Space>
        }
      >
        <Tabs
          activeKey={previewMode}
          onChange={(key) => setPreviewMode(key as "html" | "markdown")}
          items={[
            { key: "html", label: "HTML" },
            { key: "markdown", label: "Markdown" },
          ]}
        />
        <pre
          style={{
            background: "#f6f6f6",
            padding: 12,
            borderRadius: 4,
            maxHeight: 300,
            overflow: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            fontSize: 13,
          }}
        >
          {previewContent}
        </pre>
        <Space style={{ marginTop: 12 }}>
          <Button icon={<ExportOutlined />} onClick={handleDownload}>
            下载 .{previewMode === "html" ? "html" : "md"}
          </Button>
          <Button onClick={handleCopy}>复制{copied ? "成功" : ""}</Button>
        </Space>
      </Card>
    </div>
  );
};

export default RichTextDemo;
