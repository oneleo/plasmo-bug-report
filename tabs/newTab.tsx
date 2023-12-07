import { useEffect, useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"

const DeltaTab = () => {
  const [params, setParams] = useState<Record<string, any> | undefined>()
  const [contentsResponse, setContentsResponse] = useState<string | undefined>(
    ""
  )

  useEffect(() => {
    const splitUrlByQuestionMark = window.location.href.split("?")
    const urlParams = splitUrlByQuestionMark[
      splitUrlByQuestionMark.length - 1
    ].replace(window.location.hash, "")
    const urlSearchParams = new URLSearchParams(urlParams)
    const urlParamsObj = {}
    for (const [key, value] of urlSearchParams) {
      if (!value || value === "undefined") continue
      try {
        urlParamsObj[key] = JSON.parse(decodeURIComponent(value))
      } catch (error) {
        urlParamsObj[key] = decodeURIComponent(value)
      }
    }
    setParams(urlParamsObj)
  }, [])

  const buttonSendToContents = async () => {
    const contentsRes = await sendToContentScript({
      tabId: params?.tabId,
      name: "",
      body: {
        hello: "Please send me something."
      }
    })
    setContentsResponse(contentsRes && "undefined")
  }

  return (
    <div>
      <button onClick={buttonSendToContents}>Send to contents</button>
      <p>Response from Contents: {contentsResponse}</p>
    </div>
  )
}

export default DeltaTab
