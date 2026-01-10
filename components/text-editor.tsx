"use client";

import { useCallback, useState } from "react";
import {
  useEditor,
  EditorContent,
  Editor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import {
  BoldIcon,
  CodeIcon,
  CodeXml,
  HighlighterIcon,
  ImagePlus,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Quote,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
  Maximize,
  Minimize,
} from "lucide-react";
import { AssetSelector } from "@/components/dashboard/AssetSelector";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TiptapProps {
  content?: string | any;
  onChange?: (content: string | any) => void;
  output?: "html" | "json";
}

export default function Tiptap({ content, onChange, output = "html" }: TiptapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "tiptap-paragraph",
          },
        },
      }),
      Highlight.configure({ multicolor: true }),
      Image,
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-xl focus:outline-none max-w-none min-h-[150px]",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      if (output === "json") {
        onChange?.(editor.getJSON());
      } else {
        onChange?.(editor.getHTML());
      }
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-9999 bg-background flex flex-col p-4 w-screen h-screen overflow-hidden"
          : "bg-background relative rounded-lg border"
      }
    >
      <Toolbar
        editor={editor}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
      <div className={isFullscreen ? "flex-1 overflow-y-auto mx-auto w-full max-w-5xl rounded-lg" : ""}>
        <EditorContent
          editor={editor}
          className={
            isFullscreen
              ? "px-8 py-6 min-h-full"
              : "px-4 py-3 min-h-[300px]"
          }
        />
      </div>
      <BubbleMenu editor={editor} />
      <FloatingMenu editor={editor} />
    </div>
  );
}

// ────────────────────────────────────────────────
// Toolbar (top bar)
// ────────────────────────────────────────────────
function Toolbar({
  editor,
  isFullscreen,
  toggleFullscreen,
}: {
  editor: Editor;
  isFullscreen?: boolean;
  toggleFullscreen?: () => void;
}) {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isCode: ctx.editor.isActive("code"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
      isHighlight: ctx.editor.isActive("highlight"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isLink: ctx.editor.isActive("link"),
      canUndo: ctx.editor.can().chain().focus().undo().run(),
      canRedo: ctx.editor.can().chain().focus().redo().run(),
      headingLevel: getActiveHeadingLevel(ctx.editor),
    }),
  });

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number(value) as 1 | 2 | 3 | 4 | 5 | 6;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const addImage = useCallback((url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="bg-background sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b p-2">
      <Select
        value={state.headingLevel ?? "paragraph"}
        onValueChange={handleHeadingChange}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
          <SelectItem value="4">Heading 4</SelectItem>
          <SelectItem value="5">Heading 5</SelectItem>
          <SelectItem value="6">Heading 6</SelectItem>
        </SelectContent>
      </Select>

      <Toggle
        size="sm"
        pressed={state.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strikethrough"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()
        }
        aria-label="Highlight"
      >
        <HighlighterIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        aria-label="Code"
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isCodeBlock}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        aria-label="Code"
      >
        <CodeXml className="h-4 w-4" />
      </Toggle>

      <div className="bg-border mx-1 h-6 w-px" />

      <Toggle
        size="sm"
        pressed={state.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet List"
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        aria-label="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <div className="bg-border mx-1 h-6 w-px" />

      <LinkToggle editor={editor} isActive={state.isLink} />

      <div className="bg-border mx-1 h-6 w-px" />

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!state.canUndo}
        aria-label="Undo"
      >
        <UndoIcon className="h-4 w-4" />
      </Button>

      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!state.canRedo}
        aria-label="Redo"
      >
        <RedoIcon className="h-4 w-4" />
      </Button>

      <div className="bg-border mx-1 h-6 w-px" />
      <AssetSelector
        onSelect={addImage}
        trigger={
          <Button size="sm" variant="ghost" aria-label="Image">
            <ImagePlus className="h-4 w-4" />
          </Button>
        }
        folderPath="portfolio/test"
      />

      <div className="bg-border mx-1 h-6 w-px" />

      {toggleFullscreen && (
        <Toggle
          size="sm"
          pressed={isFullscreen}
          onPressedChange={toggleFullscreen}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Toggle>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// Reusable Link Toggle with Popover
// ────────────────────────────────────────────────
function LinkToggle({
  editor,
  isActive,
}: {
  editor: Editor;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const applyLink = () => {
    if (url.trim()) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setOpen(false);
    setUrl("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          pressed={isActive}
          aria-label={isActive ? "Remove link" : "Insert link"}
        >
          {isActive ? (
            <UnlinkIcon className="h-4 w-4" />
          ) : (
            <LinkIcon className="h-4 w-4" />
          )}
        </Toggle>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">Insert Link</h3>
          <Input
            autoFocus
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyLink();
            }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={applyLink}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ────────────────────────────────────────────────
// Bubble Menu (appears when text is selected)
// ────────────────────────────────────────────────
function BubbleMenu({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isUnderline: ctx.editor.isActive("underline"),
      isStrike: ctx.editor.isActive("strike"),
      isHighlight: ctx.editor.isActive("highlight"),
      isCode: ctx.editor.isActive("code"),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      isLink: ctx.editor.isActive("link"),
    }),
  });

  return (
    <TiptapBubbleMenu
      editor={editor}
      className="flex items-center gap-0.5 rounded-md border bg-background shadow-md p-1 z-50"
    >
      <Toggle
        size="sm"
        pressed={state.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isStrike}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isHighlight}
        onPressedChange={() =>
          editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()
        }
      >
        <HighlighterIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isCode}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <CodeIcon className="h-4 w-4" />
      </Toggle>

      <div className="bg-border h-6 w-px mx-1" />

      <Toggle
        size="sm"
        pressed={state.isBulletList}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isOrderedList}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={state.isBlockquote}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <div className="bg-border h-6 w-px mx-1" />

      <LinkToggle editor={editor} isActive={state.isLink} />
    </TiptapBubbleMenu>
  );
}

// ────────────────────────────────────────────────
// Floating Menu (appears near cursor)
// ────────────────────────────────────────────────
function FloatingMenu({ editor }: { editor: Editor }) {
  // Same content as BubbleMenu for simplicity
  // You can customize differently if desired
  return <BubbleMenu editor={editor} />;
}

// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────
function getActiveHeadingLevel(editor: Editor): string | null {
  for (let level = 6; level >= 1; level--) {
    if (editor.isActive("heading", { level })) return String(level);
  }
  if (editor.isActive("paragraph")) return "paragraph";
  return null;
}
