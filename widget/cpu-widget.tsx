import { createPoll } from "ags/time";
import { calc_cpu_usage, get_cpu_snapshot } from "./cpu";

let s1 = get_cpu_snapshot()
export default function Cpu() {
  const usage = createPoll(0, 1000, () => {
    const s2 = get_cpu_snapshot()
    let calc = calc_cpu_usage(s1, s2)
    s1 = s2
    return calc
  })
  return (
    <box class="status-box cpu">
      <label label={usage.as(u => `CPU: ${u}% `)} />
    </box>
  )
}

