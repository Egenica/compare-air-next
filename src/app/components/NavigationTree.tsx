import { useState } from 'react';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface NavigationTreeProps {
  treeData: TreeNode[];
  selected: string;
  onSelect: (capability: string) => void;
}

export const NavigationTree: React.FC<NavigationTreeProps> = ({
  treeData,
  selected,
  onSelect,
}) => {
  const renderTree = (nodes: TreeNode[]) =>
    nodes.map((node) => (
      <TreeNodeComponent
        key={node.name}
        node={node}
        selected={selected}
        onSelect={onSelect}
      />
    ));

  return (
    <div className="border-b border-[#ffffff30] pb-[15px]">
      {renderTree(treeData)}
    </div>
  );
};

interface TreeNodeComponentProps {
  node: TreeNode;
  selected: string;
  onSelect: (capability: string) => void;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  selected,
  onSelect,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the name click handler
    if (node.children && node.children.length > 0) {
      setExpanded(!expanded);
    } else {
      onSelect(node.name);
    }
  };

  return (
    <div>
      <div className="flex items-center ml-[-0.6rem]">
        {node.children && (
          <span onClick={handleToggle} className="cursor-pointer">
            {expanded ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-white opacity-50"
              >
                <path d="M7 14l5-5 5 5z" />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-white opacity-50"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            )}
          </span>
        )}
        <span
          onClick={() => {
            onSelect(node.name);
            setExpanded(!expanded);
          }}
          className={`cursor-pointer text-white font-thin text-sm ${
            node.name === selected ? 'underline' : 'no-underline'
          }`}
        >
          {node.name}
        </span>
      </div>
      {expanded && node.children && (
        <div className="ml-[0.8rem]">
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.name}
              node={child}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
