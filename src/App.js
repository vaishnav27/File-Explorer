import { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./components/hooks/useTraverseTree";

function App() {
  const [exploreData, setExploreData] = useState(explorer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(exploreData, folderId, item, isFolder);
    setExploreData(finalTree);
  };
  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={exploreData} />
    </div>
  );
}

export default App;
