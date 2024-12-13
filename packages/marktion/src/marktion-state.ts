import { immerable } from 'immer';
import { EditorView, EditorProps } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';
import isUndefined from 'lodash/isUndefined';

import { parse, serialize, schema } from './core';
import { InputRulesPlugin } from './core/input-rules';
import { KeymapPlugin } from './core/keymap';
import { taskItem } from './components/task';
import { createPortalSet } from './plugin-portal';
import { CommandManager } from './core/CommandManager';
import * as commands from './core/commands';
import { placeholder } from './plugin-placeholder';
import { upload } from './plugin-upload';
import { Attrs, MarkType, NodeType } from 'prosemirror-model';
import { getAttributes } from './core/helpers/getAttributes';
import { getEditable, setEditable } from './core/meta';
import { RendererEnum, Theme } from './types';
import { react } from '@nytimes/react-prosemirror';

interface Plugin {}
interface ReactPlugin extends Plugin {
  reactElement: React.ReactNode;
}
export type EditorPlugin = Plugin | ReactPlugin;
export type MarktionStateOptions = {
  plugins?: EditorPlugin[];
  content?: '';
};

export class MarktionState {
  [immerable] = true;

  editorState: EditorState;
  plugins: EditorPlugin = [];
  content = '';

  constructor(options: MarktionStateOptions) {
    this.plugins = options.plugins || [];
    this.content = options.content || '';
    this.editorState = createEditorState(this);
  }

  static create(options: MarktionStateOptions = {}) {
    return new MarktionState(options);
  }
}

function createEditorState(state: MarktionState) {
  return EditorState.create({
    doc: parse(state.content),
    plugins: [
      react(),
      InputRulesPlugin(schema),
      KeymapPlugin(schema),
      keymap(baseKeymap),
      history(),
      dropCursor(),
      gapCursor(),
      createPortalSet(),
      // upload(props.uploadOptions),
      placeholder({
        includeChildren: true,
        placeholder: "Press '/' for commands, 'Space' for AI ..."
      })
    ]
  });
}
