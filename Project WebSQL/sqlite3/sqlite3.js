const sqlite3 = Object.assign(Object.create(null), {
    [Symbol.toStringTag]: "sqlite3",
    async connect(e, t = 8388608) {
        var n = openDatabase(btoa(new URL(e, location.href).pathname), "1.0", new URL(e, location.href).pathname, t),
            a = await caches.open("sqlite3");
        if (await a.match(new URL(e, location.href).pathname)) {
            var o = await a.match(new URL(e, location.href).pathname),
                i = await o.text(),
                s = JSON.parse(i),
                c = await new Promise(function (e, t) {
                    n.transaction(function (n) {
                        n.executeSql(
                            "select tbl_name from sqlite_master where type = 'table'",
                            [],
                            function (t, n) {
                                e(n);
                            },
                            function (e, n) {
                                t(n);
                            }
                        );
                    });
                });
            for (let e of c.rows) {
                if(e.tbl_name == "__WebKitDatabaseInfoTable__" || e.tbl_name == "sqlite_sequence") continue;
                await new Promise(function (t, a) {
                    n.transaction(function (n) {
                        n.executeSql("drop table " + e.tbl_name, [], t, function (e, t) {
                            a(t);
                        });
                    });
                });
            }
            for (let e of s)
                await new Promise(function (t, a) {
                    n.transaction(function (n) {
                        n.executeSql(e[0], e[1], t, function (e, t) {
                            a(t);
                        });
                    });
                });
        } else await a.put(new URL(e, location.href).pathname, new Response("[]"));
        return Object.assign(Object.create(null), {
            file: new URL(e, location.href).pathname,
            [Symbol.toStringTag]: "sqlite3.Connection",
            cursor: () =>
                Object.assign(Object.create(null), {
                    [Symbol.toStringTag]: "sqlite3.Cursor",
                    execute: (e, t = []) =>
                        new Promise(function (a, o) {
                            n.transaction(function (n) {
                                n.executeSql(
                                    e,
                                    t,
                                    function (e, t) {
                                        a(t.rows);
                                    },
                                    function (e, t) {
                                        o(t);
                                    }
                                );
                            });
                        }),
                }),
            async commit() {
                var e = this.cursor(),
                    t = [],
                    n = await e.execute("select tbl_name, sql from sqlite_master where type = 'table'");
                for (let e of n) "__WebKitDatabaseInfoTable__" != e.tbl_name && "sqlite_sequence" != e.tbl_name && t.push([e.sql, []]);
                for (let a of n) {
                    if ("__WebKitDatabaseInfoTable__" == a.tbl_name || "sqlite_sequence" == a.tbl_name) continue;
                    let n = await e.execute("select * from " + a.tbl_name);
                    for (let e of n) {
                        let n = [],
                            o = [],
                            i = [];
                        for (let t in e) n.push(t), o.push("?");
                        for (let t in e) n.push(e[t]), i.push("?");
                        t.push(["INSERT INTO " + a.tbl_name + " (" + o.join(",") + ") VALUES (" + i.join(",") + ")", n]);
                    }
                }
                var a = await caches.open("sqlite3");
                return await a.put(this.file, new Response(JSON.stringify(t))), new Blob([JSON.stringify(t)]);
            },
        });
    },
});
