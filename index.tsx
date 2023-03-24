let React = {
  createElement: (tag, props, ...children) => {
    let element = { tag, props: { ...props, children } };
    console.log(element);
    return element;
  },
};

const a = (
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
