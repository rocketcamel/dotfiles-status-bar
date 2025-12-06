import AstalWp from "gi://AstalWp?version=0.1"
import { createBinding, createMemo } from "gnim"

export default function Audio() {
  const speaker = AstalWp.get_default()?.default_speaker!
  const display = createMemo(() => {
    const volume = createBinding(speaker, "volume")
    const muted = createBinding(speaker, "mute")

    if (muted()) {
      return "(muted)"
    }
    return `${Math.floor(volume() * 100)}% `
  })

  return (
    <box class="status-box audio">
      <label label={display} />
    </box>
  )
}
