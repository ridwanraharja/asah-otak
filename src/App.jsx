import styles from "./App.module.scss";
import { Wizard } from "react-use-wizard";
import { questions } from "./utils/questions";

// components
import Card from "./components/Card";

function App() {
  return (
    <>
      <div className={styles.app}>
        <Wizard>
          {questions.map((question, index) => (
            <Card data={question} key={index} />
          ))}
        </Wizard>
      </div>
    </>
  );
}

export default App;
