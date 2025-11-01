{
  description = "ony.world; Ony's website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = {
    self,
    nixpkgs,
    systems,
  }: let
    eachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    formatter = eachSystem (system: nixpkgs.legacyPackages.${system}.alejandra);
    packages = eachSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      default = pkgs.callPackage ./nix/package.nix {inherit self;};
    });
  };
}
