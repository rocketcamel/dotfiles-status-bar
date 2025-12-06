import { get_disk_space } from "./cpu"
import { createPoll } from "ags/time"

export default function Disk() {
  const disk = createPoll(get_disk_space(), 5000, () => get_disk_space())

  return (
    <box class="status-box disk">
      <label label={disk.as(d => `Disk: ${d}`)} />
    </box>
  )
}

