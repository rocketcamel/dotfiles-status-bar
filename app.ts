import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { interval } from "ags/time"

app.start({
  css: style,
  icons: "icons",
  main() {
    checkMonitors()
    interval(10000, () => checkMonitors())
  },
})

let knownMonitors = new Set()

function checkMonitors() {
  const currentMonitors = app.get_monitors()
  currentMonitors.forEach((monitor) => {
    if (!knownMonitors.has(monitor.model)) {
      knownMonitors.add(monitor.model)
      Bar(monitor)
    }
  })
}
