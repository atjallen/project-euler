// A relatively involved solution. Not technically very complex
// but requires a lot of code to represent the various types
// and to calculate and handle the various hand ranks

import fs from "fs";
import path from "path";

class Suit {
    static Clubs = 1;
    static Diamonds = 2;
    static Hearts = 3;
    static Spades = 4;

    static fromString(suitStr) {
        switch (suitStr) {
            case "C": return Suit.Clubs;
            case "D": return Suit.Diamonds;
            case "H": return Suit.Hearts;
            case "S": return Suit.Spades;
        }
    }

    static toString(suit) {
        switch (suit) {
            case Value.Clubs: return "Clubs";
            case Value.Diamonds: return "Diamonds";
            case Value.Hearts: return "Hearts";
            case Value.Spades: return "Spades";
        }
    }
}

class Value {
    static Two = 2;
    static Three = 3;
    static Four = 4;
    static Five = 5;
    static Six = 6;
    static Seven = 7;
    static Eight = 8;
    static Nine = 9;
    static Ten = 10;
    static Jack = 11;
    static Queen = 12;
    static King = 13;
    static Ace = 14;

    static fromString(valueStr) {
        switch (valueStr) {
            case "2": return Value.Two;
            case "3": return Value.Three;
            case "4": return Value.Four;
            case "5": return Value.Five;
            case "6": return Value.Six;
            case "7": return Value.Seven;
            case "8": return Value.Eight;
            case "9": return Value.Nine;
            case "T": return Value.Ten;
            case "J": return Value.Jack;
            case "Q": return Value.Queen;
            case "K": return Value.King;
            case "A": return Value.Ace;
        }
    }

    static toString(value) {
        switch (value) {
            case Value.Two: return "Two";
            case Value.Three: return "Three";
            case Value.Four: return "Four";
            case Value.Five: return "Five";
            case Value.Six: return "Six";
            case Value.Seven: return "Seven";
            case Value.Eight: return "Eight";
            case Value.Nine: return "Nine";
            case Value.Ten: return "Ten";
            case Value.Jack: return "Jack";
            case Value.Queen: return "Queen";
            case Value.King: return "King";
            case Value.Ace: return "Ace";
        }
    }
}

class Card {
    static fromString(cardStr) {
        return new Card(
            Value.fromString(cardStr[0]),
            Suit.fromString(cardStr[1]),
        );
    }

    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    toString() {
        return Value.toString(this.value) + " of " + Suit.toString(this.suit) + "s";
    }
}

class HandRank {
    static HighCard = 1;
    static OnePair = 2;
    static TwoPairs = 3;
    static ThreeOfAKind = 4;
    static Straight = 5;
    static Flush = 6;
    static FullHouse = 7;
    static FourOfAKind = 8;
    static StraightFlush = 9;
    static RoyalFlush = 10;

    static toString(rank) {
        switch (rank) {
            case HandRank.HighCard: return "High card";
            case HandRank.OnePair: return "One pair";
            case HandRank.TwoPairs: return "Two pairs";
            case HandRank.ThreeOfAKind: return "Three of a kind";
            case HandRank.Straight: return "Straight";
            case HandRank.Flush: return "Flush";
            case HandRank.FullHouse: return "Full house";
            case HandRank.FourOfAKind: return "Four of a kind";
            case HandRank.StraightFlush: return "Straight flush";
            case HandRank.RoyalFlush: return "Royal flush";
        }
    }

    constructor(rank, values = [], kickers = []) {
        // Represents the actual rank of the hand
        // e.g. flush, straight, two pairs
        this.rank = rank;

        // Values represent the value(s) of the cards that
        // make up this rank (e.g. 3 for a pair of 3s,
        // 3 and 4 for a full house of 3s and 4s). Values
        // are ordered most important first (i.e for a full
        // house the value making up the larger part of the
        // full house comes first).
        this.values = values;

        // Kickers represent the other cards in the hand that
        // don't make up its rank. These are used to break ties
        // in otherwise equivalent hands.
        this.kickers = kickers;
    }

