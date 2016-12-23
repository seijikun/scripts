include(["Functions", "Net", "Download"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Shortcuts", "Wine"]);

var setupWizard = SetupWizard("Internet Explorer 6.0");

setupWizard.presentation("Internet Explorer 6.0", "Microsoft", "http://www.microsoft.com", "Quentin PÂRIS");

var tempFile = createTempFile("exe");

new Resource()
    .wizard(setupWizard)
    .url("http://files.playonlinux.com/ie/6.0/ie60.exe")
    .checksum("8e483db28ff01a7cabd39147ab6c59753ea1f533")
    .to(tempFile)
    .get();

new Wine()
    .wizard(setupWizard)
    .version(LATEST_STABLE_VERSION)
    .architecture("i386")
    .prefix("InternetExplorer6")
    .run(tempFile)
    .wait()
    .run("iexplore", ["-unregserver"])
    .overrideDLL()
        .set("native,builtin", [
                "inetcpl.cpl",
                "itircl",
                "itss",
                "jscript",
                "mlang",
                "mshtml",
                "msimtf",
                "shdoclc",
                "shdocvw",
                "shlwapi",
                "urlmon"
        ]).do();

new WineShortcut()
    .name("Internet Explorer 6.0")
    .prefix("InternetExplorer6")
    .search("iexplore.exe")
    .miniature(["Internet", "Internet Explorer 6.0"])
    .create();

setupWizard.close();