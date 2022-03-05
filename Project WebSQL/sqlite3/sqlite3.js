const sqlite3=Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3",connect(t,e=8388608){var n=openDatabase(btoa(new URL(t,location.href).pathname),"1.0",new URL(t,location.href).pathname,e);this.file=new URL(t,location.href).pathname;return Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3.Connection",cursor:()=>Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3.Cursor",execute:(t,e=[])=>new Promise(function(o,c){n.transaction(function(n){n.executeSql(t,e,function(t,e){o(e.rows)},function(t,e){c(e)})})})}),async commit() {
    var sql = this.cursor();
    var code = [];
    var tbls = await sql.execute("select tbl_name, sql from sqlite_master where type = 'table'");
    for(let tbl of tbls) {
        if(tbl.tbl_name == "__WebKitDatabaseInfoTable__" || tbl.tbl_name == "sqlite_sequence") continue;
        code.push([tbl.sql,[]]);
    }
    for(let tbl of tbls) {
        if(tbl.tbl_name == "__WebKitDatabaseInfoTable__" || tbl.tbl_name == "sqlite_sequence") continue;
        let rows = await sql.execute("select * from " + tbl.tbl_name);
        for(let row of rows) {
            let args = [], inj1 = [], inj2 = [];
            for(let col in row) {
                args.push(col);
                inj1.push('?');
            }
            for(let col in row) {
                args.push(row[col]);
                inj2.push('?');
            }
            code.push(['INSERT INTO ' + tbl.tbl_name + '(' + inj.join(',') + ') VALUES (' + inj2.join(',') + ')',args]);
        }
    }
    var cache = await caches.open("sqlite3");
    return cache.put(this.file,new Response(JSON.stringify(code)));
}})}});
