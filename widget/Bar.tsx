import { Astal, Gtk, Gdk } from "ags/gtk4";
// import Workspaces from "./workspaces";
// import Audio from "./audio";
// import NetworkModule from "./network";
// import Cpu from "./cpu-widget";
// import Ram from "./ram";
// import Disk from "./disk";
// import Battery from "./battery";
import Time from "./time";
import Title from "./title";
import app from "ags/gtk4/app";
import Workspaces from "./workspaces";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <Workspaces $type="start" monitor={gdkmonitor} />
        <box $type="center" class="client-title">
          <Title />
        </box>
        <box $type="end">
          <Time />
        </box>
      </centerbox>
    </window>
  );
}
