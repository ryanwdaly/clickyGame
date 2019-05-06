import React, { Component } from 'react';
import './App.css';
import Card from "./components/Card";
import Nav from "./components/Nav";
import Title from "./components/Title";
import Wrapper from "./components/Wrapper";
import Row from './Row';
import Container from './Container';
import Column from './Column';
import characters from './characters.json';

function switchCards(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class App extends Component {
  state = {
    characters, 
    currentScore: 0, 
    topScore: 0, 
    rightWrong: "", 
    clicked: []
  };

  handleClick = id => {
    if(this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    } 
    else if (newScore === 12) {
      this.setState({ rightWrong: "You Win!" });
    }
    this.handleSwitch();
  }

  handleReset = () => {
    this.setState({
      currentScore: 0, 
      topScore: this.state.topScore,
      rightWrong: "Winter is Coming!", 
      clicked: []
    });
    this.handleSwitch();
  }

  handleSwitch = () => {
    let switchedCards = switchCards(characters);
    this.setState({ characters: switchedCards });
  }

  render() {
    return (
      <Wrapper>
        <Nav
          title="REMEMBER THE NORTH"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />
        <Title>
          Click a character to remember it, but do not pick the same character twice!
        </Title>

        <Container>
          <Row>
            {this.state.characters.map(character => (
              <Column size="md-3 sm-6">
                <Card
                  key={character.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleSwitch={this.handleSwitch}
                  id={character.id}
                  image={character.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }

}

export default App;
