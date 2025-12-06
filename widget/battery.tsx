import { Gtk } from "ags/gtk4"
import AstalBattery from "gi://AstalBattery?version=0.1"
import { createBinding, createComputed } from "gnim"

export default function Battery() {
  const battery = AstalBattery.get_default()
  const percentage = createBinding(battery, "percentage")
  const full_percentage = Math.floor(percentage.peek() * 100)
  const battery_info = createComputed(() => (`${full_percentage === 100 ? "FULL" : "CHR"}: ${full_percentage}%`))

  if (!battery.is_battery) {
    return <></>
  }

  return (
    <>
      <box class="status-box">
        <label label={battery_info} />
      </box>
      <Gtk.Separator />
    </>
  )
}

