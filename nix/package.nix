{
  self,
  srcRoot,
  lib,
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
    src = lib.fileset.toSource {
      root = srcRoot;
      fileset = lib.fileset.unions [
        (srcRoot + /package.json)
        (srcRoot + /pnpm-lock.yaml)
        (srcRoot + /pnpm-workspace.yaml)
        (srcRoot + /svelte.config.js)
        (srcRoot + /vite.config.ts)
        (srcRoot + /tsconfig.json)
        (srcRoot + /src)
        (srcRoot + /static)
      ];
    };

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
      hash = "sha256-tHLRO4cNkqTrSjiJTKzaTB3ce1GQtvVYlPj+OqLHKiE=";
    };

    buildPhase = ''
      runHook preBuild

      pnpm install --frozen-lockfile
      pnpm run build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      dist=$out/var/www/${pname}

      mkdir -p $dist
      cp -r build/* $dist

      runHook postInstall
    '';
  })
