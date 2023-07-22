import { createEffect, createEvent, createStore, sample } from 'effector';

export enum CoinSide {
    Head = 1,
    Tails
}

// events
export const setBetsAmount = createEvent<string>();
export const setWager = createEvent<string>();
export const setPickedSide = createEvent<CoinSide>();

// settings
export const $BetsAmount = createStore<string>('');
export const $BetsAmountInt = createStore<number>(1);
export const $Wager = createStore<string>('');
export const $WagerNum = createStore<number>(0);
export const $PickedSide = createStore<CoinSide>(CoinSide.Head);


// handlers
$PickedSide.on(setPickedSide, (_, side) => side);
$BetsAmount.on(setBetsAmount, (_, bets) => bets);
$BetsAmountInt.on(setBetsAmount, (_, bets) => {
    if(bets.length == 0){
        return 1;
    }
    return parseInt(bets);
});

$Wager.on(setWager, (_, wager) => wager);
$WagerNum.on(setWager, (_, wager) => {
    if(wager.length == 0){
        return 0;
    }
    return Number(wager);
});