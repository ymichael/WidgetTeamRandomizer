import * as React from "react";
import { useState } from "react";
import "./App.css";

const defaultColor = (window as any).widgetPayload?.color || "#F24E1E";
const defaultUseCustom = (window as any).widgetPayload?.useCustom || false;
const defaultActiveUsers = (window as any).widgetPayload?.activeUsers || [];

function App() {
  const [custom, setCustom] = useState<boolean>(defaultUseCustom);
  const [activeUsers, setActiveUsers] = useState<string[]>(defaultActiveUsers);
  return (
    <div
      className="App"
      style={{
        borderTop: `solid 6px ${defaultColor}`,
      }}
    >
      <div className="formRow">
        <input
          type="checkbox"
          id="custom-list"
          checked={custom}
          onChange={() => {
            setCustom((custom) => {
              const newValue = !custom;
              const payload = {
                type: "SET_SHOULD_USE_CUSTOM_NAMES",
                value: newValue,
              };
              parent?.postMessage({ pluginMessage: payload }, "*");
              return newValue;
            });
          }}
        />
        <label htmlFor="custom-list" style={{ paddingLeft: 5 }}>
          Use custom name list
        </label>
      </div>
      <div className="formRow">
        <div className="flexCol">
          <label htmlFor="user-list">Names (one per line)</label>
          <textarea
            id="user-list"
            rows={20}
            autoFocus={custom}
            onChange={(e) => {
              const newActiveUsers = e.target.value.split("\n");
              const payload = {
                type: "SET_CUSTOM_NAMES",
                value: newActiveUsers,
              };
              parent?.postMessage({ pluginMessage: payload }, "*");
              setActiveUsers(newActiveUsers);
            }}
          >
            {activeUsers.join("\n")}
          </textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
