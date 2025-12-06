import { Gdk } from "ags/gtk4"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding, For } from "gnim"

export default function Workspaces({ monitor }: { monitor: Gdk.Monitor }) {
  const hypr = AstalHyprland.get_default()
  const workspaces = createBinding(hypr, "workspaces").as(wss => wss.filter((ws) => ws.monitor.model === monitor.model).sort((a, b) => a.id - b.id))

  return (
    <box class="workspaces">
      <For each={workspaces}>
        {(ws) => (
          <button class={createBinding(hypr, "focusedWorkspace").as((fw) => ws === fw ? "focused" : "")} onClicked={() => ws.focus()}>
            <label label={ws.id.toString()} />
          </button>
        )}
      </For>
    </box>
  )
}
