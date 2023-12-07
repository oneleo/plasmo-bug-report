import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  run_at: "document_idle"
}

const CreateWindowAndTab = () => {
  const [backgroundReponse, setBackgroundReponse] = useState<string>("")

  const buttonCreateWindowAndTabViaBackground = async () => {
    const res = await sendToBackground({
      name: "createWindowAndTab",
      body: {
        req: "[contents] Please create new window and tab"
      }
    })
    setBackgroundReponse(`${JSON.stringify(res, null, 2)}`)
  }

  return (
    <>
      <div>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <button onClick={buttonCreateWindowAndTabViaBackground}>
          Create window and tab via Background
        </button>
        <p>The response from Background: {backgroundReponse}</p>
      </div>
    </>
  )
}

export default CreateWindowAndTab
