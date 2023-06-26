var tplEngine = function (tpl, data) {
  var reg = /<%([^%>]+)?%>/g,
    regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var r=[];\n',
    cursor = 0;
  var add = function (line, js) {
    js
      ? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n')
      : (code +=
          line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return add;
  };
  while ((match = reg.exec(tpl))) {
    add(tpl.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(tpl.substr(cursor, tpl.length - cursor));
  code += 'return r.join("");';
  let obj = data;
  return new Function('obj', code.replace(/[\r\t\n]/g, ''))(obj);
};

var tpl =
  '<span><% if (obj.show) { %><% for (var i = 0; i < obj.users.length; i++) { %><li><a href="<% obj.users[i].url %>"><% obj.users[i].name %> </a> </li><% } %><% } else { %><p>不展示列表</p><% } %></span>';

var obj = {
  show: true,
  users: [
    {
      name: 'jack',
      url: '213213',
    },
    {
      name: 'rose',
      url: '213213',
    },
  ],
};
console.log(tplEngine(tpl, obj));
