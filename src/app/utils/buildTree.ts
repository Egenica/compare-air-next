import { Data } from './../types/data';

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export const buildTree = (applications: Data[]): TreeNode[] => {
  const tree: TreeNode[] = [];

  applications.forEach((app) => {
    // Find or create the first level node (BCAP1)
    let level1 = tree.find((node) => node.name === app.BCAP1);
    if (!level1) {
      level1 = { name: app.BCAP1, children: [] };
      tree.push(level1);
    }

    // Find or create the second level node (BCAP2)
    let level2 = level1.children?.find((node) => node.name === app.BCAP2);
    if (!level2) {
      level2 = { name: app.BCAP2, children: [] };
      level1.children?.push(level2);
    }

    // Find or create the third level node (BCAP3)
    let level3 = level2.children?.find((node) => node.name === app.BCAP3);
    if (!level3) {
      level3 = { name: app.BCAP3, children: [] };
      level2.children?.push(level3);
    }
  });

  // Recursive function to sort nodes and their children
  const sortTree = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    nodes.forEach((node) => {
      if (node.children) {
        sortTree(node.children);
      }
    });
  };

  // Sort the entire tree
  sortTree(tree);

  return tree;
};
