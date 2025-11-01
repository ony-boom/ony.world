{
  self,
  stdenv,
  nodejs,
  pnpm,
}: let
  pkgJson = builtins.fromJSON (builtins.readFile (self + /package.json));
  pname = pkgJson.name;
  version = pkgJson.version;
in
  stdenv.mkDerivation (finalAttrs: {
    inherit pname version;
    src = self;

    nativeBuildInputs = [
      nodejs
      pnpm.configHook
    ];

    prePnpmInstall = ''
      pnpm config set dedupe-peer-dependents false
    '';

    pnpmDeps = pnpm.fetchDeps {
      fetcherVersion = 1;
      inherit
        (finalAttrs)
        pname
        version
        src
        prePnpmInstall
        ;
      hash = "sha256-4gxUU5321kV+3eUTVTn0Yo9E4bS5yjl0IWhi5rtYeAg=";
    };

    buildPhase = ''
      runHook preBuild

      pnpm install --frozen-lockfile
      pnpm run build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p $out/var
      cp -r build/* $out/var

      runHook postInstall
    '';
  })
