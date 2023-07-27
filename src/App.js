import Block2 from "./components/Block2/Block2";
import Header from "./components/Header/Header";
import Bonus from "./page/Bonus";
import style from "./style.module.css";

function App() {
  return (
    <>
      <header className={style["header"]}>
        <Header />
      </header>
      <main className={style["main"]}>
        <Bonus />
        <Block2 />
      </main>
    </>
  );
}

export default App;
