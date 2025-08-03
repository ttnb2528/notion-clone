"use client";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"; 
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

// Component này giờ chỉ còn nhiệm vụ hiển thị editor
type EditorProps = {
  editor: BlockNoteEditor;
  darkMode: boolean;
};

function BlockNote({ editor, darkMode }: EditorProps) {
  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

// Parent component will handle the Yjs document and provider
function Editor() {
  const room = useRoom();
  const userInfo = useSelf((me) => me.info);
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  // Initialize Yjs doc and provider in useEffect
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  const editor: BlockNoteEditor | null = useBlockNote(
    {
      collaboration:
        doc && provider
          ? {
              provider,
              fragment: doc.getXmlFragment("document-store"),
              user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email),
              },
            }
          : undefined,
    },
    [doc, provider, userInfo]
  );

  // Only render when everything is ready
  if (!doc || !provider || !editor) {
    return <div>Loading...</div>;
  }

  const style = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* TranslateDocument */}
        <TranslateDocument doc={doc} />

        {/* ChatToDocument */}
        <ChatToDocument doc={doc} />

        {/* DarkMode */}
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      <BlockNote editor={editor} darkMode={darkMode} />
    </div>
  );
}
export default Editor;
