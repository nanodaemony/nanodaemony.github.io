(window.webpackJsonp=window.webpackJsonp||[]).push([[229],{557:function(_,v,t){"use strict";t.r(v);var s=t(4),r=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"_31-redis持久化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_31-redis持久化"}},[_._v("#")]),_._v(" 31.Redis持久化")]),_._v(" "),v("p",[_._v("持久化方式: "),v("strong",[_._v("RDB, AOF, 混合持久化")]),_._v(".")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20200425182633664.png",alt:"image-20200425182633664"}})]),_._v(" "),v("ol",[v("li",[_._v("客户端向数据库"),v("strong",[_._v("发送写命令")]),_._v(".")]),_._v(" "),v("li",[_._v("数据库"),v("strong",[_._v("接收")]),_._v("到客户端"),v("strong",[_._v("写请求")]),_._v(".")]),_._v(" "),v("li",[_._v("数据库"),v("strong",[_._v("调用系统 API")]),_._v("将数据写入磁盘(数据在内核缓冲区中).")]),_._v(" "),v("li",[_._v("操作系统将"),v("strong",[_._v("写缓冲区")]),_._v("传输到"),v("strong",[_._v("磁盘控控制器")]),_._v("(数据在磁盘缓存中).")]),_._v(" "),v("li",[_._v("操作系统的磁盘控制器将数据写入实际的物理媒介中(数据在磁盘中).")])]),_._v(" "),v("p",[v("strong",[_._v("注意")]),_._v(": 上面的过程其实是 "),v("strong",[_._v("极度精简")]),_._v(" 的, 在实际的操作系统中, "),v("strong",[_._v("缓存")]),_._v("和"),v("strong",[_._v("缓冲区")]),_._v("会比这 "),v("strong",[_._v("多得多")]),_._v(".")]),_._v(" "),v("h4",{attrs:{id:"rdb持久化🌟"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#rdb持久化🌟"}},[_._v("#")]),_._v(" RDB持久化🌟")]),_._v(" "),v("p",[_._v("RDB 持久化是把当前进程数据生成"),v("strong",[_._v("快照")]),_._v("保存到硬盘的过程.")]),_._v(" "),v("h5",{attrs:{id:"_1-触发机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-触发机制"}},[_._v("#")]),_._v(" 1.触发机制")]),_._v(" "),v("p",[_._v("触发 RDB 持久化过程分为"),v("strong",[_._v("手动触发")]),_._v("和"),v("strong",[_._v("自动触发")]),_._v(".")]),_._v(" "),v("h6",{attrs:{id:"_1-手动触发"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-手动触发"}},[_._v("#")]),_._v(" (1)手动触发")]),_._v(" "),v("p",[v("strong",[_._v("手动触发")]),_._v("分别对应 "),v("strong",[_._v("save")]),_._v(" 和 "),v("strong",[_._v("bgsave")]),_._v(" 命令.")]),_._v(" "),v("ul",[v("li",[v("strong",[_._v("save")]),_._v(": "),v("strong",[_._v("阻塞")]),_._v("当前 Redis 服务器, 直到 RDB 过程完成. 如果数据量大可能阻塞太长, 已经"),v("strong",[_._v("废弃")]),_._v(", 生产环境别用.")]),_._v(" "),v("li",[v("strong",[_._v("bgsave")]),_._v(": Redis 进程执行 "),v("strong",[_._v("fork")]),_._v(" 操作创建"),v("strong",[_._v("子进程")]),_._v(", RDB 持久化过程由"),v("strong",[_._v("子进程负责")]),_._v(", 完成后自动结束. "),v("strong",[_._v("阻塞只发生在 fork 创建子进程的阶段, 一般时间很短")]),_._v(", 生产环境使用.")])]),_._v(" "),v("h6",{attrs:{id:"_2-自动触发"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-自动触发"}},[_._v("#")]),_._v(" (2)自动触发")]),_._v(" "),v("p",[_._v("自动触发的场景:")]),_._v(" "),v("ul",[v("li",[v("strong",[_._v("save m n")]),_._v(" 表示如果在 m 秒内数据集存在 n 次修改时, "),v("strong",[_._v("自动触发 bgsave")]),_._v(".")]),_._v(" "),v("li",[_._v("如果从节点执行"),v("strong",[_._v("全量复制")]),_._v("操作, 主节点自动执行 bgsave 生成 RDB 文件并发送给从节点.")]),_._v(" "),v("li",[_._v("执行 debug reload 命令重新加载 Redis 时, 也会自动触发 save 操作.")]),_._v(" "),v("li",[_._v("默认情况下执行 shutdown 命令时, 如果没有开启 AOF, 则自动执行 bgsave.")])]),_._v(" "),v("h5",{attrs:{id:"_2-流程说明"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-流程说明"}},[_._v("#")]),_._v(" 2.流程说明")]),_._v(" "),v("h6",{attrs:{id:"_1-流程概述"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-流程概述"}},[_._v("#")]),_._v(" (1)流程概述")]),_._v(" "),v("p",[v("strong",[_._v("bgsave")]),_._v(" 是主流的触发 RDB 持久化的方式, 流程如下.")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20220522212958905.png",alt:""}})]),_._v(" "),v("p",[_._v("(1) Redis 父进程首先判断: 当前"),v("strong",[_._v("是否正在执行")]),_._v(" save 或 bgsave/bgrewriteaof 的子进程, 如果在执行则 bgsave 命令"),v("strong",[_._v("直接返回")]),_._v(". bgsave/bgrewriteaof 的子进程"),v("strong",[_._v("不能同时执行")]),_._v(", 主要是基于性能方面的考虑: 两个并发的子进程同时执行大量的磁盘写操作, 可能引起严重的性能问题.")]),_._v(" "),v("p",[_._v("(2) 父进程执行 "),v("strong",[_._v("fork")]),_._v(" 操作"),v("strong",[_._v("创建子进程")]),_._v(", 这个过程中"),v("strong",[_._v("父进程是阻塞")]),_._v("的, Redis 不能执行来自客户端的任何命令, 但这个阻塞时间"),v("strong",[_._v("很短")]),_._v(".")]),_._v(" "),v("p",[_._v("(3) 父进程 fork 创建完子进程后, "),v("strong",[_._v("bgsave 命令")]),_._v('返回 "Background saving started" 信息并'),v("strong",[_._v("不再阻塞")]),_._v("父进程, 并可以响应其他命令.")]),_._v(" "),v("p",[_._v("(4) 子进程"),v("strong",[_._v("创建 RDB")]),_._v(" 文件, 根据"),v("strong",[_._v("父进程内存快照生成临时快照文件")]),_._v(", 完成后对"),v("strong",[_._v("原有文件")]),_._v("进行"),v("strong",[_._v("原子替换")]),_._v(".")]),_._v(" "),v("p",[_._v("(5) 子进程发送信号给父进程表示完成, 父进程"),v("strong",[_._v("更新统计信息")]),_._v(".")]),_._v(" "),v("h6",{attrs:{id:"_2-写时复制机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-写时复制机制"}},[_._v("#")]),_._v(" (2)写时复制机制")]),_._v(" "),v("p",[_._v('RBD 也叫 "'),v("strong",[_._v("快照")]),_._v('" 持久化. 操作系统多进程写时复制 '),v("strong",[_._v("COW(Copy On Write) 机制")]),_._v(" 十分重要. "),v("strong",[_._v("Redis")]),_._v(" 在持久化时会调用函数 "),v("strong",[_._v("fork()")]),_._v(" 产生一个"),v("strong",[_._v("子进程")]),_._v(", 简单理解也就是基于当前进程"),v("strong",[_._v("复制")]),_._v("了一个进程, 主进程和子进程会"),v("strong",[_._v("共享")]),_._v("内存里面的代码块和数据段:")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20200425182803920.png",alt:"image-20200425182803920"}})]),_._v(" "),v("p",[_._v("所以"),v("strong",[_._v("快照持久化")]),_._v("可以完全交给"),v("strong",[_._v("子进程")]),_._v("来处理, "),v("strong",[_._v("父进程")]),_._v("则继续"),v("strong",[_._v("处理客户端请求")]),_._v(". "),v("strong",[_._v("子进程")]),_._v("做数据持久化, 它"),v("strong",[_._v("不会修改现有的内存数据结构")]),_._v(", 它只是对数据结构进行"),v("strong",[_._v("遍历读取")]),_._v(", 然后序列化写到磁盘中. 但"),v("strong",[_._v("父进程")]),_._v("不一样, 它必须持续服务客户端请求, 然后对"),v("strong",[_._v("内存数据结构进行不间断的修改")]),_._v(".")]),_._v(" "),v("p",[_._v("这时候就会使用操作系统的 "),v("strong",[_._v("Copy On Write 机制")]),_._v("来进行"),v("strong",[_._v("数据段页面")]),_._v("的"),v("strong",[_._v("分离")]),_._v(". 数据段是由很多操作系统的页面组合而成, 当父进程对其中一个页面的数据进行"),v("strong",[_._v("修改")]),_._v("时, 会将"),v("strong",[_._v("被共享的页面复制一份分离")]),_._v("出来, 然后"),v("strong",[_._v("对这个复制的页面进行修改")]),_._v(". 这时"),v("strong",[_._v("子进程")]),_._v("相应的页面是"),v("strong",[_._v("没有变化的")]),_._v(", 还是进程产生时"),v("strong",[_._v("那一瞬间")]),_._v("的数据.")]),_._v(" "),v("p",[_._v("子进程因为数据没有变化, 它能看到的"),v("strong",[_._v("内存里的数据在进程产生的一瞬间就凝固")]),_._v("了, 再也不会改变, 这也是为什么 "),v("strong",[_._v("Redis")]),_._v(" 的持久化"),v("strong",[_._v("叫「快照」的原因")]),_._v("!!! 接下来子进程就可以非常安心的遍历数据了进行序列化写磁盘了.")]),_._v(" "),v("h5",{attrs:{id:"_3-rdb文件"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-rdb文件"}},[_._v("#")]),_._v(" 3.RDB文件")]),_._v(" "),v("p",[_._v("RDB 文件是经过"),v("strong",[_._v("压缩的二进制文件")]),_._v(", Redis 默认采用 "),v("strong",[_._v("LZF 算法")]),_._v("对生成的 RDB 文件做"),v("strong",[_._v("压缩处理")]),_._v(", 压缩后的文件"),v("strong",[_._v("远远小于")]),_._v("内存大小.")]),_._v(" "),v("p",[v("strong",[_._v("RDB 文件保存在 dir 配置指定的目录下, 文件名通过 dbfilename 配置.")])]),_._v(" "),v("h5",{attrs:{id:"_4-rdb优缺点"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-rdb优缺点"}},[_._v("#")]),_._v(" 4.RDB优缺点")]),_._v(" "),v("p",[v("strong",[_._v("(1)优点")])]),_._v(" "),v("p",[_._v("RDB 文件是紧凑压缩的二进制文件, 消耗"),v("strong",[_._v("空间少")]),_._v(". RDB 文件代表某个时间点上的"),v("strong",[_._v("数据快照")]),_._v(", 所以非常适合于"),v("strong",[_._v("备份, 全量复制")]),_._v("等场景. Redis "),v("strong",[_._v("加载 RDB 文件恢复数据的速度远远快于")]),_._v(" AOF 方式.")]),_._v(" "),v("p",[v("strong",[_._v("(2)缺点")])]),_._v(" "),v("p",[_._v("RDB "),v("strong",[_._v("无法做到实时持久化, 秒级持久化")]),_._v(". 因为 RDB 属于"),v("strong",[_._v("重量级操作")]),_._v(", 不能频繁执行. 一般用于"),v("strong",[_._v("数据冷备和复制传输")]),_._v(". RDB 是用特定的二进制格式存储, 会出现多版本的格式, 导致新老版本不兼容.")]),_._v(" "),v("h4",{attrs:{id:"aof持久化🌟"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#aof持久化🌟"}},[_._v("#")]),_._v(" AOF持久化🌟")]),_._v(" "),v("p",[_._v("由于 RDB 不适合实时持久化, 所以 Redis 提供了 AOF 持久化方式. "),v("strong",[_._v("AOF(Append Only File) 持久化")]),_._v(", 是将 Redis 执行的每次写"),v("strong",[_._v("命令记录到单独的日志文件")]),_._v("中, 当 Redis "),v("strong",[_._v("重启")]),_._v("时"),v("strong",[_._v("再次执行")]),_._v(" AOF 文件中的命令来恢复数据. 与 RDB 相比, AOF 的"),v("strong",[_._v("实时性更好")]),_._v(", 因此已成为主流的持久化方案.")]),_._v(" "),v("h5",{attrs:{id:"_1-使用aof"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用aof"}},[_._v("#")]),_._v(" 1.使用AOF")]),_._v(" "),v("p",[_._v("配置开启 AOF: "),v("strong",[_._v("appendonly yes")]),_._v(".")]),_._v(" "),v("p",[_._v("文件名配置: "),v("strong",[_._v("appendfilename")]),_._v(". 默认 appendonly.aof.")]),_._v(" "),v("p",[_._v("保存路径: "),v("strong",[_._v("dir")]),_._v(".")]),_._v(" "),v("p",[_._v("缓冲区同步文件策略: "),v("strong",[_._v("appendfsync")]),_._v(" 参数配置.")]),_._v(" "),v("h5",{attrs:{id:"_2-工作流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-工作流程"}},[_._v("#")]),_._v(" 2.工作流程")]),_._v(" "),v("p",[_._v("AOF 工作流程如下: 命令写入, 文件同步, 文件重写, 重启加载.")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20220522213407811.png",alt:""}})]),_._v(" "),v("h6",{attrs:{id:"_1-命令写入"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-命令写入"}},[_._v("#")]),_._v(" (1)命令写入")]),_._v(" "),v("p",[_._v("写入的内容直接是"),v("strong",[_._v("文本协议格式")]),_._v(". 这样可以提高兼容性同时避免二次处理的开销, 且"),v("strong",[_._v("可读性")]),_._v("更好.")]),_._v(" "),v("p",[_._v("如果每条指令都直接写入硬盘, 那开销太大了, 所以"),v("strong",[_._v("写的命令")]),_._v("都是先追加到 "),v("strong",[_._v("aod_buf(缓冲区)"),v("strong",[_._v("​"),v("strong",[v("strong",[_._v("中, 之后根据一定的")])]),_._v("​")]),_._v("同步策略")]),_._v("将缓冲区的命令同步到磁盘中. Redis 可以提供"),v("strong",[_._v("多种缓冲区同步策略")]),_._v(", 在性能和安全性方面做出平衡.")]),_._v(" "),v("h6",{attrs:{id:"_2-文件同步"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-文件同步"}},[_._v("#")]),_._v(" (2)文件同步")]),_._v(" "),v("p",[_._v("指令被写入 AOF 日志, 而 "),v("strong",[_._v("AOF 日志")]),_._v("是以"),v("strong",[_._v("文件")]),_._v("的形式存在的, 当程序对 AOF 日志文件进行写操作时, 实际上是将内容写到了"),v("strong",[_._v("内核为文件描述符分配的一个内存缓存")]),_._v("中, 然后内核会异步将命令数据刷回到磁盘.")]),_._v(" "),v("p",[_._v("有多种 AOF 缓冲区同步文件策略, 由 "),v("strong",[_._v("appendfsync")]),_._v(" 参数配置, 可配置值如下.")]),_._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[_._v("同步策略可配置值")]),_._v(" "),v("th",{staticStyle:{"text-align":"center"}},[_._v("说明")])])]),_._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[_._v("always")]),_._v(" "),v("td",{staticStyle:{"text-align":"center"}},[_._v("命令写入 "),v("strong",[_._v("aof_buf")]),_._v(" 后"),v("strong",[_._v("立即调用系统")]),_._v(" "),v("strong",[_._v("fsync 操作")]),_._v("同步到 AOF 文件, fsync 完成后线程返回. 这样"),v("strong",[_._v("每次有写命令都要同步")]),_._v("到 AOF 文件, 硬盘 IO 成为性能瓶颈, 此时只能支持大约"),v("strong",[_._v("几百")]),_._v(" TPS 写入, 严重降低了性能, 别用!!!")])]),_._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[_._v("no")]),_._v(" "),v("td",{staticStyle:{"text-align":"center"}},[_._v("命令写入 "),v("strong",[_._v("aof_buf")]),_._v(" 后调用系统 "),v("strong",[_._v("write 操作")]),_._v(", 不对 AOF 文件做 "),v("strong",[_._v("fsync 同步")]),_._v("; 同步"),v("strong",[_._v("由操作系统负责")]),_._v(", 通常同步周期为 "),v("strong",[_._v("30 秒")]),_._v(". 文件同步的时间"),v("strong",[_._v("不可控")]),_._v(", 且缓冲区中堆积的数据会很多, 数据安全性"),v("strong",[_._v("无法保证")]),_._v(".")])]),_._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[v("strong",[_._v("==everysec==")])]),_._v(" "),v("td",{staticStyle:{"text-align":"center"}},[_._v("命令写入 "),v("strong",[_._v("aof_buf")]),_._v(" 后调用系统 "),v("strong",[_._v("write 操作")]),_._v(", write 完成后线程"),v("strong",[_._v("返回")]),_._v("; "),v("strong",[_._v("fsync 同步文件")]),_._v("操作由"),v("strong",[_._v("专门的线程每秒调用一次")]),_._v(". 它是前述两种策略的折中, 是性能和数据安全性的平衡, 因此是 Redis 的"),v("strong",[_._v("默认推荐配置")]),_._v(". 理论上来说系统宕机丢失的数据也在 "),v("strong",[_._v("2 秒")]),_._v("之内(不是 1 秒).")])])])]),_._v(" "),v("blockquote",[v("p",[v("strong",[_._v("关于系统调用write与fsync")])])]),_._v(" "),v("p",[v("strong",[_._v("write 系统调用会触发延迟写机制")]),_._v(". Linux 在内核提供页缓冲区来提高硬盘 IO 性能. write 操作在"),v("strong",[_._v("写入系统缓冲区")]),_._v("后"),v("strong",[_._v("直接返回")]),_._v(". 同步硬盘操作依赖于系统调度机制. 同步文件之前, 如果系统宕机, 那么缓冲区内的数据丢失.")]),_._v(" "),v("p",[v("strong",[_._v("fsync 系统调用")]),_._v("针对单个文件操作(比如 AOF 文件), 将"),v("strong",[_._v("阻塞")]),_._v("直到数据写入硬盘后返回, 做"),v("strong",[_._v("强制硬盘同步")]),_._v(", 保证数据持久化, 但是开销较大.")]),_._v(" "),v("h6",{attrs:{id:"_3-文件重写"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-文件重写"}},[_._v("#")]),_._v(" (3)文件重写")]),_._v(" "),v("p",[_._v("Redis 服务器执行的"),v("strong",[_._v("写命令")]),_._v("随时间越来越多, AOF 文件也会"),v("strong",[_._v("越来越大")]),_._v("; 过大的 AOF 文件不仅会影响服务器的正常运行, 也会导致"),v("strong",[_._v("数据恢复需要的时间过长")]),_._v(".")]),_._v(" "),v("blockquote",[v("p",[_._v("AOF持久化方式为什么要文件重写?")])]),_._v(" "),v("p",[v("strong",[_._v("AOF 重写")]),_._v("是指"),v("strong",[_._v("定期重写 AOF 文件")]),_._v(", "),v("strong",[_._v("减小了 AOF 文件的体积")]),_._v(". 由于重写后 AOF 执行的命令减少了, 文件重写既可以减少文件占用的空间, 也可以"),v("strong",[_._v("加快加载恢复的速度")]),_._v(".")]),_._v(" "),v("blockquote",[v("p",[_._v("文件重写为什么能压缩AOF文件?")])]),_._v(" "),v("ul",[v("li",[v("strong",[_._v("过期")]),_._v("的数据不再写入文件.")]),_._v(" "),v("li",[v("strong",[_._v("无效的命令")]),_._v("不再写入文件: 如有些数据被重复设值(set mykey v1, set mykey v2), 有些数据被删除了(sadd myset v1, del myset)等.")]),_._v(" "),v("li",[_._v("多条命令可以"),v("strong",[_._v("合并为一个")]),_._v(": 如 sadd myset v1, sadd myset v2, sadd myset v3 可以合并为 sadd myset v1 v2 v3.")])]),_._v(" "),v("p",[_._v("需要注意, "),v("strong",[_._v("AOF 重写")]),_._v("是把 Redis "),v("strong",[_._v("进程内的数据转化为写命令")]),_._v(", 同步到新的 AOF 文件; "),v("strong",[_._v("不会对旧的")]),_._v(" AOF 文件进行任何读取, 写入操作!")]),_._v(" "),v("blockquote",[v("p",[_._v("AOF重写何时进行? 触发机制?")])]),_._v(" "),v("p",[v("strong",[_._v("(1)")]),_._v(" "),v("strong",[_._v("手动触发")]),_._v(": 直接调用 "),v("strong",[_._v("bgrewriteaof")]),_._v(" 命令. 该命令的执行与 bgsave 有些类似: 都是 fork 子进程进行具体的工作, 且都只有在 fork 时阻塞.")]),_._v(" "),v("p",[v("strong",[_._v("(2) 自动触发")]),_._v(": 根据 "),v("strong",[_._v("auto-aof-rewrite-min-size")]),_._v(" 和 "),v("strong",[_._v("auto-aof-rewrite-percentage")]),_._v(" 参数, 以及 aof_current_size 和 aof_base_size 状态确定触发时机.")]),_._v(" "),v("ul",[v("li",[_._v("auto-aof-rewrite-min-size: 执行 AOF "),v("strong",[_._v("重写时")]),_._v(", 文件的"),v("strong",[_._v("最小体积")]),_._v(", 默认值为 64MB.")]),_._v(" "),v("li",[_._v("auto-aof-rewrite-percentage: 执行 AOF 重写时, "),v("strong",[_._v("当前")]),_._v(" AOF 大小(即 aof_current_size)和上一次重写时 AOF 大小(aof_base_size)的"),v("strong",[_._v("比值")]),_._v(".")])]),_._v(" "),v("p",[_._v("只有当 auto-aof-rewrite-min-size 和 auto-aof-rewrite-percentage 两个参数"),v("strong",[_._v("同时满足")]),_._v("时, 才会自动触发 AOF 重写, 即 "),v("strong",[_._v("bgrewriteaof")]),_._v(" 操作.")]),_._v(" "),v("blockquote",[v("p",[_._v("AOF重写流程?")])]),_._v(" "),v("p",[_._v("见下图.")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20220522213612372.png",alt:""}})]),_._v(" "),v("p",[_._v("(1) Redis 父进程首先判断当前是否存在"),v("strong",[_._v("正在执行")]),_._v(" bgsave/bgrewriteaof 的子进程, 如果存在则 bgrewriteaof 命令"),v("strong",[_._v("直接返回")]),_._v("; 如果存在 bgsave 命令则等 bgsave 执行完成后再执行, 这个主要是基于性能方面的考虑.")]),_._v(" "),v("p",[_._v("(2) 父进程执行 "),v("strong",[_._v("fork 操作")]),_._v("创建"),v("strong",[_._v("子进程")]),_._v(", 这个过程中"),v("strong",[_._v("父进程是阻塞")]),_._v("的, 仅这一段时间.")]),_._v(" "),v("p",[_._v("(3) 父进程 fork 后, "),v("strong",[_._v("bgrewriteaof 命令返回")]),_._v(' "Background append only file rewrite started" 信息并'),v("strong",[_._v("不再阻塞")]),_._v("父进程, 然后可以继续响应其他命令. Redis 的所有写命令"),v("strong",[_._v("依然写入 AOF 缓冲区")]),_._v(", 并根据 appendfsync 策略同步到硬盘, 保证原有 AOF 机制的正确.")]),_._v(" "),v("p",[_._v("(4) 由于 fork 操作使用**==写时复制技术=="),v("strong",[_._v(", 子进程只能")]),_._v("共享 fork 操作时"),v("strong",[_._v("的内存数据. 由于父进程")]),_._v("依然在响应命令**, 因此 Redis 使用 "),v("strong",[_._v("AOF 重写缓冲区")]),_._v("(图中的 aof_rewrite_buf)保存这部分数据, 防止"),v("strong",[_._v("新 AOF 文件生成期间丢失这部分数据")]),_._v(". 也就是说, bgrewriteaof 执行期间, Redis 的"),v("strong",[_._v("写命令同时追加")]),_._v("到 aof_buf 和 aof_rewirte_buf 两个缓冲区. 缓冲区专门用于保存"),v("strong",[_._v("在重写期间操作数据带来的变化")]),_._v(".")]),_._v(" "),v("p",[_._v("(5) 子进程根据"),v("strong",[_._v("内存快照")]),_._v(", 按照命令合并规则写入到"),v("strong",[_._v("新的 AOF")]),_._v(" 文件. 子进程写完新的 AOF 文件后, 向父进程发信号, 父进程更新"),v("strong",[_._v("统计信息")]),_._v(", 具体可以通过 "),v("strong",[_._v("info persistence")]),_._v(" 查看.")]),_._v(" "),v("p",[_._v("(6) 父进程把 AOF "),v("strong",[_._v("重写缓冲区(aof_rewrite_buf)")]),_._v(" 的数据写入到"),v("strong",[_._v("新的")]),_._v(" AOF 文件, 这样就保证了新 AOF 文件所保存的数据库状态和服务器"),v("strong",[_._v("当前状态一致")]),_._v(".")]),_._v(" "),v("p",[_._v("(7) 使用新的 AOF 文件"),v("strong",[_._v("替换")]),_._v("老文件, 完成 AOF 重写.")]),_._v(" "),v("h6",{attrs:{id:"_4-重启加载"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-重启加载"}},[_._v("#")]),_._v(" (4)重启加载")]),_._v(" "),v("p",[_._v("当 AOF "),v("strong",[_._v("开启")]),_._v("时, Redis 启动时会"),v("strong",[_._v("优先载入 AOF 文件")]),_._v("来恢复数据; 只有当 "),v("strong",[_._v("AOF 关闭")]),_._v("时, 才会载入 "),v("strong",[_._v("RDB")]),_._v(" 文件恢复数据.")]),_._v(" "),v("p",[v("strong",[_._v("文件校验机制")]),_._v(": 如果"),v("strong",[_._v("加载损坏")]),_._v("的 AOF 文件时会"),v("strong",[_._v("拒绝启动")]),_._v(", 并打印日志. 损坏的 AOF 文件也是可以修复的.")]),_._v(" "),v("h4",{attrs:{id:"混合持久化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#混合持久化"}},[_._v("#")]),_._v(" 混合持久化")]),_._v(" "),v("p",[_._v("重启 Redis 时, 很少使用 RDB 来恢复内存状态, 因为会丢失大量数据. 通常使用 "),v("strong",[_._v("AOF 日志重放")]),_._v(", 但是重放 AOF 日志性能相对 RDB 来说要"),v("strong",[_._v("慢很多")]),_._v(", 这样在 Redis 实例很大的情况下, 启动需要花费很长的时间.")]),_._v(" "),v("p",[v("strong",[_._v("Redis 4.0")]),_._v(" 为了解决这个问题, 带来了一个新的持久化选项: "),v("strong",[_._v("混合持久化")]),_._v(". 将 RDB 文件的内容和增量的 AOF 日志文件"),v("strong",[_._v("存在一起")]),_._v(". 这里的 AOF 日志不再是全量的日志, 而是"),v("strong",[_._v("自持久化开始到持久化结束")]),_._v(" 的这段时间发生的"),v("strong",[_._v("增量 AOF 日志")]),_._v(", 通常这部分 AOF 日志很小:")]),_._v(" "),v("p",[v("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20220522223551618.png",alt:""}})]),_._v(" "),v("p",[_._v("于是在 Redis 重启的时候, 可以先加载 RDB 的内容, 然后再重放增量 AOF 日志就可以完全替代之前的 AOF 全量文件重放, "),v("strong",[_._v("重启效率因此大幅得到提升")]),_._v(".")]),_._v(" "),v("h4",{attrs:{id:"持久化问题与优化🌟"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#持久化问题与优化🌟"}},[_._v("#")]),_._v(" 持久化问题与优化🌟")]),_._v(" "),v("p",[_._v("持久化阻塞主线程场景主要有: "),v("strong",[_._v("fork 阻塞和 AOF 追加阻塞")]),_._v(". "),v("strong",[_._v("fork 阻塞时间跟内存量和系统有关, AOF 追加阻塞说明系统硬盘资源紧张.")])]),_._v(" "),v("h5",{attrs:{id:"_1-fork操作"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-fork操作"}},[_._v("#")]),_._v(" 1.fork操作")]),_._v(" "),v("p",[_._v("当 Redis 做 RDB 或 AOF 重写时, 必不可少的操作就是执行 "),v("strong",[_._v("fork 系统调用来创建子进程")]),_._v(", 但这是一个"),v("strong",[_._v("重量级操作")]),_._v(". 虽然 fork 创建的子进程不需要拷贝父进程的物理空间, 但是会"),v("strong",[_._v("复制父进程的空间内存页表")]),_._v("(页表相当于内存的索引, 目录). 所以 fork 操作耗时与"),v("strong",[_._v("进程总内存量")]),_._v("息息相关. "),v("strong",[_._v("父进程")]),_._v("的数据空间越大, 内存页表越大, fork 时复制"),v("strong",[_._v("耗时也会越多")]),_._v(".")]),_._v(" "),v("blockquote",[v("p",[_._v("如何改善 fork 操作的耗时?")])]),_._v(" "),v("ul",[v("li",[_._v("控制 Redis 实例"),v("strong",[_._v("最大可用内存")]),_._v(", fork 耗时与内存量成正比. 线上建议一个 Redis 实例内存控制在 10GB 之内.")]),_._v(" "),v("li",[_._v("合理配置 Linux 内存分配策略, 避免"),v("strong",[_._v("物理内存不足")]),_._v("导致 fork 失败.")]),_._v(" "),v("li",[_._v("降低 fork 操作频率, 如可用适当放宽 AOF 自动触发时机.")])]),_._v(" "),v("h5",{attrs:{id:"_2-子进程开销"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-子进程开销"}},[_._v("#")]),_._v(" 2.子进程开销")]),_._v(" "),v("p",[_._v("需要重点关注.")]),_._v(" "),v("ul",[v("li",[_._v("CPU: 尽量保证同一时刻只有一个子进程执行重写操作.")]),_._v(" "),v("li",[_._v("内存: 避免在大量写入时做子进程"),v("strong",[_._v("重写")]),_._v("操作, 这样将导致父进程维护大量页副本, 造成内存消耗.")]),_._v(" "),v("li",[_._v("硬盘: 不要和其他高硬盘负载的服务部署到一起, 如存储服务, 消息队列服务等.")])]),_._v(" "),v("h5",{attrs:{id:"_3-aof追加阻塞"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-aof追加阻塞"}},[_._v("#")]),_._v(" 3.AOF追加阻塞")]),_._v(" "),v("p",[_._v("AOF 持久化时 "),v("strong",[_._v("everysec")]),_._v(" 是常用的同步硬盘策略. Redis 使用"),v("strong",[_._v("另一条线程每秒执行 fsync 同步硬盘")]),_._v(". 当系统资源"),v("strong",[_._v("繁忙")]),_._v("时, 会造成 Redis "),v("strong",[_._v("主线程阻塞")]),_._v(".")]),_._v(" "),v("p",[_._v("注意: "),v("strong",[_._v("everysec")]),_._v(" 配置"),v("strong",[_._v("最多可能丢失 2 秒")]),_._v("内的数据, 不是 1 秒. 如果系统 fsync 缓慢, 将会导致 Redis 线程阻塞影响效率.")]),_._v(" "),v("p",[_._v("‍")]),_._v(" "),v("p",[_._v("‍")]),_._v(" "),v("h4",{attrs:{id:"参考资料"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[_._v("#")]),_._v(" 参考资料")]),_._v(" "),v("ul",[v("li",[_._v("《Redis开发与运维》")])])])}),[],!1,null,null,null);v.default=r.exports}}]);