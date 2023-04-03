import viteCDNImport from 'vite-plugin-cdn-import'

export function configCDNPlugin() {
  return viteCDNImport({
    modules: [
      {
        name: 'vconsole',
        var: 'VConsole',
        path: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'
      }
    ]
  })
}
