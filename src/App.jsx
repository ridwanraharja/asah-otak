import { useState } from "react";
import styles from "./App.module.scss";
import Card from "./components/Card";
import { Wizard } from "react-use-wizard";
import { questions } from "./utils/questions";
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
