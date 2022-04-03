import React, { useState } from "react";
import SelectedTrackList from "./SelectedTrackList";
import SpotitfyPlaylistForm from "./SpotifyPlaylistForm";

const Tabs = ({children}) => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
      };
      const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
      };

    return (
      <>
        <div className="Tabs">
            {/* Tab nav */}
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>⭐Selected Tracks⭐</li>
                <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Tab 2</li>
            </ul>
            <div className="outlet">
                {/* content will be shown here */}
                {activeTab === "tab1" ? <SelectedTrackList /> : <SpotitfyPlaylistForm />}
                
                
            </div>
         </div>
      </>
    );
}

export default Tabs;