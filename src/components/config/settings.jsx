export const API_URL = () => {
    let server_url;
    server_url = import.meta.env.VITE_API_DEV_URL
    return server_url;
}

export const HostConfig = {
    hostIP: 'http://127.0.0.1',
    hostPort: '3000'
}
