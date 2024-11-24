const backBlazeUrl = import.meta.env.VITE_BACKBLAZE_ENDPOINT;

export function AppendBackblaze(link: string) {
    return backBlazeUrl + link;
}