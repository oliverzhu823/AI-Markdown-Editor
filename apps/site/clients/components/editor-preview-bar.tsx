import { Post } from '@prisma/client';
import { Button, Dropdown } from 'antd';
import { useModelModifier } from '../hooks';
import { Icon } from './icon';

export const EditorPreviewBar = ({ post }: { post: Post }) => {
  const modifier = useModelModifier();

  const items = [
    {
      key: 'download',
      label: `Download`,
      onClick() {
        modifier.downloadPost(post);
      }
    },

    {
      key: 'delete',
      danger: true,
      label: 'Delete',
      async onClick() {
        await modifier.delPost(post.id);
        modifier.refreshPosts();
      }
    }
  ];

  return (
    <div className="absolute top-1 left-3 right-3 flex justify-between items-center text-sm text-gray-500">
      <div className="flex items-center gap-1">
        2022-12-10 21:28:57
        <a href={`/p/${post.id}`} target="_blank" className="hover:underline">
          link
        </a>
      </div>

      <Dropdown
        menu={{
          items
        }}
      >
        <Button
          type="text"
          size="small"
          className="flex items-center justify-center"
          style={{
            display: 'flex'
          }}
          icon={<Icon name="more-horizontal" size={18} />}
        />
      </Dropdown>
    </div>
  );
};
