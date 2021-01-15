import AppState from "../AppState";
import React from "react";

function DebugIndicators(props:  {appState: AppState}) {

    const list = [];
    const state = props.appState;

    if(props.appState.env != 'prod') {
        list.push(state.env);
    }

    if(props.appState.debugMode) {
        list.push("debug");
    }

    if(localStorage.getItem('TrackAnalytics') === 'false') {
        list.push("notrack");
    }

    if(list.length == 0)
        return null;

    return <div>
            {list.map(i => <span>{i}&nbsp;</span>)}
        </div>
}

export default DebugIndicators;