{
  pkgs ? import <nixpkgs> { },
}:

pkgs.stdenv.mkDerivation {
  name = "noktorum-com";

  src = builtins.filterSource (
    path: type:
    !(builtins.elem (baseNameOf path) [
      "_site"
      "node_modules"
      ".git"
    ])
  ) ./.;

  nativeBuildInputs = with pkgs; [
    nodejs_24
  ];

  configurePhase = ''
    export HOME=$TMPDIR
    npm ci
  '';

  buildPhase = ''
    echo 'Building site with Eleventy'
    npx @11ty/eleventy
  '';

  installPhase = ''
    mkdir -p $out
    cp -r _site/* $out/
  '';
}
