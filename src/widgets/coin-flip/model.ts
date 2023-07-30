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
export const setTotalGain = createEvent<bigint>();
export const setTotalLoss = createEvent<bigint>();

// settings
export const $BetsAmount = createStore<string>('');
export const $BetsAmountInt = createStore<number>(1);
export const $Wager = createStore<string>('');
export const $WagerNum = createStore<bigint>(BigInt(0));
export const $PickedSide = createStore<CoinSide>(CoinSide.Head);
export const $ResultsPending = createStore<boolean>(false);
export const $PlayAnimation = createStore<boolean>(false);
export const $Won = createStore<boolean|null>(null);
export const $TotalGain = createStore<bigint>(BigInt(0));
export const $TotalLoss = createStore<bigint>(BigInt(0));


// handlers
$TotalGain.on(setTotalGain, (old_gain, gain) => old_gain+gain);
$TotalLoss.on(setTotalLoss, (old_loss, loss) => old_loss+loss);
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
        return BigInt(0);
    }
    return BigInt(wager);
});