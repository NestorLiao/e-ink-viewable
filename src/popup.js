
function updateUI(paused) {
    $('#toggle').text(paused ? 'Apply ink style' : 'Remove ink style')
}
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
            let paused = items[key]
            updateUI(paused)

            $('#toggle').on('click', function () {
                const obj = {}
                if (paused) {
                    obj[key] = 0
                } else {
                    obj[key] = 1
                }
                browser.storage.sync.set(obj)
                paused = !paused
                updateUI(paused)

                browser.tabs.sendMessage(
                    tab.id, 'reload'
                )
            })
        })
    })


// $('#shortcuts').click(() => browser.tabs.create({
//     url: ''
// }));
