import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";


class Deck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            deck:null,
            drawn: []
        };
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({ deck: deck.data});
    }

    async getCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
        let cardRes = await axios.get(cardUrl);
        console.log(cardRes.data);
        if(!cardRes.data.success){
            throw new Error("No card remaining!"); 
        }
        let card = cardRes.data.cards[0];
        this.setState(st =>({
            drawn: [...st.drawn, {
                id: card.code,
                image: card.image,
                name: `${card.value} `
            }]
        }))
        }catch(err){
            alert(err);
        }}

    render() {
        const card = this.state.drawn.map(card => (
            <Card key={card.id} name={card.name} image={card.image} />
        ))
        return (
            <div className="Deck">
                <h1 className='Deck-title'>Card dealer</h1>
                <h2 className='Deck-title subtitle'>A little demo with react</h2>
                <button onClick={this.getCard} className='Deck-btn' >Get Card!</button>
                <div className="Deck-cardarea">{card}</div>                
            </div>
        )
    }
}

export default Deck