import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import WelcomeScreen from "../welcome-screen/welcome-sreen.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../const.js";

const testWelcome = () => {
  // eslint-disable-next-line no-alert
  alert(`Сработал роутер на Welcome`);
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _renderGameScreen() {
    console.log(`Начал отрабатывать компонент _renderGameScreen()`);
    console.log(`this.state`, this.state);
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount = {errorsCount}
          onWelcomeButtonClick = {() => {
            this.setState({
              step: 0,
            });
          }}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          console.log(`Начал отрабатывать компонент Жанр`);
          return (
            <GenreQuestionScreen
              question= {question}
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
            />
          );
        case GameType.ARTIST:
          console.log(`отработал Компонент Артист`);
          return (
            <ArtistQuestionScreen
              question={question}
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
            />
          );
      }
    }

    return null;
  }

  render() {
    const {errorsCount, questions} = this.props;
    console.log(`Начал отрабатывать компонент Render`);
    console.log(`this.state`, this.state);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreen
              onAnswer={() => {}}
              questions={questions[0]}
            />
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreen
              onAnswer={() => {}}
              question={questions[1]}
            />
          </Route>
          <Route exact path="/welcome">
            <WelcomeScreen
              errorsCount = {errorsCount}
              onWelcomeButtonClick = {testWelcome}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
