const sqlite3=Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3",async connect(e,t=8388608){var a=openDatabase(btoa(new URL(e,location.href).pathname),"1.0",new URL(e,location.href).pathname,t),n=await caches.open("sqlite");if(await n.match(new URL(e,location.href).pathname)){var i=await n.match(new URL(e,location.href).pathname),o=await i.text(),l=JSON.parse(o);for(let e of l)await new Promise(function(t,n){a.transaction(function(a){a.executeSql(e[0],e[1],t,function(e,t){n(t)})})})}else await n.put(new URL(e,location.href).pathname,"[]");return Object.assign(Object.create(null),{file:new URL(e,location.href).pathname,[Symbol.toStringTag]:"sqlite3.Connection",cursor:()=>Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3.Cursor",execute:(e,t=[])=>new Promise(function(n,i){a.transaction(function(a){a.executeSql(e,t,function(e,t){n(t.rows)},function(e,t){i(t)})})})}),async commit(){var e=this.cursor(),t=[],a=await e.execute("select tbl_name, sql from sqlite_master where type = 'table'");for(let e of a)"__WebKitDatabaseInfoTable__"!=e.tbl_name&&"sqlite_sequence"!=e.tbl_name&&t.push([e.sql,[]]);for(let n of a){if("__WebKitDatabaseInfoTable__"==n.tbl_name||"sqlite_sequence"==n.tbl_name)continue;let a=await e.execute("select * from "+n.tbl_name);for(let e of a){let a=[],i=[],o=[];for(let t in e)a.push(t),i.push("?");for(let t in e)a.push(e[t]),o.push("?");t.push(["INSERT INTO "+n.tbl_name+" ("+i.join(",")+") VALUES ("+o.join(",")+")",a])}}var n=await caches.open("sqlite3");return await n.put(this.file,new Response(JSON.stringify(t))),new Blob([JSON.stringify(t)])}})}});
