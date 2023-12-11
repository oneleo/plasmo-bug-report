import type { PlasmoCSConfig } from "plasmo"

import { listen } from "@plasmohq/messaging/message"

export const config: PlasmoCSConfig = {
  all_frames: true
}

const OnMessage = () => {
  listen<string, string>(async (req, res) => {
    console.log(`[contents][non-hook] req: ${JSON.stringify(req, null, 2)}`)
    res.send(`[contents][non-hook] This is not the undefined thing.`)
  })
}

OnMessage()
