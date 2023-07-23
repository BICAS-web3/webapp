import { createEffect, createEvent, createStore, sample } from 'effector';

export enum CoinSide {
    Tails = 0,
    Head,

}

// events
export const setBetsAmount = createEvent<string>();
export const setWager = createEvent<string>();
export const setPickedSide = createEvent<CoinSide>();
export const setResultsPending = createEvent<boolean>();
export const setPlayAnimation = createEvent<boolean>();
export const setWon = createEvent<boolean|null>();

// settings
export const $BetsAmount = createStore<string>('');
export const $BetsAmountInt = createStore<number>(1);
export const $Wager = createStore<string>('');
export const $WagerNum = createStore<number>(0);
export const $PickedSide = createStore<CoinSide>(CoinSide.Head);
export const $ResultsPending = createStore<boolean>(false);
export const $PlayAnimation = createStore<boolean>(false);
export const $Won = createStore<boolean|null>(null);


// handlers
$Won.on(setWon, (_, won) => won);
$PlayAnimation.on(setPlayAnimation, (_, pending) => pending);
$ResultsPending.on(setResultsPending, (_, pending) => pending);
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