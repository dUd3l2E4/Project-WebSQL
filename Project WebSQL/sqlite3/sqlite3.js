const sqlite3=Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3",connect(t,n=8388608){var e=openDatabase(btoa(t),"1.0",t,n);return Object.assign(Object.create(null),{[Symbol.toString]:"sqlite3.Connection",cursor:()=>new Promise(function(t){e.transaction(function(n){t(Object.assign(Object.create(null),{[Symbol.toStringTag]:"sqlite3.Cursor",execute:(t,n=[])=>new Promise(function(o,c){e.transaction(function(e){e.executeSql(t,n,function(t,n){o(n.rows)},c)})})}))})})})}});
