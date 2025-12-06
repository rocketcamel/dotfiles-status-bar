import { get_ram_info } from "./cpu"
import { createPoll } from "ags/time"

export default function Ram() {
  const info = createPoll(get_ram_info(), 1000, () => get_ram_info())

  return (
    <box class="status-box mem">
      <label label={info.as(i => `Mem: ${Math.round((i.used / i.total) * 100)}% `)} />
    </box>
  )
}

