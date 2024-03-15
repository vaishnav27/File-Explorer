import React, { useState } from "react";
import { File, FolderMinus } from "lucide-react";

function Folder({ handleInsertNode, explorer }) {
  //   console.log(explorer);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 10 }}>
        <div className="folder " onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>
          {/* <span>
            📁{" "}
            {explorer.name.length > 12
              ? explorer.name.substring(0, 12) + "..."
              : explorer.name}
          </span> */}
          <div>
            <button className="btn" onClick={(e) => handleNewFolder(e, true)}>
              <FolderMinus />
            </button>
            <button className="btn" onClick={(e) => handleNewFolder(e, false)}>
              <File />
            </button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 15 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"} </span>
              <input
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                type="text"
                className="inputContainer__input"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
}

export default Folder;
