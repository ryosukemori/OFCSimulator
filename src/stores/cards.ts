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
  deck: Card[];
  hands: Card[];
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

  /**
   * デッキ
   */
  deck: [],

  /**
   * ハンド
   */
  hands: [],
});

export const mutations = {
  updateDeck: (deck: Card[]): void => {
    state.deck = deck;
  },
  updateHands: (hands: Card[]): void => {
    state.hands = hands;
  },
};

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

    if (numberOfHands > 52) {
      throw new Error('1デッキ以上の枚数が指定されている');
    }

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
  /**
   * ハンドから成立する役を判定する
   */
  possibleHand: (hands: Card[] | null = null): string[] => {
    if (hands === null) {
      hands = state.hands;
    }
    const hasHand: string[] = [];

    if (getters.hasOnePairHand(hands)) {
      hasHand.push('OnePair');
    }
    if (getters.hasTwoPairHand(hands)) {
      hasHand.push('TwoPair');
    }
    if (getters.hasThreeOfAKindHand(hands)) {
      hasHand.push('ThreeOfAKind');
    }
    if (getters.hasStraightHand(hands)) {
      hasHand.push('Straight');
    }
    if (getters.hasFlashHand(hands)) {
      hasHand.push('Flash');
    }
    if (getters.hasFullHouseHand(hands)) {
      hasHand.push('FullHouse');
    }
    if (getters.hasQuadsHand(hands)) {
      hasHand.push('Quads');
    }
    if (getters.hasStraightFlsdhHand(hands)) {
      hasHand.push('StragithFlash');
    }

    return hasHand;
  },
  /**
   * ストレート・フラッシュ判定
   */
  hasStraightFlsdhHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    for (const suitKey of Object.keys(state.suits)) {
      const numberOfSuit: Card[] = hands.filter((hand) => hand.suit === state.suits[suitKey]);
      if (numberOfSuit.length >= 5 && getters.hasStraightHand(numberOfSuit)) {
        return true;
      }
    }

    return false;
  },
  /**
   * クワッズ判定
   */
  hasQuadsHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    for (const rankKey of Object.keys(state.ranks)) {
      const numberOfRank: Card[] = hands.filter((hand) => hand.rank === state.ranks[rankKey]);
      if (numberOfRank.length === 4) {
        return true;
      }
    }

    return false;
  },
  /**
   * フルハウス判定
   */
  hasFullHouseHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }
    let NumberOfThreeOfAKind = 0;
    let NumberOfOnePair = 0;
    for (const rankKey of Object.keys(state.ranks)) {
      const numberOfRank: Card[] = hands.filter((hand) => hand.rank === state.ranks[rankKey]);
      if (numberOfRank.length >= 3) {
        NumberOfThreeOfAKind++;
      }
      if (numberOfRank.length >= 2) {
        NumberOfOnePair++;
      }
    }

    if (NumberOfThreeOfAKind >= 2) {
      // スリー・オブ・ア・カインドが2カウント以上ある場合は成立する
      return true;
    } else if (NumberOfThreeOfAKind === 1 && NumberOfOnePair >= 2) {
      // スリー・オブ・ア・カインドが1カウントの場合、ワンペアカウントが2以上ある時成立する
      return true;
    }

    return false;
  },
  /**
   * フラッシュ判定
   */
  hasFlashHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    for (const suitKey of Object.keys(state.suits)) {
      const numberOfSuit: Card[] = hands.filter((hand) => hand.suit === state.suits[suitKey]);
      if (numberOfSuit.length >= 5) {
        return true;
      }
    }

    return false;
  },
  /**
   * ストレート判定
   */
  hasStraightHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    let hasRankBinary = '';
    const handRanks: number[] = hands.map((hand) => hand.rank);
    for (const rankKey of Object.keys(state.ranks)) {
      hasRankBinary += handRanks.indexOf(state.ranks[rankKey]) !== -1 ? '1' : '0';
    }

    if (hasRankBinary.indexOf('11111') !== -1) {
      return true;
    }
    return false;
  },
  /**
   * スリー・オブ・ア・カインド判定
   */
  hasThreeOfAKindHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    for (const rankKey of Object.keys(state.ranks)) {
      const numberOfRank: Card[] = hands.filter((hand) => hand.rank === state.ranks[rankKey]);
      if (numberOfRank.length >= 3) {
        return true;
      }
    }

    return false;
  },
  /**
   * ツーペア判定
   */
  hasTwoPairHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    let pairs = 0;
    for (const rankKey of Object.keys(state.ranks)) {
      const numberOfRank: Card[] = hands.filter((hand) => hand.rank === state.ranks[rankKey]);
      pairs += numberOfRank.length >= 2 ? 1 : 0;

      if (pairs >= 2) {
        return true;
      }
    }

    return false;
  },
  /**
   * ワンペア判定
   */
  hasOnePairHand: (hands: Card[] | null = null): boolean => {
    if (hands === null) {
      hands = state.hands;
    }

    for (const rankKey of Object.keys(state.ranks)) {
      const numberOfRank: Card[] = hands.filter((hand) => hand.rank === state.ranks[rankKey]);
      if (numberOfRank.length >= 2) {
        return true;
      }
    }

    return false;
  },
};
