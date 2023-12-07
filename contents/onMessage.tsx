import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  all_frames: true
}

const OnMessage = () => {
  const [contentsRequest, setContentsRequest] = useState<string>("")

  const { data } = useMessage<string, string>(async (req, res) => {
    console.log(`[contents] data: ${JSON.stringify(data, null, 2)}`)
    console.log(`[contents] req: ${JSON.stringify(req, null, 2)}`)

    setContentsRequest(JSON.stringify(req, null, 2))
    res.send(`[contents] This is not the undefined thing.`)
  })

  return (
    <>
      <div
        style={{
          padding: 8,
          background: "#333",
          color: "red"
        }}>
        <p>The new window request: {contentsRequest}</p>
      </div>
    </>
  )
}

export default OnMessage
