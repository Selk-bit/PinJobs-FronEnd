import {type EventSourceMessage, fetchEventSource} from '@microsoft/fetch-event-source';
import {toast} from 'vue-sonner'
import endpoints from '@/api/endpoints';
import {useProgressBarStore} from "@/stores/progress-bar";
import {useAuthStore} from "@/stores/auth";

const url = import.meta.env.VITE_API_URL + endpoints.NOTIFICATIONS;
export const onopen = async (response: Response) => {
    if (response.ok) {
        return; // everything's good
    } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        // client-side errors are usually non-retriable:
         useProgressBarStore().showError('Extraction finished!');
        console.log('On open response error from sse')
        throw new Error(response.status.toString());

    } else {
        console.log('On open response unknown error from sse')
         useProgressBarStore().showError('Extraction finished!');
        throw Error(response.status.toString());
    }
}

// export const onmessage = async (msg: EventSourceMessage) => {
//     // if the server emits an error message, throw an exception
//     // so it gets handled by the onerror callback below:
//     let data = msg.data.toString()
//     if (msg.data) {
//         useProgressBarStore().finishProgress();
//         useProgressBarStore().setText('Data extracted!');
//        await useAuthStore().GET_CURRENT_USER();
//     }
// }
export interface EventMsg {
    candidates: string[];
    error: boolean;
}

export const onmessage = async (msg: EventSourceMessage) => {
    // if the server emits an error message, throw an exception,
    // so it gets handled by the onerror callback below:
    try {
        let data = msg.data.toString()
        if (msg.data) {
            const obj = JSON.parse(msg.data);
            console.log('*************** logging from notification')
            console.log(obj);
            const dt = obj as EventMsg;
            if (dt.error) {
                // handle extration error by closing progress bar and showing an error message
                useProgressBarStore().showError('Extraction finished!');
            } else {
                useProgressBarStore().finishProgress();
                useProgressBarStore().setText('Extraction finished!');
                await useAuthStore().GET_CURRENT_USER();
            }
        }
    } catch (err) {
        console.log(err)
        useProgressBarStore().showError('Extraction finished!');

    } finally {
        useProgressBarStore().showError('Extraction finished!');
    }
}

export const onclose = () => {
    // if the server closes the connection unexpectedly, retry:
    useProgressBarStore().showError('Extraction finished!');
    console.log('On close message from sse !')
}

export const onerror = (err: any) => {
    console.log('On Error message from sse !')
    useProgressBarStore().showError('Extraction finished!');
    throw new Error(err.msg);
}

export const notificationsInit = async (signal: AbortSignal) => {
    await fetchEventSource(url, {
        keepalive: true,
        openWhenHidden: true,
        signal: signal,
        credentials: 'include',
        onopen: onopen,
        onmessage: onmessage,
        onclose: onclose,
        onerror: onerror,

    });
}