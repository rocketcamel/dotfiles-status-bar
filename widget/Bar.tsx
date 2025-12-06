import { Astal, Gdk, Gtk } from "ags/gtk4";
import Time from "./time";
import Title from "./title";
import app from "ags/gtk4/app";
import Workspaces from "./workspaces";
import Battery from "./battery";
import Disk from "./disk";
import NetworkModule from "./network";
import Ram from "./ram";
import Cpu from "./cpu-widget";
import Audio from "./audio";

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
        <box $type="start">
          <image iconName="nixos" pixel_size={24} class="nix-icon" />
          <Workspaces monitor={gdkmonitor} />
        </box>
        <box $type="center" class="client-title">
          <Title />
        </box>
        <box $type="end">
          <Gtk.Separator class="separator" />
          <Audio />
          <Gtk.Separator class="separator" />
          <NetworkModule />
          <Gtk.Separator class="separator" />
          <Cpu />
          <Gtk.Separator class="separator" />
          <Ram />
          <Gtk.Separator class="separator" />
          <Disk />
          <Gtk.Separator class="separator" />
          <Battery />
          <Time />
        </box>
      </centerbox>
    </window>
  );
}
