console.log('💃 hello from preload')

// https://www.electronjs.org/docs/latest/tutorial/ipc


const {
  contextBridge,
  ipcRenderer,
  shell,
  webFrame
} = require("electron")



export {}
declare global {
  interface Window {
    //setupRenderer,
    api: {
      send: (channel: string, ...arg: any) => void;
      receive: (channel: string, func: (event: any, ...arg: any) => void) => void;
      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
      // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
      electronIpcSendTo: (window_id: string, channel: string, ...arg: any) => void;
      electronIpcSend: (channel: string, ...arg: any) => void;
      giveMeAStream: (eventId: string) => void;
      electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => void;
      electronIpcSendSync: (channel: string, ...arg: any) => void;
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
      electronIpcInvoke: (channel: string, ...arg: any) => void;
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererpostmessagechannel-message-transfer
      electronIpcPostMessage: (channel: string, message: any, transfer?: MessagePort[]) => void;
      electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => void;
      electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => void;
      electronIpcRemoveAllListeners: (channel: string) => void;

      setFullscreen: (flag: any) => void;

    };

    attachEvent(event: string, listener: EventListener): boolean;
    detachEvent(event: string, listener: EventListener): void;

    // https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript

    bwScrollAPI: {
      getScrollAmount: () => void;
    }
  }
}


contextBridge.exposeInMainWorld(
  "api", {
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererpostmessagechannel-message-transfer
      electronIpcPostMessage: (channel: string, message: any, transfer?: MessagePort[]) => {
        ipcRenderer.postMessage(channel, message, transfer)
      },
      send: (channel: any, data: any) => {
          console.log("preload-send called: args: ", data);
          ipcRenderer.invoke(channel, data).catch(e => console.log(e))
      },
      receive: (channel: any, func: any) => {
        console.log("preload-receive called. args: ");
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      },
      // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
      electronIpcSendTo: (window_id: number, channel: string, ...arg: any) => {
        ipcRenderer.sendTo(window_id, channel, arg);
      },
      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
      electronIpcSend: (channel: string, ...arg: any) => {
        ipcRenderer.send(channel, arg);
      },

      giveMeAStream: (eventId: string) => {
        ipcRenderer.send('give-me-a-stream', eventId)
      },

      electronIpcSendSync: (channel: string, ...arg: any) => {
        return ipcRenderer.sendSync(channel, arg);
      },
      // https://www.electronjs.org/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args
      electronIpcInvoke: (channel: string, ...arg: any) => {
        return ipcRenderer.invoke(channel, ...arg)
      },
      electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.on(channel, listener);
      },
      electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.once(channel, listener);
      },
      electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.removeListener(channel, listener);
      },
      electronIpcRemoveAllListeners: (channel: string) => {
        ipcRenderer.removeAllListeners(channel);
      },

      setFullscreen: (flag: string) => {
        ipcRenderer.invoke('setFullscreen', flag);
      },

  },
)
