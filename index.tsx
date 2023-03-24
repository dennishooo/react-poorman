let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    let element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};

const App = () => (
  <div className="container" id="container">
    <h1 className="title">wtf</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus
      modi, sit cumque accusantium nemo debitis molestias ipsum voluptate
      commodi fuga expedita, magnam, et architecto! Aut similique cumque ex rem
      quibusdam.
    </p>
  </div>
);

<App />;
