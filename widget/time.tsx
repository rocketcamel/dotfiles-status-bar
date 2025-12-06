import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

export default function Time() {
  const time = createPoll("", 500, () => {
    return new Date().toLocaleString(undefined, {
      hour12: false
    })
  })

  return (
    <menubutton class="date-popover status-box">
      <popover>
        <Gtk.Calendar />
      </popover>
      <label label={time} />
    </menubutton>
  )
}

