import log from 'loglevel';
import hash from '../core/hash';
import AppState from './AppState';
import { Env } from './interfaces';
import appStateStore from './appStateStore';
import CommandLink from '../core/components/CommandLink';

export type StartupAppData = {
    appState: AppState,
    startupCommands: string[]
}

const STARTUP_COMMAND_KEY = 'StartupCommand';
const DEFAULT_COMMANDS = ['help', '127.0.0.1 192.168.0.0/8', '1|2&6','4 0b1000000 0x80'];

function bootstrapAppData() : StartupAppData {
    const env = window.location.host === "bitwisecmd.com" ? 'prod' : 'stage';

    setupLogger(env);

    const appState = createAppState(env);
    const startupCommands = getStartupCommands(appState);

    return {
        appState,
        startupCommands
    }
}


function createAppState(env:string) {
    var stateData = appStateStore.getPersistedData();
    const appState = new AppState(stateData, env);
    appStateStore.watch(appState);
    log.debug("appState initialized", appState);
    return appState;
}

function getStartupCommands(appState : AppState) : string[] {
    var hashArgs = hash.getArgs(window.location.hash);

    var startupCommands = loadStoredCommands();

    if(startupCommands.length == 0) 
        startupCommands = DEFAULT_COMMANDS;

    if(appState.wasOldVersion) {
        startupCommands = ["whatsnew"];
    }

    if(hashArgs.length > 0) {
        startupCommands = hashArgs;
    }

    log.debug('Executing startup commands', startupCommands);

    return startupCommands;
}

function loadStoredCommands() : string[] {
    const json = localStorage.getItem(STARTUP_COMMAND_KEY);
    return json != null ? [json] : []; 
}

function setupLogger(env: Env) {
    if(env != 'prod'){
        log.setLevel("debug");
        log.debug(`Log level is set to debug. Env: ${env}`)
    } else {
        log.setLevel("warn");
    }
}

export {STARTUP_COMMAND_KEY};
export default bootstrapAppData;