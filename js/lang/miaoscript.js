var container = require('@ccms/container').DefaultContainer;
var api = require('@ccms/api');
var server = undefined
var Console = undefined
var command = undefined
var chat = undefined
var event = undefined
var task = undefined
var channel = undefined
var bungee = undefined

var self = this;
var console = console;

function preinit() {
    server = container.get(api.server.Server);
    Console = container.get(api.server.Console);
    command = container.get(api.command.Command);
    chat = container.get(api.chat.Chat);
    event = container.get(api.event.Event);
    task = container.get(api.task.TaskManager);
    channel = container.get(api.channel.Channel);
    bungee = container.get(api.proxy.BungeeCord);
}

function load() {
    preinit()
    self = this
    console = new Console(this.description.prefix || this.description.name)
}

function enable() {
    main();
}

function disable() { }

function log(msg) {
    console.info(msg);
}

function registerEventListener(eventType, priority, ignoreCancelled, callback) {
    event.listen(self, eventType.split(".")[eventType.split(".").length - 1], callback, priority.name(), ignoreCancelled);
}

function registerCommand(name, cmdCallback, tabCallback) {
    command.on(self, name, { cmd: cmdCallBack0, tab: tabCallback0 });
}

function unregisterCommand(name) {
    command.off(self, name);
}

function runTaskTimer(interval, async, callback) {
    return task.create(callback, self).async(async).timer(interval).submit();
}

function runTaskLater(delay, async, callback) {
    return task.create(callback, self).async(async).timer(delay).submit();
}

function cancelTask(task) {
    task.cancel();
}

function sendActionBar(player, msg) {
    chat.sendActionBar(server.getPlayer(player.getName()), msg);
}

// 注册插件
module.exports = {
    description: {
        name: name,
        version: version,
        author: author,
        servers: undefined,
        type: "basic",
        source: __filename,
        target: this
    },
    load: load,
    enable: enable,
    disable: disable
};
