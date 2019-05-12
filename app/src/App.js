import React from 'react';
import './App.css';
import Card from './components/Card.js'
import NextButton from './components/NextButton.js'
import axios from 'axios';
import CardLoading from './components/CardLoading';
import got_op from './got.mp3';

const IS_LOADING = "IS_LOADING";
const IS_ENTERING = "IS_ENTERING";
const IS_VISIBLE = "IS_VISIBLE";
const IS_LEAVING = "IS_LEAVING";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actualCharacter: 0,
      cardStatus: IS_LOADING,
      characters: [],
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: "https://www.anapioficeandfire.com/api/characters?page=2&pageSize=20"
    }).then(({ data }) =>
      this.setState({
        characters: data.map(character => ({
          characterName: character.name,
          characterCulture: character.culture || "not found",
          characterGender: character.gender,
          isCharacterDead: Boolean(character.died),
          characterSeasonsAppearance: character.tvSeries.length
        })
        ),
        cardStatus: IS_ENTERING,
      })
    ).catch(console.error);
  }

  renderCard = () => {
    const actualCharacter = this.state.characters[this.state.actualCharacter];
    switch (this.state.cardStatus) {
      case IS_LOADING:
        return <CardLoading />
      case IS_ENTERING:
        return <Card
          additionalClass="--cardIn"
          characterName={actualCharacter.characterName}
          characterCulture={actualCharacter.characterCulture}
          characterGender={actualCharacter.characterGender}
          characterSeasonsAppearance={actualCharacter.characterSeasonsAppearance}
          isCharacterDead={actualCharacter.isCharacterDead}
          animationEndHandler={() => this.setState({ cardStatus: IS_VISIBLE })}
        />
      case IS_VISIBLE:
        return <Card
          additionalClass=""
          characterName={actualCharacter.characterName}
          characterCulture={actualCharacter.characterCulture}
          characterGender={actualCharacter.characterGender}
          characterSeasonsAppearance={actualCharacter.characterSeasonsAppearance}
          isCharacterDead={actualCharacter.isCharacterDead}
        />
      case IS_LEAVING:
        return <Card
          additionalClass="--cardOut"
          characterName={actualCharacter.characterName}
          characterCulture={actualCharacter.characterCulture}
          characterGender={actualCharacter.characterGender}
          characterSeasonsAppearance={actualCharacter.characterSeasonsAppearance}
          isCharacterDead={actualCharacter.isCharacterDead}
          animationEndHandler={() => this.setState(state => ({
            cardStatus: IS_ENTERING,
            actualCharacter: Math.floor(Math.random() * state.characters.length),
          }))}
        />
      default: return;
    }
  }

  render() {
    return (
      <main className="appRoot__wrapper">
        <audio autoPlay={true} loop={true} crossOrigin="anonymous">
          <source src={got_op} type="audio/mpeg" />
          Seu player não suporta audio html5
        </audio>
        {this.renderCard()}
        <NextButton clickHandler={() => {
          this.setState({
            cardStatus: IS_LEAVING,
          });
        }} />
      </main>
    );
  }
}

export default App;

