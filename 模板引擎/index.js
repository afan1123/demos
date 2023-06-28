var tplEngine = function (tpl, data) {
  // 用于匹配到<%%>之间的内容
  var reg = /<%([^%>]+)?%>/g,
    // 用于匹配里面是否有js符号
    regOut = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    // 最后生成的字符串
    code = 'var r=[];\n',
    // 记录开始的索引
    cursor = 0;
  /*
      add: 往code中按js逻辑添加js字符串
      line：匹配到的js字符串
      js：区分普通字符串和js字符串
  */
  var add = function (line, js) {
    js
      ? (code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n')
      : (code +=
          line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
    return add;
  };
  // 循环匹配
  while ((match = reg.exec(tpl))) {
    add(tpl.slice(cursor, match.index))(match[1], true);
    cursor = match.index + match[0].length;
  }
  add(tpl.substr(cursor, tpl.length - cursor));
  code += 'return r.join("");';
  let obj = data;
  return new Function('obj', code.replace(/[\r\t\n]/g, ''))(obj);
};

// 模板
var tpl =
  '<ul><% if (obj.show) { %><% for (var i = 0; i < obj.users.length; i++) { %><li><a href="<% obj.users[i].url %>"><% obj.users[i].name %> </a> </li><% } %><% } else { %><p>不展示列表</p><% } %></ul>';
// 数据
var obj = {
  show: true,
  users: [
    {
      name: 'jack',
      url: 'www.baidu.com',
    },
    {
      name: 'rose',
      url: 'www.google.com',
    },
  ],
};
console.log(tplEngine(tpl, obj));
