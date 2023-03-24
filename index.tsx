let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }
    let element = { tag, props: { ...props, children } };
    // console.log(element);
    return element;
  },
};

function render(reactElememt: any, container: HTMLElement) {
  if (["number", "string"].includes(typeof reactElememt)) {
    container.appendChild(document.createTextNode(reactElememt));
    return;
  }
  console.log(reactElememt);
  console.log(container);
  let element = document.createElement(reactElememt.tag);
  if (reactElememt.props) {
    Object.keys(reactElememt.props)
      .filter((p) => p !== "children")
      .forEach((key) => (element[key] = reactElememt.props[key]));
  }
  for (let child of reactElememt.props.children) {
    render(child, element);
  }
  container.appendChild(element);
}

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

render(<App />, document.querySelector("#app"));
