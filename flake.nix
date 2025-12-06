{
  description = "Desktop widgets";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      ags,
      astal,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};

      extraPkgs = with ags.packages.${system}; [
        hyprland
        battery
        wireplumber
        network
      ];
    in
    {
      # packages.${system} = {
      #   status-bar = ags.lib.bundle {
      #     inherit pkgs;
      #     src = ./.;
      #     name = "status-bar";
      #     entry = "app.ts";
      #
      #     extraPackages =
      #       with pkgs;
      #       extraPkgs
      #       ++ [
      #         libgtop
      #       ];
      #   };
      # };
      packages.${system}.default = pkgs.stdenv.mkDerivation rec {
        pname = "status-bar";
        name = "status-bar";

        src = ./.;

        nativeBuildInputs = with pkgs; [
          wrapGAppsHook3
          gobject-introspection
          ags.packages.${system}.default
        ];

        buildInputs = [
          pkgs.glib
          pkgs.libgtop
          pkgs.gjs
          astal.packages.${system}.io
          astal.packages.${system}.astal4
          astal.packages.${system}.battery
          astal.packages.${system}.hyprland
          astal.packages.${system}.network
          astal.packages.${system}.wireplumber
        ];

        installPhase = ''
          mkdir -p $out/bin
          mkdir -p $out/share
          cp -r * $out/share
          jj
          ags bundle app.ts $out/bin/${pname} -d "SRC='$out/share'"
        '';
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          buildInputs = [
            (ags.packages.${system}.default.override {
              extraPackages =
                with pkgs;
                extraPkgs
                ++ [
                  libgtop
                ];
            })
          ];
        };
      };
    };
}
