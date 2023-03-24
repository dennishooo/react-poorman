let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      try {
        return tag(props);
      } catch ({ promise, key }) {
        promise.then((data) => {
          promiseCache.set(key, data);
          reRender();
        });
        return { tag: "h1", props: { children: "I AM LOADING" } };
      }
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

const state = [];
let stateCursor = 0;

function useState(initialState: any): [any, any] {
  const FROZENCURSOR = stateCursor;
  state[FROZENCURSOR] = state[FROZENCURSOR] || initialState;
  console.log({ initialState });

  let setState = (newState: any) => {
    state[FROZENCURSOR] = newState;
    reRender();
    console.log({ newState });
    console.log({ state });
  };
  stateCursor++;
  return [state[FROZENCURSOR], setState];
}

const promiseCache = new Map();
const createResource = (thingThatReturnSth, key) => {
  if (promiseCache.get(key)) {
    return promiseCache.get(key);
  }

  throw { promise: thingThatReturnSth(), key };
};

const App = () => {
  const [person, setPerson] = useState("dennis");
  const [count, setCount] = useState(0);
  const dogPhotoUrl = createResource(
    () =>
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .then((payload) => payload.message),
    "DOG"
  );

  let onNameChange = (name) => {
    reRender();
    console.log(name);

    setPerson(name);
  };

  return (
    <div className="container" id="container">
      <h1 className="title">wtf {person}</h1>
      <h3 className="title">the count is: {count}</h3>
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>

      <input
        type="text"
        placeholder="name"
        onchange={(e) => {
          console.log("changing......");

          onNameChange(e.target.value);
        }}
      />
      {/* <div>{JSON.stringify(dogPhotoUrl)}</div> */}
      <img src={dogPhotoUrl} alt="doggie" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus
        modi, sit cumque accusantium nemo debitis molestias ipsum voluptate
        commodi fuga expedita, magnam, et architecto! Aut similique cumque ex
        rem quibusdam.
      </p>
    </div>
  );
};
render(<App />, document.querySelector("#app"));

const reRender = () => {
  stateCursor = 0;
  document.querySelector("#app").innerHTML = "";
  render(<App />, document.querySelector("#app"));
};
