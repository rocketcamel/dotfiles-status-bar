// let current_time = Variable(GLib.DateTime.new_now_local().format("%H:%M"))
// GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
//   const now = GLib.DateTime.new_now_local()
//   current_time.set(now.format("%b %e (%a) %H:%M"))
//   return true

import { createPoll } from "ags/time"

// })
export default function Time() {
  const time = createPoll("", 500, () => {
    return new Date().toLocaleString(undefined, {
      hour12: false
    })
  })

  return <box class="status-box">
    <label label={time} />
  </box>
  // return <box class="status-box">
  //   <label label={bind(current_time)} />
  // </box>
}

