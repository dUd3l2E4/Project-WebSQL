const sqlite3=Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3",connect(t,e=8388608){var n=openDatabase(btoa(new URL(t,location.href).pathname),"1.0",new URL(t,location.href).pathname,e);return Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3.Connection",cursor:()=>Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3.Cursor",execute:(t,e=[])=>new Promise(function(o,c){n.transaction(function(n){n.executeSql(t,e,function(t,e){o(e.rows)},function(t,e){c(e)})})})})})}});
