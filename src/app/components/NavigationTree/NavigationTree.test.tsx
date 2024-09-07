import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavigationTree, TreeNodeComponent } from './NavigationTree';

describe('NavigationTree Component', () => {
  const treeData = [
    {
      name: 'Node1',
      children: [{ name: 'Child1' }, { name: 'Child2' }],
    },
    { name: 'Node2' },
  ];

  const onSelectMock = jest.fn();

  test('test navigation tree renders correctly', () => {
    render(
      <NavigationTree treeData={treeData} selected="" onSelect={onSelectMock} />
    );
    expect(screen.getByText('Node1')).toBeInTheDocument();
    expect(screen.getByText('Node2')).toBeInTheDocument();
  });

  test('test tree node toggle expanded state', () => {
    render(
      <TreeNodeComponent
        node={treeData[0]}
        selected=""
        onSelect={onSelectMock}
      />
    );
    const toggleIcon = screen.getAllByRole('button')[0];

    // Step 2: Check if the button has no text content
    expect(toggleIcon).toHaveTextContent(/^$/); // Check that text content is empty

    // Step 3: Check if the button contains an SVG element
    const svgElement = toggleIcon.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    fireEvent.click(toggleIcon);
    expect(screen.getByText('Child1')).toBeInTheDocument();
    expect(screen.getByText('Child2')).toBeInTheDocument();
    fireEvent.click(toggleIcon);
    expect(screen.queryByText('Child1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child2')).not.toBeInTheDocument();
  });

  test('test on select called with correct node name', () => {
    render(
      <TreeNodeComponent
        node={treeData[1]}
        selected=""
        onSelect={onSelectMock}
      />
    );
    const nodeElement = screen.getByText('Node2');
    fireEvent.click(nodeElement);
    expect(onSelectMock).toHaveBeenCalledWith('Node2');
  });
});
