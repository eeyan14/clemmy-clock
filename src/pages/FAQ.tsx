import React from 'react';
import { Card } from '@rmwc/card';
import './FAQ.css';

const Question = (props: {
    question: string;
    answer: string;
}): React.ReactElement => {
    return (
        <div className="question">
            <p>
                <span>{props.question}</span>
            </p>
            <p>{props.answer}</p>
        </div>
    );
};

export const FAQ = (): React.ReactElement => {
    return (
        <Card className="faq">
            <Question
                question={"What's a pomodoro timer?"}
                answer={
                    'A Pomodoro timer is a time management tool used to break work into intervals, traditionally 25 minutes in length, separated by short breaks. The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s.'
                }
            />
            <Question
                question={'Why should I use a pomodoro timer?'}
                answer={
                    'The Pomodoro Technique enhances productivity and focus by breaking work into manageable intervals, promoting sustained concentration and preventing burnout through regular, scheduled breaks.'
                }
            />
            <Question
                question={'Who is Clemmy?'}
                answer={
                    'Clemmy is a genderless, round blob (reminiscent of clementines), who often appears in Duo presentations and Slackmojis, and usually lacks thumbs, fingers, and visible legs. Clemmy has hair, sometimes. Depends on the day.'
                }
            />
            <Question
                question={'Who made this site?'}
                answer={
                    'This site was created by Esther Lu (developer) and Vanessa Chien Lai (designer) as a fun side project. It is not guaranteed to make you more productive or replace any of your current productivity tools.'
                }
            />
            <Question
                question={'Can I request a feature?'}
                answer={
                    'Yes! Please contact Esther or Vanessa. No SLA — did we mention this project is just for fun?'
                }
            />
        </Card>
    );
};
