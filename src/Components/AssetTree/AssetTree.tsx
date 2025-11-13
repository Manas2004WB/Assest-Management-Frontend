import AssetNode from "../AssetNode/AssetNode";

interface Node {
  node_id: number;
  node_name: string;
  children?: Node[];
  children_count: number;
  is_deleted:boolean;
}
interface AssetTreeProps{
  treeData : Node[]
  fetchTree: () => void;
}
const AssetTree: React.FC<AssetTreeProps> = ({treeData, fetchTree}) => {
  return (
    <div className="tree-container">
      {treeData.map((node) => (
        <AssetNode key={node.node_id} node={node} fetchTree={fetchTree}/>
      ))}
    </div>
  );
};

export default AssetTree;
