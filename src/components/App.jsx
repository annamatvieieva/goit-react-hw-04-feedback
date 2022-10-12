import { useState } from "react";
import { GlobalStyle } from './GlobalStyle';
import { FeedbackOptions } from "./FeedbackOptions";
import { Notification } from "./Notification";
import { Section } from "./Section";
import { Statistics } from "./Statistics";

export const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [oneFeedback, setOneFeedback] = useState(false);

  const leaveFeedback = (feedback) => {
    setOneFeedback(true);
    switch (feedback) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        throw new Error(`Unknows feedback - ${feedback}`);
    }
  }

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const goodPercentage = (good===0 ? 0 : Math.round((good / total) * 100)) + '%';
    return goodPercentage;
  }

   return (<>
      <GlobalStyle/>
      <Section title='Please leave feedback'>
       <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={leaveFeedback} />
        {oneFeedback ? <Statistics good={good} neutral={neutral} bad={bad} total={countTotalFeedback()} positivePercentage={countPositiveFeedbackPercentage()} /> : <Notification message='There is no feedback'/>}
      </Section>
      </>
    );
};
