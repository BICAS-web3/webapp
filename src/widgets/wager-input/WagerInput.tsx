import { FC, SetStateAction, Suspense, useEffect } from 'react';
import s from "./styles.module.scss";
import { useState } from 'react';
import { CoinFlipModel } from "@/widgets/coin-flip"
import { useUnit } from 'effector-react';
import CoinFlip from '@/pages/games/coin-flip';

interface WagerErrorMessageProps {
    error: string
}

const WagerErrorMessage: FC<WagerErrorMessageProps> = props => {
    return (
        <div className={s.wager_error_message}>
            <div style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '5px',
                paddingBottom: '5px'
            }}>
                {props.error}
            </div>

        </div>
    )
}

export interface WagerInputProps {
    isMaxActive: boolean
}
export const WagerInput: FC<WagerInputProps> = props => {

    const [BetsAmount, BetsAmountInt, setBetsAmount, Wager, WagerNum, setWager] = useUnit([
        CoinFlipModel.$BetsAmount,
        CoinFlipModel.$BetsAmountInt,
        CoinFlipModel.setBetsAmount,
        CoinFlipModel.$Wager,
        CoinFlipModel.$WagerNum,
        CoinFlipModel.setWager
    ])
    //const [isWagerRight, setIswagerRight] = useState(true);
    // const [wager, setWager] = useState('');
    const [wagerInFocus, setWagerInFocus] = useState(false);

    const changeWager = (event: { target: { value: SetStateAction<string>; }; }) => {
        if (/^\d*\.?\d*$/.test(event.target.value.toString())) {
            setWager(event.target.value.toString());
        }
    };

    const clearWager = () => {
        setWager('');
    };

    return (<>
        <div className={s.wager_input_box}>
            <div style={{
                position: 'relative',
                minHeight: '40px',
                display: 'flex',
                flexGrow: 1,
                flexDirection: "row"
            }}>
                <p style={{
                    paddingLeft: "15px",
                    paddingTop: "15px",
                    color: "whitesmoke",
                    fontWeight: 400,
                    height: "40px"
                }}>Wager</p>

                {props.isMaxActive ? <button className={s.max_button_enabled} >MAX</button> : <button className={s.max_button_disabled} disabled>MAX</button>}

            </div>

            <div className={s.wager_input_placeholder}>
                <div className={s.wager_clear_button} onClick={clearWager}>x</div>
                <input
                    className={s.wager_input}
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    pattern="[0-9]*"
                    onChange={changeWager}
                    value={Wager}
                    onBlur={() => { setWagerInFocus(false) }} onFocus={() => { setWagerInFocus(true) }}
                ></input>
                <div className={s.wager_coin_icon}></div>
            </div>

            {/* {isWagerRight ?
                <div className={s.wager_input_placeholder}>
                    <div className={s.wager_clear_button} onClick={clearWager}>x</div>
                    <input
                        className={s.wager_input}
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        pattern="[0-9]*"
                        onChange={changeWager}
                        value={Wager}
                        onBlur={() => { setWagerInFocus(false) }} onFocus={() => { setWagerInFocus(true) }}
                    ></input>
                    <div className={s.wager_coin_icon}></div>
                </div> :
                <>
                    <div className={s.wager_input_placeholder_wrong}>
                        <div className={s.wager_clear_button} onClick={clearWager} >x</div>
                        <input
                            className={s.wager_input}
                            type="text"
                            inputMode="numeric"
                            placeholder="0"
                            pattern="[0-9]*"
                            onChange={changeWager}
                            value={Wager}
                            onBlur={() => { setWagerInFocus(false) }} onFocus={() => { setWagerInFocus(true) }}
                        ></input>
                        <div className={s.wager_coin_icon}></div>
                    </div>
                    {wagerInFocus && <WagerErrorMessage error={'Wager must be a number'} />}
                </>
            } */}

        </div ></>)
}