# Refactor Roadmap

1. useage

```tsx
const defaultPlugins = [toolbar(), bubble(), slash(), upload(), placeholder()];

function App() {
  const [state, setState] = useState(function () {
    return EditorState.create({
      plugins: [...defaultPlugins, AIToolkit()]
    });
  });

  return <Editor state={state} onChange={setState} />;
}
```

2. internal

```tsx
type EditorPorps = {
  state: EditorState;
};
function Editor(props: EditorPorps) {}
```

3. Plugin

```tsx
const toolbar = () => {
  return Plugin.createReactPlugin(editor => ({
    reactElement: <Toolbar />
  }));
};
```
