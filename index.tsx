let React = {
  createElement: (tag, props, children) => {
    console.log("hiiii");
    console.log({ tag });
    console.log({ props });
    console.log({ children });
  },
};

const a = (
  <div className="container" id="container">
    <div className="title">wtf</div>
  </div>
);
