import { runtime, tabs, windows } from "webextension-polyfill"

import { type PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log(`[background] Creating a tab: ${JSON.stringify(req, null, 2)}`)

  const creatingWindowUrl = `${runtime.getURL("tabs/newTab.html")}?tabId=${
    req.sender.tab.id
  }`

  const window = await windows.create({
    url: creatingWindowUrl,
    focused: true,
    type: "popup",
    width: 385,
    height: 720
  })
  const tab = await tabs.create({
    url: creatingWindowUrl,
    active: false
  })
  console.log(
    `[background] The new window info: ${JSON.stringify(window, null, 2)}`
  )
  console.log(`[background] The new tab info: ${JSON.stringify(tab, null, 2)}`)

  res.send({
    res: `[background] Created a window and tab: ${creatingWindowUrl}`
  })
}

export default handler
