import { DirectEditorProps, EditorView } from 'prosemirror-view';
import { createContext, useLayoutEffect, useState } from 'react';

export type ProseMirrorProps = React.PropsWithChildren<
  {
    root: HTMLElement | null;
  } & DirectEditorProps
>;

const EditorViewContext = createContext<EditorView | null>(null);

export function ProseMirror({ children, root, ...options }: ProseMirrorProps) {
  const [view, setView] = useState<EditorView | null>(null);

  useLayoutEffect(() => {
    if (root) {
      setView(new EditorView({ mount: root }, options));
    } else {
      setView(null);
    }
  }, [root]);

  return <EditorViewContext.Provider value={view}>{children}</EditorViewContext.Provider>;
}
