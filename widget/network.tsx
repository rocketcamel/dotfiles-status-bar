import AstalNetwork from "gi://AstalNetwork?version=0.1";
import { createBinding, createMemo } from "gnim";

const disconnected_label = `Disconnected ⚠`

function create_label(
  primary: AstalNetwork.Primary,
  wired: AstalNetwork.Wired,
  wifi?: AstalNetwork.Wifi,
) {
  if (primary === AstalNetwork.Primary.WIRED) {
    return `🖧 Wired ${wired.device.interface}`
  }
  if (!wifi) {
    return disconnected_label;
  }
  if (wifi.active_access_point !== null) {
    return `${wifi.ssid} (${wifi.strength}%) `
  }
  return disconnected_label;
}

export default function NetworkModule() {
  const network = AstalNetwork.get_default();
  const primary = createBinding(network, "primary")
  const wifi = createBinding(network, "wifi")
  const wired = createBinding(network, "wired")

  const display = createMemo(() => create_label(primary(), wired(), wifi()))

  return (
    <box class="status-box net">
      <label label={display} />
    </box>
  )
}
