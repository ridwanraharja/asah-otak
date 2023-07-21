import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import PinInput from "react-pin-input";
import { useWizard } from "react-use-wizard";

// assets
import correctIcon from "../assets/correctIcon.png";
import falseIcon from "../assets/falseIcon.png";

export default function Card({ data }) {
  const { nextStep } = useWizard();
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [value, setValue] = useState("");
  const [correct, setCorrect] = useState("");

  const onChangeHandler = (value) => {
    setValue(value);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  // Convert time in seconds to minutes:seconds format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const checkAnswer = () => {
    let answer = data.answer.toLowerCase();
    let inputValue = value.toLowerCase();

    if (answer === inputValue) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  // Sets the timer when the component is installed
  useEffect(() => {
    let timer;
    startTimer();
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      stopTimer();
      checkAnswer();
    }
    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning, timeLeft]);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h1>ASAH OTAK</h1>
      </div>
      <div className={styles.questionBox}>
        <div className={styles.questionTitle}>
          <p>PERTANYAAN</p>
        </div>
        <div className={styles.question}>
          <p>{data.question}</p>
        </div>
      </div>
      <div className={styles.containerInput}>
        <PinInput
          length={data.answer?.length}
          initialValue={data.clue}
          onChange={onChangeHandler}
          type="custom  "
          style={{
            display: "flex",
            padding: "20px",
            gap: "16px",
            margin: "0 30px",
          }}
          inputStyle={{
            borderColor: "white",
            backgroundColor: "white",
            width: "100%",
            height: "50px",
            color: "black",
            fontSize: "40px",
            fontWeight: "600",
          }}
          inputFocusStyle={{ borderColor: "black" }}
        />
      </div>
      <div className={styles.timer}>
        <p>Waktu Tersisa: {formatTime(timeLeft)}</p>
      </div>
      <div
        className={
          correct === true
            ? styles.containerAnswerCorrect
            : styles.containerAnswerFalse
        }
      >
        <button className={styles.btn} onClick={checkAnswer}>
          JAWAB
        </button>

        {correct === true && (
          <div className={styles.containerIcon}>
            <img src={correctIcon} alt="correct" />
          </div>
        )}
        {correct === false && (
          <div className={styles.containerIcon}>
            <img src={falseIcon} alt="false" />
          </div>
        )}
        {correct === true && (
          <button className={styles.btn} onClick={() => nextStep()}>
            NEXT
          </button>
        )}
      </div>
    </div>
  );
}
