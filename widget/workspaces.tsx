import { Gdk } from "ags/gtk4"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createBinding, For } from "gnim"

export default function Workspaces({ monitor }: { monitor: Gdk.Monitor }) {
  const hypr = AstalHyprland.get_default()
  const workspaces = createBinding(hypr, "workspaces").as(wss => wss.sort((a, b) => a.id - b.id))

  return (
    <box class="workspaces">
      <For each={workspaces}>
        {(ws) => (
          <button class={createBinding(hypr, "focusedWorkspace").as((fw) => ws === fw ? "focused" : "")}>
            <label label={ws.id.toString()} />
          </button>
        )}
      </For>
    </box>
  )
  // return <box className="workspaces">
  //   {bind(hypr, "workspaces").as(wss => wss.filter(ws => !(ws.id >= -99 && ws.id <= -2))
  //     .sort((a, b) => a.id - b.id)
  //     .map(ws => {
  //       if (ws.monitor.model !== monitor.model) return <></>
  //       return (
  //         <button
  //           className={bind(hypr, "focusedWorkspace").as(fw =>
  //             ws === fw ? "focused" : "")}
  //           onClicked={() => ws.focus()}>
  //           {ws.id}
  //         </button>
  //       )
  //     }))}
  // </box>
}
