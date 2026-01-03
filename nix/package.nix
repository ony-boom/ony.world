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
      hash = "sha256-OduGDG1CpJLlxMOzi7S9N07KglmjOLLS6yGA6u0b8m8=";
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
