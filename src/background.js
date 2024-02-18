browser.commands.onCommand.addListener((command) => {
    if (command === 'toggle-ink-style') {
        browser.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function (tabs) {
                const tab = tabs[0]
                const host = new URL(tab.url).host
                const key = `i:${host}`
                browser.storage.sync.get([key], function (items) {
                    const obj = {}
                    let paused = items[key]
                    if (paused) {
                        obj[key] = 0
                    } else {
                        obj[key] = 1
                    }
                    browser.storage.sync.set(obj)
                    browser.tabs.sendMessage(
                        tab.id, 'reload'
                    )
                })
            })
    }
})
