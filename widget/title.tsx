import { createPoll } from "ags/time";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { createState } from "gnim";

const hyprland = AstalHyprland.get_default()

function get_title() {
  return hyprland.focusedClient?.title ?? ""
}

// const title = Variable(get_title()).poll(200, () => get_title())

export default function Title() {
  const title = createPoll("", 200, () => get_title())

  return (
    <label label={title} />
  )
  // return (
  //   <label label={title(t => t)} />
  // )
}
