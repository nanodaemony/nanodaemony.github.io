(window.webpackJsonp=window.webpackJsonp||[]).push([[215],{545:function(s,t,n){"use strict";n.r(t);var e=n(4),a=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"_130-系统安全性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_130-系统安全性"}},[s._v("#")]),s._v(" 130.系统安全性")]),s._v(" "),t("h4",{attrs:{id:"认证与授权"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#认证与授权"}},[s._v("#")]),s._v(" 认证与授权")]),s._v(" "),t("h5",{attrs:{id:"_1-基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-基本概念"}},[s._v("#")]),s._v(" 1.基本概念")]),s._v(" "),t("p",[s._v("认证与授权的目的是为了保护系统的安全性.")]),s._v(" "),t("p",[t("strong",[s._v("认证(Authentication)")]),s._v(" 是"),t("strong",[s._v("验证用户身份的凭据")]),s._v("(例如用户名/用户 ID 和密码), 系统得以知道存在这个用户.")]),s._v(" "),t("p",[t("strong",[s._v("授权(Authorization)")]),s._v(" 发生在认证之后. "),t("strong",[s._v("授权就是控制用户对系统的访问权限")]),s._v(". 比如有些特定资源只能具有特定权限的人才能访问比如 admin, 有些对系统资源操作比如删除, 添加, 更新权限只能特定用户才具有.")]),s._v(" "),t("h4",{attrs:{id:"cookie与session🌟"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cookie与session🌟"}},[s._v("#")]),s._v(" Cookie与Session🌟")]),s._v(" "),t("p",[s._v("Cookie 和 Session 都是用来"),t("strong",[s._v("跟踪浏览器用户身份")]),s._v("的会话方式(实现"),t("strong",[s._v("会话跟踪")]),s._v("), 但两者的应用场景不太一样.")]),s._v(" "),t("h5",{attrs:{id:"_1-cookie"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-cookie"}},[s._v("#")]),s._v(" 1.Cookie")]),s._v(" "),t("h6",{attrs:{id:"_1-概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-概述"}},[s._v("#")]),s._v(" (1)概述")]),s._v(" "),t("p",[s._v("Cookies 是"),t("strong",[s._v("存放在")]),s._v("​**==客户端=="),t("strong",[s._v("​")]),s._v(", 一般用来保存用户信息**(通常经过加密). Cookie 不能跨域, 当前及其父级域名可以取值. Cookie 可以设置有效期.")]),s._v(" "),t("h6",{attrs:{id:"_2-cookie使用场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-cookie使用场景"}},[s._v("#")]),s._v(" (2)Cookie使用场景")]),s._v(" "),t("ul",[t("li",[s._v("保存登录信息.")]),s._v(" "),t("li",[s._v("记录用户状态.")]),s._v(" "),t("li",[s._v("记录和分析用户行为. 如记录用户在某个页面的停留状态或者商品浏览记录.")])]),s._v(" "),t("h6",{attrs:{id:"_3-服务端使用cookie"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-服务端使用cookie"}},[s._v("#")]),s._v(" (3)服务端使用Cookie")]),s._v(" "),t("p",[t("strong",[s._v("1) 设置 cookie 返回给客户端")])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@GetMapping")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/user"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("setCookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HttpServletResponse")]),s._v(" response"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 创建一个cookie")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cookie")]),s._v(" cookie "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"username"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Jack"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 设置cookie过期时间(7天)")]),s._v("\n    cookie"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("setMaxAge")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("24")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("60")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("60")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 添加到response中")]),s._v("\n    response"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("addCookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cookie"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"OK!"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("p",[t("strong",[s._v("2) 使用 @CookieValue 注解获取 cookie 值")])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@GetMapping")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("readCookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@CookieValue")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("value "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"username"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" defaultValue "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Atta"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" username"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Username in Cookie: "')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" username"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[t("strong",[s._v("3) 读取所有 Cookie 值")])]),s._v(" "),t("p",[s._v("可以从 "),t("strong",[s._v("HttpServletRequest")]),s._v(" 对象中获取全部 Cookie 值.")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@GetMapping")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/all-cookies"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("readAllCookies")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HttpServletRequest")]),s._v(" request"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cookie")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" cookies "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" request"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getCookies")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cookies "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Arrays")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("stream")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cookies"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("map")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("c "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("->")]),s._v(" c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getName")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"="')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" c"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getValue")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("collect")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Collectors")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("joining")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('", "')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"No cookies"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h5",{attrs:{id:"_2-session"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-session"}},[s._v("#")]),s._v(" 2.Session")]),s._v(" "),t("p",[t("strong",[s._v("Session 的主要作用是通过")]),s._v("​**==服务端=="),t("strong",[s._v("​")]),s._v("记录用户的状态. 典型场景是购物车**, 当要添加商品到购物车的时候, 系统不知道是哪个用户操作的, 因为 HTTP 协议是无状态的. 服务端给特定的用户创建"),t("strong",[s._v("特定的 Session 后")]),s._v("即可标识并跟踪该用户.")]),s._v(" "),t("p",[t("strong",[s._v("如何使用 Session 进行身份验证?")])]),s._v(" "),t("p",[s._v("一般通过 "),t("strong",[s._v("SessionID")]),s._v(" 来实现用户的验证, SessionID 一般会选择存放在 "),t("strong",[s._v("Redis")]),s._v(" 中. 举个例子: 用户成功登陆系统, 然后返回给客户端具有 "),t("strong",[s._v("SessionID 的 Cookie")]),s._v(", 当用户向后端发起请求的时候会把 SessionID 带上, 这样后端就知道用户的身份状态了. 详细过程如下:")]),s._v(" "),t("ol",[t("li",[s._v("用户向服务器发送用户名和密码用于登陆.")]),s._v(" "),t("li",[s._v("服务器验证通过后, 服务器为用户"),t("strong",[s._v("创建一个 Session")]),s._v(", 并将 Session 信息"),t("strong",[s._v("存储")]),s._v("起来.")]),s._v(" "),t("li",[s._v("服务器向用户返回一个 "),t("strong",[s._v("SessionID")]),s._v(", "),t("strong",[s._v("写入用户的 Cookie")]),s._v(".")]),s._v(" "),t("li",[s._v("当用户保持登录状态时, Cookie 将与"),t("strong",[s._v("每个后续请求")]),s._v("一起被发送出去.")]),s._v(" "),t("li",[s._v("服务器获取存储在 Cookie 上的 SessionID 与存储在"),t("strong",[s._v("内存中或者数据库")]),s._v("中的 Session 信息进行"),t("strong",[s._v("比较")]),s._v(", 以验证用户的身份, 返回给用户客户端响应信息的时候会附带用户当前的状态.")])]),s._v(" "),t("p",[s._v("使用 Session 的时候需要注意: (1)依赖 Session 的关键业务一定要"),t("strong",[s._v("确保客户端开启了 Cookie")]),s._v(". (2)注意 Session 的"),t("strong",[s._v("过期时")]),s._v("间.")]),s._v(" "),t("blockquote",[t("p",[s._v("如果没有Cookie的话Session还能用吗?")])]),s._v(" "),t("p",[s._v("一般是通过 "),t("strong",[s._v("Cookie 来保存 SessionID")]),s._v(" , 假如使用 Cookie 保存 SessionID, 且客户端"),t("strong",[s._v("禁用了 Cookie")]),s._v(", 那么 Seesion 就"),t("strong",[s._v("无法")]),s._v("正常工作. 但并不是没有 Cookie 之后就不能用 Session 了, 比如"),t("strong",[s._v("可以将 SessionID 放在请求的 URL 里面, ​")]),s._v("进行 "),t("strong",[s._v("URL 重写")]),s._v(".")]),s._v(" "),t("div",{staticClass:"language-http line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-http"}},[t("code",[t("span",{pre:!0,attrs:{class:"token header"}},[t("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("https")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),t("span",{pre:!0,attrs:{class:"token header-value"}},[s._v("//baidu.com?session_id=xxx")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("这种方案的安全性和用户体验感较低.")]),s._v(" "),t("h5",{attrs:{id:"_3-cookie与session区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-cookie与session区别"}},[s._v("#")]),s._v(" 3.Cookie与Session区别")]),s._v(" "),t("p",[t("strong",[s._v("Cookie")]),s._v(" 数据保存在"),t("strong",[s._v("客户端")]),s._v(", "),t("strong",[s._v("Session")]),s._v(" 数据保存在"),t("strong",[s._v("服务器端")]),s._v(". 相对来说 Session 安全性更高. 如果使用 Cookie 的一些敏感信息不要写入 Cookie 中, 最好能将 Cookie 信息"),t("strong",[s._v("加密")]),s._v("然后使用到的时候再去服务器端解密.")]),s._v(" "),t("h5",{attrs:{id:"_4-spring-session"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-spring-session"}},[s._v("#")]),s._v(" 4.Spring Session")]),s._v(" "),t("p",[s._v("Spring Session 提供了一种"),t("strong",[s._v("跨多个应用程序")]),s._v("或实例管理用户会话信息的机制. 参考文章:")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://codeboje.de/spring-session-tutorial/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Getting Started with Spring Session"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.baeldung.com/spring-session",target:"_blank",rel:"noopener noreferrer"}},[s._v("Guide to Spring Session"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://medium.com/@gvnix/sticky-sessions-with-spring-session-redis-bdc6f7438cc3",target:"_blank",rel:"noopener noreferrer"}},[s._v("Sticky Sessions with Spring Session & Redis"),t("OutboundLink")],1)])]),s._v(" "),t("h4",{attrs:{id:"分布式session"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分布式session"}},[s._v("#")]),s._v(" 分布式Session")]),s._v(" "),t("p",[s._v("针对分布式系统下的多个服务, Session 状态如何管理? 常用的方法有以下几种:")]),s._v(" "),t("h5",{attrs:{id:"_1-集群下的session管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-集群下的session管理"}},[s._v("#")]),s._v(" 1.集群下的Session管理")]),s._v(" "),t("p",[s._v("一个用户的 Session 信息如果存储在一个"),t("strong",[s._v("服务器")]),s._v("上, 那么当负载均衡器把用户的下一个请求转发到另一个服务器, 由于服务器没有用户的 Session 信息, 那么该用户就需要重新进行登录等操作.")]),s._v(" "),t("h6",{attrs:{id:"_1-sticky-session"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-sticky-session"}},[s._v("#")]),s._v(" (1)Sticky Session")]),s._v(" "),t("p",[s._v("需要配置"),t("strong",[s._v("负载均衡器")]),s._v(", 使得"),t("strong",[s._v("一个用户的所有请求都路由到同一个服务器")]),s._v(", 这样就可以把用户的 Session 存放在该服务器中.")]),s._v(" "),t("p",[t("strong",[s._v("缺点")]),s._v(": 当服务器宕机时, 将丢失该服务器上的所有 Session.")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20200529170550230.png",alt:""}})]),s._v(" "),t("h6",{attrs:{id:"_2-session复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-session复制"}},[s._v("#")]),s._v(" (2)Session复制")]),s._v(" "),t("p",[s._v("在服务器之间进行 "),t("strong",[s._v("Session 同步")]),s._v("操作, 每个服务器都有"),t("strong",[s._v("所有用户的 Session 信")]),s._v("息, 因此用户可以向任何一个服务器进行请求.")]),s._v(" "),t("p",[s._v("缺点: "),t("strong",[s._v("占用过多内存")]),s._v("; 同步过程占用网络带宽以及服务器处理器时间.")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20200529170607251.png",alt:""}})]),s._v(" "),t("h6",{attrs:{id:"_3-session服务器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-session服务器"}},[s._v("#")]),s._v(" (3)Session服务器")]),s._v(" "),t("p",[s._v("使用一个"),t("strong",[s._v("单独的服务器存储 Session 数据")]),s._v(", 比如可以使用 "),t("strong",[s._v("Redis")]),s._v(" 这种内存型数据库存储.")]),s._v(" "),t("p",[t("strong",[s._v("优点")]),s._v(": 为了使得大型网站具有伸缩性, 集群中的"),t("strong",[s._v("应用服务器通常需要保持无状态")]),s._v(", 那么应用服务器不能存储用户的会话信息. Session Server 将用户的会话信息单独进行存储, 从而保证了应用服务器的无状态.")]),s._v(" "),t("p",[t("strong",[s._v("缺点")]),s._v(": 需要去实现存取 Session 的额外逻辑.")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/image-20200529170630585.png",alt:"image-20200529170630585"}})]),s._v(" "),t("h5",{attrs:{id:"_2-spring-session-redis"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-spring-session-redis"}},[s._v("#")]),s._v(" 2.Spring Session+Redis")]),s._v(" "),t("p",[s._v("用 "),t("strong",[s._v("Spring Session")]),s._v(" 是一个不错的选择. 可以给 Spring Session "),t("strong",[s._v("配置基于 Redis 来存储 Session 数据")]),s._v(", 然后配置一个 "),t("strong",[s._v("Spring Session 的过滤器")]),s._v(", 这样 Session 相关操作都会交给 Spring Session 了. 接着在代码中就可以使用原生的 Session 操作, 就是"),t("strong",[s._v("直接基于 Spring Session")]),s._v(" 从 Redis 中获取数据了.")]),s._v(" "),t("h5",{attrs:{id:"_4-弃用session"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-弃用session"}},[s._v("#")]),s._v(" 4.弃用Session")]),s._v(" "),t("p",[s._v("使用 "),t("strong",[s._v("JWT Token")]),s._v(" 储存用户身份, 然后再从数据库或者 cache 中获取其他的信息. 这样无论请求分配到哪个服务器都无所谓.")]),s._v(" "),t("h4",{attrs:{id:"token与jwt🌟"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#token与jwt🌟"}},[s._v("#")]),s._v(" Token与JWT🌟")]),s._v(" "),t("h5",{attrs:{id:"_1-概述-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-概述-2"}},[s._v("#")]),s._v(" 1.概述")]),s._v(" "),t("p",[s._v("使用 Session 来鉴别用户的身份会带来一些麻烦, 比如需要保证保存 Session 信息服务器的可用性, "),t("strong",[s._v("不适合移动端")]),s._v("(依赖 Cookie) 等. 使用 "),t("strong",[s._v("Token")]),s._v(" 可以"),t("strong",[s._v("不需要服务端存放 Session 信息")]),s._v("就能实现身份验证. "),t("strong",[s._v("JWT(JSON Web Token)")]),s._v(" 就是这种方式的实现, 这种方式服务端无需保存 Session 数据, "),t("strong",[s._v("只用在客户端保存服务端返回给客户的 Token")]),s._v(" 即可, 扩展性得到提升.")]),s._v(" "),t("p",[t("strong",[s._v("JWT 本质上就一段签名的 JSON 格式的数据. 由于它是带有签名的, 因此接收者可以验证其真实性.")])]),s._v(" "),t("p",[s._v("JWT 由 3 部分构成:")]),s._v(" "),t("ol",[t("li",[t("strong",[s._v("Header")]),s._v("(头部): 描述 JWT 的元数据. 定义了生成"),t("strong",[s._v("签名")]),s._v("的算法及 Token 类型.")]),s._v(" "),t("li",[t("strong",[s._v("Payload")]),s._v("(负载): 用来存放实际"),t("strong",[s._v("需要传递")]),s._v("的数据.")]),s._v(" "),t("li",[t("strong",[s._v("Signature")]),s._v("(签名): 服务器通过 Payload, Header 和一个密钥(secret) 使用 Header 里面指定的签名算法(默认 SHA256) 生成.")])]),s._v(" "),t("p",[s._v("在基于 Token 进行身份验证的应用中, 服务器通过 Payload, Header 和一个密钥(secret)创建"),t("strong",[s._v("令牌(Token)"),t("strong",[s._v("​"),t("strong",[t("strong",[s._v("并将 Token 发送给客户端, 客户端将 Token ​")])]),s._v("​")])]),t("strong",[s._v("保存在 Cookie 或 localStorage 中"),t("strong",[t("strong",[t("strong",[s._v("​")])]),s._v(", 之后客户端发出的所有请求都会")])]),s._v("​"),t("strong",[s._v("携带")]),s._v("这个令牌 Token. 客户端可以把 token 放在 "),t("strong",[s._v("Cookie")]),s._v(" 里面"),t("strong",[s._v("自动发送")]),s._v(", 但这样"),t("strong",[s._v("不能跨域")]),s._v(", 所以更好的做法是"),t("strong",[s._v("放在 HTTP Header")]),s._v(" 的 "),t("strong",[s._v("Authorization")]),s._v(" 字段中: "),t("strong",[s._v("Authorization: Bearer Token")]),s._v(".")]),s._v(" "),t("p",[s._v("详细流程如下:")]),s._v(" "),t("ol",[t("li",[s._v("用户向服务器发送用户名和密码用于登陆系统.")]),s._v(" "),t("li",[s._v("身份验证服务响应并返回了"),t("strong",[s._v("签名的 JWT")]),s._v(", 里面包含了用户信息.")]),s._v(" "),t("li",[s._v("用户以后每次向后端发请求都在 "),t("strong",[s._v("Header 中带上 JWT")]),s._v(".")]),s._v(" "),t("li",[s._v("服务端检查 JWT 并从中获取用户相关信息并进行"),t("strong",[s._v("验证")]),s._v(".")])]),s._v(" "),t("p",[s._v("推荐阅读:")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://dzone.com/articles/jwtjson-web-tokens-are-better-than-session-cookies",target:"_blank",rel:"noopener noreferrer"}},[s._v("JWT (JSON Web Tokens) Are Better Than Session Cookies"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://juejin.im/entry/577b7b56a3413100618c2938",target:"_blank",rel:"noopener noreferrer"}},[s._v("JSON Web Tokens (JWT) 与 Sessions"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("JSON Web Token 入门教程"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485603&idx=1&sn=c8d324f44d6102e7b44554733da10bb7&chksm=cea24768f9d5ce7efe7291ddabce02b68db34073c7e7d9a7dc9a7f01c5a80cebe33ac75248df&token=844918801&lang=zh_CN#rd",target:"_blank",rel:"noopener noreferrer"}},[s._v("彻底理解Cookie, Session, Token"),t("OutboundLink")],1)])]),s._v(" "),t("h5",{attrs:{id:"_2-token认证的特点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-token认证的特点"}},[s._v("#")]),s._v(" 2.Token认证的特点")]),s._v(" "),t("p",[s._v("Token 自身包含了"),t("strong",[s._v("身份验证")]),s._v("所需要的所有信息, 使得服务器"),t("strong",[s._v("不需要存储 Session 信息")]),s._v(", 这增加了系统的"),t("strong",[s._v("可用性和伸缩性")]),s._v(", 大大减轻了服务端的压力. 相比 Session 认证, Token 身份认证主要有如下优势:")]),s._v(" "),t("p",[t("strong",[s._v("(1)可以避免CSRF攻击")])]),s._v(" "),t("p",[t("strong",[s._v("CSRF(Cross Site Request Forgery) 即跨站请求伪造")]),s._v(". 进行 Session 认证的时候, 如果别人通过 cookie 拿到了 sessionId 后就可以冒充用户的身份访问系统了. Session 认证中 "),t("strong",[s._v("Cookie 中的 SessionId 是由浏览器")]),s._v("发送到服务端的, 攻击者可以通过"),t("strong",[s._v("让用户误点攻击链接")]),s._v(", 达到攻击效果.")]),s._v(" "),t("p",[s._v("Token 一般会选择存放在客户端的 "),t("strong",[s._v("LocalStorage")]),s._v(" 中, 这样可以"),t("strong",[s._v("预防 CSRF")]),s._v(" 攻击. 因为即使用户点击了非法链接发送了请求到服务端, 这个非法请求是"),t("strong",[s._v("不会")]),s._v("携带 Token 的, 所以这个请求将是非法的.")]),s._v(" "),t("p",[t("strong",[s._v("需要注意的是不论是 Cookie 还是 token 都无法避免跨站脚本攻击XSS(Cross Site Scripting)")]),s._v(". XSS 中攻击者会用各种方式将"),t("strong",[s._v("恶意代码")]),s._v("注入到其他用户的页面中, 就可以通过"),t("strong",[s._v("脚本")]),s._v("盗用信息, 因为使用"),t("strong",[s._v("脚本的话 cookie 和 token 都可能被盗用")]),s._v(". 为避免 XSS 攻击, 可以选择将 Token 存储在标记为 "),t("strong",[s._v("httpOnly")]),s._v(" 的 Cookie 中, 但这样又导致必须提供 CSRF 保护.")]),s._v(" "),t("p",[s._v("选择: "),t("strong",[s._v("大部分")]),s._v("情况下存放在 "),t("strong",[s._v("LocaStorage")]),s._v(" 下是比较好的选择, 某些情况下可能需要存放在标记为 httpOnly 的 Cookie 中会更好.")]),s._v(" "),t("p",[t("strong",[s._v("(2)适合移动端应用")])]),s._v(" "),t("p",[s._v("使用 Session 进行身份认证需要保存一份信息在"),t("strong",[s._v("服务器端")]),s._v(", 而且这会"),t("strong",[s._v("依赖 Cookie")]),s._v(" 来保存 SessionId, 所以"),t("strong",[s._v("不适合移动端")]),s._v(". 使用 Token 进行身份认证就不会存在这种问题, 因为只要 Token 可以被客户端存储就能够使用, 而且 Token 还可以跨语言使用.")]),s._v(" "),t("p",[t("strong",[s._v("(3)单点登录友好")])]),s._v(" "),t("p",[s._v("使用 Session 进行身份认证的话, 实现单点登录, 需要把用户的 Session 信息保存在"),t("strong",[s._v("一台服务器")]),s._v("上, 并且还会遇到常见的 "),t("strong",[s._v("Cookie 跨域")]),s._v("的问题. 但是使用 Token 进行认证的话, Token 被"),t("strong",[s._v("保存在客户端")]),s._v(", 不会存在这些问题.")]),s._v(" "),t("p",[s._v("Token 本身由 "),t("strong",[s._v("OAuth")]),s._v(" 系列引入后才大规模普及的. 主要目的是支持"),t("strong",[s._v("单点登录")]),s._v(". OAuth 用 Token 作为"),t("strong",[s._v("唯一的凭证")]),s._v(", 使用它的第三方服务器可以在验证完 Token 后建立自己的 Session(既可以用传统 Session, 也可以用 Token 作为 Redis 中的 key), 而把用户身份认证工作完全委托给 OAuth.")]),s._v(" "),t("p",[s._v("Token 也有缺点:")]),s._v(" "),t("p",[t("strong",[s._v("(1)无状态")])]),s._v(" "),t("p",[s._v("正是由于 Token 的"),t("strong",[s._v("无状态")]),s._v(", 也导致了它最大的缺点: 当后端在 Token 有效期内废弃一个 Token 或更改它的权限时, "),t("strong",[s._v("不会立即生效")]),s._v(", 一般需要等到有效期过后才可以. 另外当用户注销时, Token 也还有效. 除非在后端增加额外的处理逻辑.")]),s._v(" "),t("h5",{attrs:{id:"_3-token认证常见问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-token认证常见问题"}},[s._v("#")]),s._v(" 3.Token认证常见问题")]),s._v(" "),t("h6",{attrs:{id:"_1-注销登录等场景下token还有效"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-注销登录等场景下token还有效"}},[s._v("#")]),s._v(" (1)注销登录等场景下Token还有效")]),s._v(" "),t("p",[s._v("即注销登录之后, Token "),t("strong",[s._v("依然有效")]),s._v("的问题, 与之"),t("strong",[s._v("类似")]),s._v("的具体相关场景有: (1)退出登录. (2)修改密码. (3)服务端修改了某个用户具有的权限或者角色. (4)用户的帐户被删除/暂停. (5)用户由管理员注销.")]),s._v(" "),t("p",[s._v("这个问题"),t("strong",[s._v("不存在于 Session 认证方式")]),s._v("中, 因为 Session 认证中只需要服务端"),t("strong",[s._v("删除对应的 Session 记录即可")]),s._v(". 而 Token 一旦派发出去, 如果后端不增加其他逻辑的话, 它在"),t("strong",[s._v("失效之前都是有效")]),s._v("的. 大致有下面几种方案解决方法:")]),s._v(" "),t("ul",[t("li",[t("strong",[s._v("将 Token 存入内存数据库")]),s._v(": 将 Token 存入 Redis. 如果需要让某个 Token 失效就直接从 Redis 中"),t("strong",[s._v("删除这个 Token 即可")]),s._v(". 但这样会导致每次使用 Token 发送请求都要先从 DB 中查询 Token 是否存在的步骤, 且违背了 JWT 的"),t("strong",[s._v("无状态原则")]),s._v(".")]),s._v(" "),t("li",[t("strong",[s._v("黑名单机制")]),s._v(": 和上面的方式类似, 使用内存数据库比如 Redis 维护一个"),t("strong",[s._v("黑名单")]),s._v(", 如果想让某个 Token 失效的话就直接将这个 Token 加入到 "),t("strong",[s._v("黑名单")]),s._v(" 即可. 然后每次使用 Token 进行请求的话都会先判断这个 Token "),t("strong",[s._v("是否存在于黑名单")]),s._v("中.")]),s._v(" "),t("li",[t("strong",[s._v("保持令牌的有效期限短并经常轮换")]),s._v(": 很简单的一种方式. 但是会导致用户登录状态不会被持久记录, 而且需要用户"),t("strong",[s._v("经常登录")]),s._v(".")])]),s._v(" "),t("p",[s._v("对于"),t("strong",[s._v("修改密码后")]),s._v(" Token 还有效问题的解决比较容易, 一种比较好的方式: "),t("strong",[s._v("使用用户密码的哈希值对 Token 进行签名. 因此如果密码更改, 则之前的 Token 将无法通过验证")]),s._v(".")]),s._v(" "),t("h6",{attrs:{id:"_2-token续签问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-token续签问题"}},[s._v("#")]),s._v(" (2)Token续签问题")]),s._v(" "),t("p",[s._v("Token 有效期一般都建议设置的不太长, 那么 Token "),t("strong",[s._v("过期")]),s._v("后如何认证, 如何"),t("strong",[s._v("实现动态刷新 Token")]),s._v(", 以避免用户经常需要重新登录?")]),s._v(" "),t("p",[s._v("Session 认证中一般的续签做法: 假如 Session 有效期 30 分钟, 如果 30 分钟内用户有访问, 就把 Session 有效期被延长 30 分钟.")]),s._v(" "),t("p",[s._v("Token 续签怎么做?")]),s._v(" "),t("ul",[t("li",[t("strong",[s._v("类似于 Session 认证的做法")]),s._v(": 这种方案满足于大部分场景. 假设服务端给的 Token 有效期设置为 30 分钟, 服务端每次进行"),t("strong",[s._v("校验时")]),s._v(", 如果发现 Token 的有效期马上快过期了, 服务端就"),t("strong",[s._v("重新生成 Token 给客户端")]),s._v(". 客户端每次请求都检查新旧 Token, 如果"),t("strong",[s._v("不一致")]),s._v(", 则"),t("strong",[s._v("更新")]),s._v("本地的 Token. 这种做法的问题是仅仅在"),t("strong",[s._v("快过期")]),s._v("的时候请求才会更新 Token, 对客户端不是很友好.")]),s._v(" "),t("li",[t("strong",[s._v("Token 有效期设置到半夜")]),s._v(": 这是一种折衷的方案, 保证了大部分用户白天可以正常登录, 适用于对安全性要求不高的系统.")]),s._v(" "),t("li",[t("strong",[s._v("用户登录返回两个 Token")]),s._v(": 第一个是 "),t("strong",[s._v("acessToken")]),s._v(", 它是"),t("strong",[s._v("Token 本身的过期时间如半个小时")]),s._v(", 另外一个是 "),t("strong",[s._v("refreshToken")]),s._v(" 它的过期时间"),t("strong",[s._v("更长一点")]),s._v("比如为 1 天. 客户端登录后, 将 accessToken 和 refreshToken 保存在"),t("strong",[s._v("本地")]),s._v(", 每次访问将 accessToken 传给服务端. 服务端校验 accessToken 的"),t("strong",[s._v("有效性")]),s._v(", 如果"),t("strong",[s._v("过期")]),s._v("的话, 就将 "),t("strong",[s._v("refreshToken")]),s._v(" 传给服务端. 如果有效, 服务端就生成"),t("strong",[s._v("新的 accessToken 给客户端")]),s._v(". 否则客户端就重新登录即可. 该方案的不足是: 1. 需要客户端"),t("strong",[s._v("配合")]),s._v("; 2. 用户注销的时候需要同时"),t("strong",[s._v("保证两个 Token 都无效")]),s._v("; 3. 重新请求获取 Token 的过程中会有"),t("strong",[s._v("短暂 Token 不可用")]),s._v("的情况(可以通过在客户端设置定时器, 当 accessToken 快过期的时候, "),t("strong",[s._v("提前")]),s._v("去通过 refreshToken 获取新的 accessToken).")])]),s._v(" "),t("h4",{attrs:{id:"oauth2-0🌟"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#oauth2-0🌟"}},[s._v("#")]),s._v(" OAuth2.0🌟")]),s._v(" "),t("p",[s._v("OAuth2.0 就是一种"),t("strong",[s._v("标准授权协议")]),s._v(", 其目的是"),t("strong",[s._v("为第三方应用颁发一个有时效性的令牌 Token")]),s._v(", 使得第三方应用能够"),t("strong",[s._v("通过该令牌获取相关的资源")]),s._v(".")]),s._v(" "),t("p",[s._v("OAuth2.0 的常用场景是"),t("strong",[s._v("第三方登录")]),s._v(", 如其他网站用微信登录一般就是用的 OAuth2.0. 现在 OAuth2.0 也常见于"),t("strong",[s._v("支付场景和开发平台等")]),s._v(".")]),s._v(" "),t("p",[s._v("微信支付账户相关参数:")]),s._v(" "),t("p",[t("img",{attrs:{src:"https://nano-note.oss-cn-beijing.aliyuncs.com/images/%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98-fnglfdlgdfj.jpg",alt:"img"}})]),s._v(" "),t("p",[t("strong",[s._v("相关帖子:")])]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/04/oauth_design.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("OAuth 2.0 的一个简单解释"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://deepzz.com/post/what-is-oauth2-protocol.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("10 分钟理解什么是 OAuth 2.0 协议"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("OAuth 2.0 的四种方式"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/04/github-oauth.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("GitHub OAuth 第三方登录示例教程"),t("OutboundLink")],1)])]),s._v(" "),t("h4",{attrs:{id:"单点登录-sso-🌟"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#单点登录-sso-🌟"}},[s._v("#")]),s._v(" 单点登录(SSO)🌟")]),s._v(" "),t("h5",{attrs:{id:"_1-概述-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-概述-3"}},[s._v("#")]),s._v(" 1.概述")]),s._v(" "),t("p",[t("strong",[s._v("SSO")]),s._v("(Single Sign On) 即"),t("strong",[s._v("单点登录")]),s._v(", 指用户"),t("strong",[s._v("登陆多个子系统的其中一个就有权访问与其相关的其他系统")]),s._v(". 比如登陆京东金融后, 京东超市, 京东家电等子系统都是登录状态.")]),s._v(" "),t("h6",{attrs:{id:"_1-sso与oauth2-0的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-sso与oauth2-0的区别"}},[s._v("#")]),s._v(" (1)SSO与OAuth2.0的区别")]),s._v(" "),t("p",[s._v("OAuth 是一个行业的标准授权协议, 主要用来"),t("strong",[s._v("授权第三方应用获取有限的权限")]),s._v(". 而 SSO 解决的是一个公司的"),t("strong",[s._v("多个相关的系统之间的登陆问题")]),s._v(".")]),s._v(" "),t("h6",{attrs:{id:"_2-单点登录系统的好处"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-单点登录系统的好处"}},[s._v("#")]),s._v(" (2)单点登录系统的好处")]),s._v(" "),t("ol",[t("li",[t("strong",[s._v("用户角度")]),s._v(": 用户能够做到一次登录多次使用, 非常友好.")]),s._v(" "),t("li",[t("strong",[s._v("系统管理员角度")]),s._v(": 系统只需维护一个统一的账号中心.")]),s._v(" "),t("li",[t("strong",[s._v("新系统开发角度")]),s._v(": 新系统开发时只需对接统一的账号中心, 简化开发流程.")])]),s._v(" "),t("h6",{attrs:{id:"_3-核心功能"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-核心功能"}},[s._v("#")]),s._v(" (3)核心功能")]),s._v(" "),t("p",[s._v("单点登录的核心功能有:")]),s._v(" "),t("ul",[t("li",[s._v("单点登录")]),s._v(" "),t("li",[s._v("单点登出")]),s._v(" "),t("li",[s._v("支持跨域单点登录")]),s._v(" "),t("li",[s._v("支持跨域单点登出")])]),s._v(" "),t("p",[s._v("‍")]),s._v(" "),t("h4",{attrs:{id:"参考资料"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[s._v("#")]),s._v(" 参考资料")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.varonis.com/blog/what-is-oauth/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://www.varonis.com/blog/what-is-oauth/"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://tools.ietf.org/html/rfc6749",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://tools.ietf.org/html/rfc6749"),t("OutboundLink")],1)]),s._v(" "),t("li",[s._v("【服务器端使用cookie】"),t("a",{attrs:{href:"https://attacomsian.com/blog/cookies-spring-boot",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://attacomsian.com/blog/cookies-spring-boot"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://learnku.com/articles/17883?order_by=vote_count&",target:"_blank",rel:"noopener noreferrer"}},[s._v("JWT 超详细分析"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://medium.com/@agungsantoso/csrf-protection-with-json-web-tokens-83e0f2fcbcc",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://medium.com/@agungsantoso/csrf-protection-with-json-web-tokens-83e0f2fcbcc"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens",target:"_blank",rel:"noopener noreferrer"}},[s._v("Invalidating JSON Web Tokens"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=a.exports}}]);