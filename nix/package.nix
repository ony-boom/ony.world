{
  self,
  srcRoot,
  lib,
  stdenv,
  nodejs,
  pnpm,
  pnpmConfigHook,
  fetchPnpmDeps,
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
      pnpm
      pnpmConfigHook
    ];

    pnpmDeps = fetchPnpmDeps {
      fetcherVersion = 4;
      inherit
        (finalAttrs)
        pname
        version
        src
        ;
      hash = "sha256-MOgdwoSyBPLKitLPu4U/pxe0zJRfxMQMe+jkGU9Ud7Y=";
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
      cms=$out/var/www/cms.${pname}

      mkdir -p $dist
      cp -r build/* $dist

      # The CMS is served from its own vhost root, so /admin must not exist
      # under the site itself. Fails loudly if static/admin went missing —
      # e.g. left untracked, which hides it from the flake source.
      mv $dist/admin $cms

      runHook postInstall
    '';
  })
