import React from 'react';

function Picture(props) {
  if (props.status === "closed") {
    return (
      <img
        className="catPicture"
        onClick={props.onClick}
        src={require("./cats/cat_unknown.png")}
      />
    );
  } else {
    return (
      
      <img
        className="catPicture"
        onClick={props.onClick}
        src={require("./cats/cat" + props.catNumber + ".jpg")}
      />
    );
  }
}

export default class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      numberOfOpen: 0,
      catNumbers: randomSequence(),
      status: Array(12).fill("closed"),
      win: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(i) {
    
    // If two cards already is open (opening a third):
    if (this.state.numberOfOpen === 2) {
      const status = this.handleTwoOpen();
      if (status[i] !== "closed") {
        return;
      }
      status[i] = "open";
      
      this.setState({
        status: status,
        numberOfOpen: 1
      })
      
      
      // If opening a card while not two cards are open from before
    } else {
      
      const status = this.state.status.slice();
      
      // You cannot open a closed card
      if (status[i] !== "closed") {
        return;
      }
      if (this.state.numberOfOpen < 2) {
        status[i] = "open";
        this.setState({
          status: status,
          numberOfOpen: this.state.numberOfOpen += 1
        })
        if (this.checkWin(status)) {
          this.setState({
            win: true
          })
        }
      }
    }
  }
  
  handleTwoOpen() {
    var open1 = this.findOpenCard1();
    var open2 = this.findOpenCard2();
    
    let status = this.state.status.slice();
    if (this.isEqual(open1, open2)) {
      status = this.setStateMatching(open1, open2);
    } else {
      status = this.setStateClosed(open1, open2);
    }
    return status;
  }
  
  findOpenCard1() {
    const status = this.state.status.slice();
    for (var i = 0; i < 12; i++) {
      if (status[i] === "open") {
        return i;
      }
    }
  }
  
  findOpenCard2() {
    const status = this.state.status.slice();
    for (var i = 12; i > 0; i--) {
      if (status[i] === "open") {
        return i;
      }
    }
  }
  
  isEqual(card1, card2) {
    var catNumbers = this.state.catNumbers;
    if (catNumbers[card1] === catNumbers[card2]) {
      return true;
    }
    return false;
  }
  
  setStateMatching(card1, card2) {
    const status = this.state.status.slice();
    status[card1] = "matched";
    status[card2] = "matched";
    return status;
  }
  
  setStateClosed(card1, card2) {
    const status = this.state.status.slice();
    status[card1] = "closed";
    status[card2] = "closed";
    return status;
  }
  
  renderPicture(i) {
    return (
      <Picture
        catNumber={this.state.catNumbers[i]}
        status={this.state.status[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
  checkWin(status) {
    let opened = 0;
    let matched = 0;
    for (let i = 0; i < status.length; i++) {
      if (status[i] === "matched") {
        matched++
      }
      if (status[i] === "open") {
        opened++;
      }
    }
    return opened===2&&matched===10;
  }
  
  render() {
    let winnerText = "";
    if (this.state.win) {
      winnerText = "Grattis, du vant!"
    }
    return (
      <div className="content">
        <div className="board-row">
          {this.renderPicture(0)}
          {this.renderPicture(1)}
          {this.renderPicture(2)}
          {this.renderPicture(3)}
        </div>
        <div className="board-row">
          {this.renderPicture(4)}
          {this.renderPicture(5)}
          {this.renderPicture(6)}
          {this.renderPicture(7)}
        </div>
        <div className="board-row">
          {this.renderPicture(8)}
          {this.renderPicture(9)}
          {this.renderPicture(10)}
          {this.renderPicture(11)}
        </div>
        <h1>{winnerText}</h1>
      </div>
    );
  }
}

function randomSequence() {
  var numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  var output = [];
  for (var i = 12; i > 0; i--) {
    var randomIndex = Math.floor((Math.random() * i));
    var randomNumber = numbers[randomIndex];
    output.push(randomNumber);
    numbers.splice(randomIndex, 1);
  }
  return output;
}