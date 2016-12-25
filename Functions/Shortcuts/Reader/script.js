include(["Functions", "Engines", "Wine"]);

var _WineShortcutReader = function(shortcutContent) {
    this.shortcutContent = shortcutContent;

    this.run = function(userArguments) {
        var shortcutContent = JSON.parse(this.shortcutContent);

        if(!userArguments) {
            userArguments = [];
        }

        var arguments = (shortcutContent.arguments ? shortcutContent.arguments : []).concat(Java.from(userArguments));

        new Wine()
            .prefix(shortcutContent.winePrefix)
            .debug(shortcutContent.wineDebug)
            .workingDirectory(shortcutContent.workingDirectory)
            .run(shortcutContent.executable, arguments)
            .wait()
    }
};

var ShortcutReader = function() {
    this.of = function(shortcutContent) {
        this.shortcutContent = shortcutContent;
    };

    this.run = function(userArguments) {
        var shortcutContent = JSON.parse(this.shortcutContent);

        var runner;
        if(shortcutContent.type == "WINE") {
            runner = new _WineShortcutReader(this.shortcutContent);
        }

        runner.run(userArguments);
    }
};