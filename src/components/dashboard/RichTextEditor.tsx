"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  RotateCcw,
  RotateCw,
  Indent,
  Outdent,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const buttons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: "bold",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: "italic",
    },
    {
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: "underline",
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: "bulletList",
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: "orderedList",
    },
    {
      icon: Indent,
      action: () => editor.chain().focus().sinkListItem("listItem").run(),
      disabled: () => !editor.can().sinkListItem("listItem"),
    },
    {
      icon: Outdent,
      action: () => editor.chain().focus().liftListItem("listItem").run(),
      disabled: () => !editor.can().liftListItem("listItem"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50/50 rounded-t-xl">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.preventDefault();
            btn.action();
          }}
          disabled={btn.disabled ? btn.disabled() : false}
          className={cn(
            "p-2 rounded-lg transition-all hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed",
            btn.active && editor.isActive(btn.active)
              ? "text-blue-600 bg-white shadow-sm"
              : "text-gray-500",
          )}
        >
          <btn.icon className="w-4 h-4" />
        </button>
      ))}
      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className="p-2 rounded-lg text-gray-500 hover:bg-white"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className="p-2 rounded-lg text-gray-500 hover:bg-white"
      >
        <RotateCw className="w-4 h-4" />
      </button>
    </div>
  );
};

export const RichTextEditor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder || "Start typing..." }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none min-h-[150px] p-4 text-gray-800",
      },
    },
  });

  // Sync value if changed from outside (e.g. Reset)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .ProseMirror ul ul {
          list-style-type: circle;
        }
        .ProseMirror ul ul ul {
          list-style-type: square;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
      `}</style>
    </div>
  );
};
