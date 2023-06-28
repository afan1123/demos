let mainTask = null;
let microTaskQueue = Promise.resolve();
// 添加微任务
const pushMicro = (fn) => {
  if (!mainTask) {
    mainTask = fn;
    console.log(fn);
    microTaskQueue = microTaskQueue.then(() => {
      mainTask();
    });
  } else {
    microTaskQueue = microTaskQueue.then(fn);
  }
};

// 添加宏任务
const pushMacro = (fn) => {
  mainTask = null;
  setTimeout(fn, 0);
};

const run = () => {
  console.log('a');
  pushMicro(() => {
    console.log('b');
    pushMicro(() => {
      console.log('c');
    });
    pushMacro(() => {
      console.log('d');
    });
  });
  pushMacro(() => {
    console.log('e');
  });
  console.log('f');
};

run();
