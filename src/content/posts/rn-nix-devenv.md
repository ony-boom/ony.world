---
title: 'Reproducible React Native Android Dev Environments with Nix'
description: 'Setting up a development environment using Nix.'
date: '2026-01-25'
published: true
tags: ['code', 'nix']
---

I've talked about Nix before, but not much about using it in real-world projects.

This month I set up a Nix-based dev environment for a React Native (non-Expo) app running on
a [POS device](https://en.wikipedia.org/wiki/Payment_terminal). Thought it was worth sharing.

![POS device](https://media.ony.world/nix-devenv-pos.webp)

## The problem

Setting up React Native for Android is notoriously tedious. Node, JDK, Android SDK, build tools, environment
variables... Each developer installs their own versions, and things break in mysterious ways.
Our hardware made it worse: testing required the actual device and vendor-specific native libraries. Consistency and
reproducibility really mattered.

## How we used to do it

A lengthy onboarding doc: install this version of Node, that version of JDK, download Android Studio, configure these
paths... It took hours, and something always went wrong.

## The fix

With Nix, the entire environment is defined in a single file. Following
the [Nix Android environment docs](https://nixos.org/manual/nixpkgs/unstable/#android), we created a `shell.nix` file at
the root of the project:

```nix
let
  # Use OpenJDK 17 for Java builds
  jdk = pkgs.javaPackages.compiler.openjdk17;
  # Compose a custom Android SDK with only the build tools we need
  androidSdk = (pkgs.androidenv.composeAndroidPackages {
    buildToolsVersions = [ "34.0.0" ]; # Specify the required build tools version
    includeEmulator = false;            # Skip the emulator, since we test on real hardware
  }).androidsdk;
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20                    # Node.js 20 for React Native
    yarn                         # Yarn package manager
    jdk                          # Java Development Kit
    (android-studio.withSdk androidSdk) # Android Studio bundled with our custom SDK
  ];
  JAVA_HOME = jdk.home;                              # Set JAVA_HOME for tools to find Java
  ANDROID_HOME = "${androidSdk}/libexec/android-sdk"; # Set ANDROID_HOME for Android tools
}
```

New developer joins?
`nix develop`. Done. No installation guides, no version mismatches. Everything is isolated to the project, so there are
no conflicts with other projects or global installs.
Alongside [direnv](https://github.com/direnv) to automatically load the environment when entering the project
directory, it made onboarding a breeze.
Metro bundler just worked, and configuring the Android SDK paths was surprisingly straightforward. That alone made it worth it.

## New to Nix?

If you're not familiar with Nix, check out these resources to get started:

- [Getting started with Nix](https://nix.dev/tutorials/install-nix.html)
- [Nix Pills](https://nixos.org/guides/nix-pills/)
- [NixOS Wiki: Nix](https://nixos.wiki/wiki/Nix)
  You might also consider [devenv.sh](https://devenv.sh/), which provides a simpler abstraction for managing development
  environments with Nix.
