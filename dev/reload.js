// Minimalist plugin to reload the page on file change in ./static/

import { normalizePath } from 'vite'

export default function reload()
{
    return 
    {
        name: 'reload-on-static-change',
        configureServer(server)
        {
            server.watcher.on('all', (event, file) =>
            {
                if (normalizePath(file).startsWith(server.config.publicDir))
                    server.ws.send({ type: 'full-reload' })
            })
        }
    }
}