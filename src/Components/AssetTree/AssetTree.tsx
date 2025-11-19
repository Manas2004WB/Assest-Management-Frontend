import AssetNode from "../AssetNode/AssetNode";

interface Node {
  node_id: number;
  node_name: string;
  children?: Node[];
  children_count: number;
  is_deleted: boolean;
}

interface AssetTreeProps {
  treeData: Node[];
  fetchTree: () => void;
  onNodeSelect?: (nodeId: number) => void; // new
}

const AssetTree: React.FC<AssetTreeProps> = ({ treeData, fetchTree, onNodeSelect }) => {
  return (
    <div className="tree-container">
      {treeData.map((node) => (
        <AssetNode 
          key={node.node_id} 
          node={node} 
          fetchTree={fetchTree} 
          onSelect={onNodeSelect} // forward callback
        />
      ))}
    </div>
  );
};

export default AssetTree;