    // Compare this hand rank with another and return a
    // positive number if this rank is greater, a negative
    // number if the other rank is greater or 0 if they're
    // equal
    compare(other) {
        if (this.rank !== other.rank) {
            return this.rank - other.rank;
        }

        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] !== other.values[i]) {
                return this.values[i] - other.values[i];
            }
        }

        for (let i = 0; i < this.kickers.length; i++) {
            if (this.kickers[i] !== other.kickers[i]) {
                return this.kickers[i] - other.kickers[i];
            }
        }

        return 0;
    }

    toString() {
        let str = HandRank.toString(this.rank);

        if (this.values[0]) {
            str += " of " + this.values.map((value) => Value.toString(value) + "s").join(" and ");
        }

        if (this.kickers[0]) {
            str += " with kickers " + this.kickers.map((value) => Value.toString(value)).join(", ");
        }

        return str;
    }
}

class Hand {
    static fromString(handStr) {
        return new Hand(
            handStr
                .split(" ")
                .map((cardStr) => Card.fromString(cardStr))
        );
    }

    // Returns the values of the cards making up a
    // flush if the cards make a flush or null otherwise
    static isFlush(cards) {
        for (let i = 1; i < cards.length; i++) {
            if (cards[i].suit !== cards[0].suit) {
                return null;
            }
        }

        return cards.map((card) => card.value).reverse();
    }

    // Returns the highest value in a straight if the cards
    // make a straight or null otherwise
    static isStraight(cards) {
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i].value !== cards[i + 1].value - 1) {
                return null;
            }
        }

        return cards[cards.length - 1].value;
    }

    // Returns the value making up an N of a kind
    // if one exists and the kickers or null otherwise
    static isNOfAKind(cards, n) {
        mainloop:
        for (let i = 0; i < cards.length - n + 1; i++) {
            for (let j = 0; j < n; j++) {
                if (cards[i].value !== cards[i + j].value) {
                    continue mainloop;
                }
            }

            const nOfAKindValue = cards[i].value;
            const kickers = [];
            for (let j = cards.length - 1; j >= 0; j--) {
                if (j < i || j >= i + n) {
                    kickers.push(cards[j].value);
                }
            }

            return [nOfAKindValue, kickers];
        }

        return [null, null];
    }

    // Returns the major and minor value of a full house
    // if one exists or null otherwise
    static isFullHouse(cards) {
        const valueA = cards[0].value;
        const valueB = cards[4].value;
        const isFullHouse =
            cards[1].value === valueA
            && (
                cards[2].value === valueA
                || cards[2].value === valueB
            )
            && cards[3].value === valueB;

        if (!isFullHouse) {
            return null;
        }

        // Return the values of the two parts of the
        // full house with the value making up the larger
        // part returned first
        if (cards[2].value === valueA) {
            return [valueA, valueB];
        } else {
            return [valueB, valueA];
        }
    }

    // Returns the values of any pairs in the cards
    // and the remaining kickers
    static getPairs(cards) {
        let pairs = [];
        let kickers = [];
        for (let i = 0; i < cards.length; i++) {
            if (i + 1 < cards.length && cards[i].value === cards[i + 1].value) {
                pairs.push(cards[i].value);
                i++;
            } else {
                kickers.push(cards[i].value);
            }
        }

        return [
            pairs.reverse(),
            kickers.reverse(),
        ];
    }

    constructor(cards) {
        this.cards = cards.sort((cardA, cardB) =>
            // Sort by value first then suit
            cardA.value !== cardB.value ?
                cardA.value - cardB.value :
                cardA.suit - cardB.suit
        );
    }

    compare(other) {
        return this.getRank().compare(other.getRank());
    }

    getRank() {
        let kickers;
        const flushValues = Hand.isFlush(this.cards)
        const straightValue = Hand.isStraight(this.cards);

        // Royal flush
        if (flushValues && straightValue === Value.Ace) {
            return new HandRank(HandRank.RoyalFlush);
        }

        // Straight flush
        if (flushValues && straightValue) {
            return new HandRank(
                HandRank.StraightFlush,
                [straightValue]
            );
        }

        // Four of a kind
        let fourOfAKindValue;
        [fourOfAKindValue, kickers] = Hand.isNOfAKind(this.cards, 4);
        if (fourOfAKindValue) {
            return new HandRank(
                HandRank.FourOfAKind,
                [fourOfAKindValue],
                kickers
            );
        }

        // Full house
        const fullHouseValues = Hand.isFullHouse(this.cards);
        if (fullHouseValues) {
            return new HandRank(
                HandRank.FullHouse,
                fullHouseValues
            );
        }

        // Flush
        if (flushValues) {
            return new HandRank(
                HandRank.Flush,
                flushValues
            )
        }

        // Straight
        if (straightValue) {
            return new HandRank(
                HandRank.Straight,
                [straightValue]
            )
        }

        // Three of a kind
        let threeOfAKindValue;
        [threeOfAKindValue, kickers] = Hand.isNOfAKind(this.cards, 3);
        if (threeOfAKindValue) {
            return new HandRank(
                HandRank.ThreeOfAKind,
                [threeOfAKindValue],
                kickers
            );
        }

        let pairs;
        [pairs, kickers] = Hand.getPairs(this.cards);

        // Two pairs
        if (pairs.length === 2) {
            return new HandRank(
                HandRank.TwoPairs,
                pairs,
                kickers
            );
        }

        // One pair
        if (pairs.length === 1) {
            return new HandRank(
                HandRank.OnePair,
                pairs,
                kickers
            )
        }

        // High card
        return new HandRank(
            HandRank.HighCard,
            [kickers[0]],
            kickers.slice(1)
        );
    }
}

