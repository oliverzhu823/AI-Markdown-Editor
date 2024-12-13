import { Blockquote, Card, Heading, HeadingProps, Separator, Text, Theme } from '@radix-ui/themes';
import { ReactNodeViewConstructor, useNodeViews } from '@nytimes/react-prosemirror';
import { NodeViewConstructor } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const paragraph: NodeViewConstructor = () => {
  return {}
}

function render(update: (node: Node) => ReactNode): [ReactNode, ReturnType<NodeViewConstructor>] {
  const dom = document.createElement('div');

  dom.setAttribute('data-role', 'react-renderer')

  
  return [createPortal(), {
    dom,
  };]
}

// export const paragraph: ReactNodeViewConstructor = () => ({
//   component: function ({ children }) {
//     return (
//       <Text my="2" as="p">
//         {children}
//       </Text>
//     );
//   },
//   dom: wrapper(),
//   contentDOM: document.createElement('span')
// });

export const blockquote: ReactNodeViewConstructor = () => ({
  component: function ({ children }) {
    return <Blockquote my="2">{children}</Blockquote>;
  },
  dom: wrapper(),
  contentDOM: document.createElement('span')
});

const HEADING_LEVEL_TO_STYLE: HeadingProps[] = [
  {
    as: 'h1',
    size: '8'
  },
  {
    as: 'h2',
    size: '7'
  },
  {
    as: 'h3',
    size: '6'
  },
  {
    as: 'h4',
    size: '5'
  },
  {
    as: 'h5',
    size: '4'
  },
  {
    as: 'h6',
    size: '3'
  }
];

export const heading: ReactNodeViewConstructor = () => ({
  component: function ({ children, node }) {
    const style = HEADING_LEVEL_TO_STYLE[node.attrs.level - 1];

    return (
      <Heading my="2" {...style}>
        {children}
      </Heading>
    );
  },
  dom: wrapper(),
  contentDOM: document.createElement('span')
});

function wrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('typoraphy');
  return wrapper;
}

// export const typography = {
//   heading,
//   paragraph,
//   blockquote
// };
