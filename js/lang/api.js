/**
 * 记录日志
 * @param {String} msg 
 */
function log(msg) {
}

/**
 * 注册事件监听
 * 使用实例：
 * registerEventListener(
 *     'org.bukkit.event.server.ServerCommandEvent',
 *     Java.type('org.bukkit.event.EventPriority').NORMAL, 
 *     false, 
 *     function(event){ }
 * );
 * @param {String} eventType 事件类型(全限定名)
 * @param {org.bukkit.event.EventPriority} priority 事件监听优先级
 * @param {Boolean} ignoreCancelled 是否监听被取消的事件
 * @param {*} callback 事件触发的回调
 * 
 */
function registerEventListener(eventType, priority, ignoreCancelled, callback) {
}

/**
 * 注册指令
 * 使用实例:
 * registerCommand("test",
 *     function (sender, cmd, args) {
 *     },
 *     function (sender, cmd, args) {
 *         return ["tab", "complete"];
 *     });
 * 注：sender会进行转换以确保类型为 org.bukkit.entity.Player 或 org.bukkit.command.ConsoleCommandSender
 * 注：cmd为
 * 注：args为String[]
 * @param {String} name 指令名
 * @param {*} cmdCallback 指令被执行的回调
 * @param {*} tabCallback 指令补全时的回调
 */
function registerCommand(name, cmdCallback, tabCallback) {
}

/**
 * 注销指令
 * @param {String} name 指令名
 */
function unregisterCommand(name) {
}

/**
 * 按间隔执行任务
 * 任务函数格式为 function (){ }
 * @param {Number} interval 间隔tick数
 * @param {boolean} async 是否为异步任务，true为异步任务
 * @param {*} callback 任务函数
 * @returns 任务对象
 */
function runTaskTimer(interval, async, callback) {
}

/**
 * 延时执行任务
 * 任务函数格式为 function (){ }
 * @param {Number} delay  延迟tick数
 * @param {boolean} async  是否为异步任务，true为异步任务
 * @param {*} callback 任务函数
 * @returns 任务对象
 */
function runTaskLater(delay, async, callback) {
}

/**
 * 取消任务
 * @param {*} task 任务对象
 */
function cancelTask(task) {
}

/**
 * 发送物品栏上方ActionBar消息
 * @param {org.bukkit.entity.Player} player 接收消息的玩家
 * @param {String} msg 信息内容
 */
function sendActionBar(player, msg) {
}