function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        swap(arr, i, j);
    }
    return arr;
}

const testHands = [
    "TC JC QC KC AC",
    "9C TC JC QC KC",
    "2C 2D 2H 2S 3C",
    "2C 2D 2H 3C 3S",
    "2C 3C 4C 5C 7C",
    "2C 3C 4C 5C 6D",
    "2C 2D 2H 3C 4C",
    "2C 2D 3C 3D 4C",
    "2C 2D 3C 4D 5C",
    "2C 3D 5S 6D 8S",
];

// for (const testHand of testHands) {
//     const hand = Hand.fromString(testHand);
//     console.log(hand.getRank());
// }

const testPairs = [
    "5H 5C 6S 7S KD 2C 3S 8S 8D TD",
    "5D 8C 9S JS AC 2C 5C 7D 8S QH",
    "2D 9C AS AH AC 3D 6D 7D TD QD",
    "4D 6S 9H QH QC 3D 6D 7H QD QS",
    "2H 2D 4C 4D 4S 3C 3D 3S 9S 9D",
];

// for (const testPair of testPairs) {
//     const handA = Hand.fromString(testPair.slice(0, 14));
//     const handB = Hand.fromString(testPair.slice(15));
//     console.log(handA.compare(handB));
// }

const handsFilepath = path.join(path.dirname(process.argv[1]), "poker.txt");
const pairs = fs.readFileSync(handsFilepath, {
    encoding: "utf-8",
}).split("\n");

let count = 0;
let i = 0;
for (const pair of pairs) {
    if (pair) {
        const hand1 = Hand.fromString(pair.slice(0, 14));
        const hand2 = Hand.fromString(pair.slice(15));
        if (hand1.compare(hand2) > 0) {
            count++;
        }
        // console.log(`${i}:`);
        // console.log(`  ${pair.slice(0, 14)}: ${hand1.getRank()}`);
        // console.log(`  ${pair.slice(15)}: ${hand2.getRank()}`)
    }
    i++;
}

console.log(count);
