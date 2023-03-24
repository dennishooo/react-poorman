let React = {
  createElement: (...args) => {
    console.log("hiiii");
    console.log(args);
  },
};

const a = <div>hello</div>;
