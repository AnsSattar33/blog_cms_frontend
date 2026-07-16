"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
          class: "text-primary underline underline-offset-2",
        },
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert min-h-[200px] max-w-none px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>");
    }
  }, [editor, value]);

  if (!editor) return null;

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const raw = window.prompt("Enter link URL", previous ?? "https://");
    if (raw === null) return;

    const href = normalizeUrl(raw);
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href })
      .run();
  };

  const tools = [
    {
      icon: Bold,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: Heading2,
      label: "Heading",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: List,
      label: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      label: "Numbered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      icon: LinkIcon,
      label: "Insert link",
      action: setLink,
      active: editor.isActive("link"),
    },
    {
      icon: Unlink,
      label: "Remove link",
      action: () => editor.chain().focus().extendMarkRange("link").unsetLink().run(),
      active: false,
      disabled: !editor.isActive("link"),
    },
  ];

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "overflow-hidden rounded-xl border bg-background",
          error && "border-destructive"
        )}
      >
        <div className="flex flex-wrap gap-1 border-b bg-muted/30 p-2">
          {tools.map(({ icon: Icon, label, action, active, disabled }) => (
            <Button
              key={label}
              type="button"
              variant={active ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={action}
              disabled={disabled}
              title={label}
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <EditorContent editor={editor} />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
