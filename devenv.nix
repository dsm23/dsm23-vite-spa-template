{
  lib,
  multiverse,
  pkgs,
  ...
}:

let
  playwright = multiverse.playwright."1.61.1";
in
{
  env = lib.mkMerge [
    {
      PLAYWRIGHT_BROWSERS_PATH = "${playwright.browsers}";
      PLAYWRIGHT_SKIP_DEPENDENCY_CHECK = "1";
      PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
    }
    (lib.mkIf pkgs.stdenv.hostPlatform.isLinux {
      PLAYWRIGHT_HOST_PLATFORM_OVERRIDE = "ubuntu-26.04";
    })
  ];

  packages = with pkgs; [
    just
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_latest;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  scripts.validate-playwright.exec = ''
    playwrightNpmVersion=$(node -p "require('@playwright/test/package.json').version" 2>/dev/null)
    nixPlaywrightBaseVersion=$(echo "${playwright.version}" | cut -d. -f1,2)
    npmPlaywrightBaseVersion=$(echo "$playwrightNpmVersion" | cut -d. -f1,2)

    echo "❄️ Playwright nix version: ${playwright.version}"
    echo "📦 Playwright npm version: $playwrightNpmVersion"

    if [ "$nixPlaywrightBaseVersion" != "$npmPlaywrightBaseVersion" ]; then
        echo "❌ Playwright versions (major, minor) in nix ($nixPlaywrightBaseVersion in devenv.yaml) and npm ($npmPlaywrightBaseVersion in package.json) are not the same! Please adapt the configuration."
    else
        echo "✅ Playwright versions in nix and npm are the same"
    fi

    echo
    env | grep ^PLAYWRIGHT
  '';

  enterShell = ''
    validate-playwright
  '';
}
