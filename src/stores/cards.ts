import Vue from 'vue';
import * as Utils from '@/utils/utils.ts';

export interface State {
  name: string;
  suits: {
    spade: number,
    heart: number,
    diamond: number,
    club: number,
    [key: string]: number,
  };
  ranks: {
    A: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
    10: number,
    jack: number,
    queen: number,
    king: number,
    [key: string]: number,
  };
}

export interface Card {
  suit: number;
  rank: number;
}

export const state = Vue.observable<State>({
  name: 'name1',
  /**
   * カードスート
   */
  suits: {
    spade: 1,
    heart: 2,
    diamond: 3,
    club: 4,
  },
  /**
   * カードランク
   */
  ranks: {
    A: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    jack: 11,
    queen: 12,
    king: 13,
  },
});

export const mutations = {};

export const getters = {
  /**
   * 1deckのカード配列を返却する
   */
  deck: (): Card[] => {
    const deck = [];

    for (const rankKey of Object.keys(state.ranks)) {
      const card: Card = { rank: state.ranks[rankKey], suit: 0 };

      for (const suitKey of Object.keys(state.suits)) {
        card.suit = state.suits[suitKey];

        deck.push(Object.assign({}, card));
      }
    }

    return deck;
  },
  /**
   * 1deckからランダムにn枚選択する
   */
  hands: (numberOfHands: number, deck: Card[] | null = null): Card[] => {
    const hands = [];

    if (deck === null) {
      deck = getters.deck();
    }

    // 指定枚数分ランダムに選択する
    const deckMin = 0;
    const deckMax = 51;

    const handNumbers: number[] = Utils.notDuplicateRandom(deckMin, deckMax, numberOfHands);

    for (const handNumber of handNumbers) {
      hands.push(deck[handNumber]);
    }

    return hands;
  },
};
