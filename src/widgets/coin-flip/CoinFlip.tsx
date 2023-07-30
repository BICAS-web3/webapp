import { AnimationAction } from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, act } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { Section } from '@/shared/ui/section';
import { WagerInput } from '../wager-input';
import s from "./styles.module.scss";
import { useState, SetStateAction } from 'react';
import { sessionModel } from '@/entities/session';
import { useUnit } from 'effector-react';
import { CoinFlipModel } from './index';
import { MMSDK } from '@/entities/session/model';
import { ethers } from 'ethers';
import { ADDRESS as CoinFlipAddress, ABI as CoinFlipAbi } from '@/shared/data/contracts/CoinFlip';
import { ADDRESS as VRFCoordinatorAddress, ABI as VRFCoordinatorAbi } from '@/shared/data/contracts/VRFCoordinatorV2Mock';
import { AvailableNetworks } from '@/shared/data/networks';
import { CoinSide } from './model';
import Web3 from 'web3';
import { hexZeroPad } from 'ethers/lib/utils';
import ReactDOM from 'react-dom';
import { ABI as IERC20 } from '@/shared/data/contracts/ERC20'
var bigDecimal = require('js-big-decimal');

interface CoinModelProps {
    action: CoinSide;
    play?: boolean;
}

const CoinModel: FC<CoinModelProps> = ({ action, play = false }) => {
    const { scene, animations } = useGLTF('/coinflip/3dcoinOrigin.gltf');
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
        if (play && actions.topface && actions.bottomface) {
            const current = actions[action == CoinSide.Tails ? 'bottomface' : 'topface'] as AnimationAction;
            current.play();
            current.clampWhenFinished = true;
            current.setLoop(2200, 1);
        }
    }, [play, action]);

    // @ts-ignore
    return play ? <primitive object={scene} /> : null;
};

export const CoinFlipAnimation: FC<CoinModelProps> = ({ action, play = false }) => {
    return (
        <div
            style={{
                //position: 'absolute',
                width: '500px',
                height: '100%',
                zIndex: 10,
                pointerEvents: 'none',

            }}
        >
            <Canvas camera={{ position: [1, 6, 1] }} style={{ pointerEvents: 'none' }}>
                <Suspense fallback={null}>
                    <pointLight position={[0, 10, -5]} intensity={0.5} color='#fff' />
                    <pointLight position={[10, -10, 5]} intensity={0.5} color='#fff' />
                    <pointLight position={[0, -10, 5]} intensity={0.5} color='#fff' />
                    <CoinModel action={action} play={play} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export const Heads: FC<{}> = () => {
    //return (<><div className={[s.heads_image, s.coin_side].join(' ')}></div></>)
    return (<div style={{ backgroundColor: 'green', height: '100%' }}></div>)
}

export const Tails: FC<{}> = () => {
    //return (<><div className={[s.tails_image, s.coin_side].join(' ')}></div></>)
    return (<div style={{ backgroundColor: 'red', height: '100%' }}></div>)
}

export interface CoinProps {
    action: CoinSide,
    play: boolean
}

export const Coin: FC<CoinProps> = props => {
    // return (<>
    //     {
    //         !props.play ? <div id={s.coin_container}>
    //             <Heads />
    //             <Tails />
    //         </div> : <>
    //             {
    //                 props.action == CoinSide.Head ? <div id={s.coin_container} className={s.heads}>
    //                     <Heads />
    //                     <Tails />
    //                 </div> : <div id={s.coin_container} className={s.tails}>
    //                     <Heads />
    //                     <Tails />
    //                 </div>
    //             }
    //         </>
    //     }
    // </>)

    return (<>
        <div id={s.coin_container}>{
            props.action == CoinSide.Head ?
                <Heads />

                :

                <Tails />

        }</div></>)
}

export interface CoinFlipSettingsProps { }

export const CoinFlipSettings: FC<CoinFlipSettingsProps> = props => {

    const [sessionAddress, pending, checked, chosenNetwork, chosenToken] = useUnit([
        sessionModel.$sessionAddress,
        sessionModel.$sessionPending,
        sessionModel.$sessionChecked,
        sessionModel.$chosenNetwork,
        sessionModel.$chosenToken
    ]);

    const [BetsAmount,
        BetsAmountInt,
        setBetsAmount,
        Wager,
        WagerNum,
        setWager,
        pickedSide,
        setPickedSide,
        resultsPending,
        setResultsPending,
        playAnimation,
        setPlayAnimation,
        Won,
        setWon,
        totalGain,
        setTotalGain,
        totalLoss,
        setTotalLoss
    ] = useUnit([
        CoinFlipModel.$BetsAmount,
        CoinFlipModel.$BetsAmountInt,
        CoinFlipModel.setBetsAmount,
        CoinFlipModel.$Wager,
        CoinFlipModel.$WagerNum,
        CoinFlipModel.setWager,
        CoinFlipModel.$PickedSide,
        CoinFlipModel.setPickedSide,
        CoinFlipModel.$ResultsPending,
        CoinFlipModel.setResultsPending,
        CoinFlipModel.$PlayAnimation,
        CoinFlipModel.setPlayAnimation,
        CoinFlipModel.$Won,
        CoinFlipModel.setWon,
        CoinFlipModel.$TotalGain,
        CoinFlipModel.setTotalGain,
        CoinFlipModel.$TotalLoss,
        CoinFlipModel.setTotalLoss
    ]);


    const changeBets = (event: { target: { value: SetStateAction<string>; }; }) => {
        const parsed = parseInt(event.target.value.toString(), 10);
        if (!isNaN(parsed)) {
            if (parsed <= 0 || parsed > 100) {
                // not in range
            }
            else {
                setBetsAmount(parsed.toString());
            }
        } else {
            // not a number
            if (event.target.value.toString().length == 0) {
                // empty string

                setBetsAmount('')
            }
        }
    }

    const makeBet = async (pickedSide: CoinSide) => {
        const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));
        const web3Utils = new Web3();

        const signer = await ethereum.getSigner();
        const coinflip_contract = new ethers.Contract(CoinFlipAddress, CoinFlipAbi, signer);
        const vrfcoordinator_contract = new ethers.Contract(VRFCoordinatorAddress, VRFCoordinatorAbi, ethereum);

        const tokenAddress = AvailableNetworks.get(chosenNetwork)?.tokens[chosenToken].contractAddress;
        const tokenContract = new ethers.Contract(tokenAddress as string, IERC20, signer);

        let fees = await coinflip_contract.getVRFFee(1000000);

        let resultsPending = false;

        const filter = coinflip_contract.filters.CoinFlip_Outcome_Event(await signer.getAddress());
        ethereum.on(filter, (event) => {
            if (!resultsPending) {
                return;
            }

            const types = CoinFlipAbi[13].inputs;
            const decodedParameters: any = web3Utils.eth.abi.decodeLog(types, event.data, event.topics);
            let total_wager: bigint = decodedParameters.numGames as bigint * decodedParameters.wager as bigint;
            let payout: bigint = decodedParameters.payout;
            let loss: bigint = total_wager - payout;
            console.log(payout);
            console.log(loss);
            setTotalGain(payout);
            setTotalLoss(loss);
            if (pickedSide.valueOf() == decodedParameters.coinOutcomes[0] as number) {
                console.log("You won!");
            } else {
                console.log("You lost!");
            }
            setWon(pickedSide.valueOf() == decodedParameters.coinOutcomes[0] as number);
            console.log(decodedParameters);
            resultsPending = false;

            console.log(decodedParameters.coinOutcomes[0] as CoinSide);

            // let coinWrapper: HTMLElement = (document.getElementById('coin') as HTMLElement);
            // ReactDOM.unmountComponentAtNode(coinWrapper);
            // ReactDOM.render(<CoinFlipAnimation action={decodedParameters.coinOutcomes[0] as CoinSide} play={true} />, coinWrapper)

            //setPickedSide(decodedParameters.coinOutcomes[0] as CoinSide);
            //setPlayAnimation(true);
        })

        let allowance = await tokenContract.allowance(sessionAddress, CoinFlipAddress);

        if (allowance < (WagerNum * BigInt(BetsAmountInt))) {
            await tokenContract.approve(CoinFlipAddress, WagerNum * BigInt(BetsAmountInt * 10));
        }

        await coinflip_contract.CoinFlip_Play(WagerNum, tokenAddress, pickedSide, BetsAmountInt, 100000000000000, 100000000000000, { value: 3000000000000000, gasLimit: 3000000, gasPrice: 2500000256 });

        resultsPending = true;
    }

    return (<>
        <div id='settings-block'
            style={{
                position: "relative",
                //padding: "20px",
                top: "110px",
                width: "200px",
            }}>
            <WagerInput isMaxActive={false} />

            <div className={s.settings_box}>
                <div className={s.multiple_bets_container}>
                    <div style={{
                        paddingLeft: "15px",
                        paddingTop: "15px",
                        color: "whitesmoke",
                        fontWeight: 400,
                        height: "40px",
                        width: "112px",
                    }}>Multiple bets</div>
                    <input
                        className={s.multiple_bets_input}
                        type="text"
                        inputMode="numeric"
                        placeholder="1"
                        pattern="[0-9]*"
                        max='10'
                        value={BetsAmount}
                        onChange={changeBets}
                    ></input>
                    <div style={{
                        flexBasis: '100%',
                        height: 0,
                    }}></div>
                    <div className={s.multiple_bets_slider_container}>
                        <input type="range" step="1" min="1" max="10" defaultValue='1' value={BetsAmountInt} onChange={changeBets} className={s.slider}></input>
                    </div>
                </div>

                {
                    Won === null ? <></> : <>
                        {
                            Won ? <div className={s.winner_looser_msg}>You won!</div> : <div className={s.winner_looser_msg}>You lost!</div>
                        }
                    </>
                }

                <div className={s.stop_gain}></div>
                <div className={s.stop_loss}></div>

                <div className={s.profit_on_win}></div>

                <div className={s.total_gain_loss} style={{ color: 'green' }}>
                    <div>Total gain:</div>
                    <div>{bigDecimal.divide(totalGain.toString(), '1000000000000000000', 4)}</div>
                </div>

                <div className={s.total_gain_loss} style={{ color: 'red' }}>
                    <div>Total loss:</div>
                    <div>{bigDecimal.divide(totalLoss.toString(), '1000000000000000000', 4)}</div>
                </div>

            </div>

            {
                sessionAddress ?
                    < button className={s.place_bet_button} onClick={async () => { await makeBet(pickedSide); }}>Place bet</button>
                    : < button className={s.place_bet_button_disabled} disabled>Not connected</button>
            }
        </div >
    </>);
}

export interface CoinFlipProps { }

export const CoinFlip: FC<CoinFlipProps> = props => {

    const [BetsAmount,
        BetsAmountInt,
        setBetsAmount,
        Wager,
        WagerNum,
        setWager,
        pickedSide,
        setPickedSide,
        resultsPending,
        setResultsPending,
        playAnimation,
        setPlayAnimation
    ] = useUnit([
        CoinFlipModel.$BetsAmount,
        CoinFlipModel.$BetsAmountInt,
        CoinFlipModel.setBetsAmount,
        CoinFlipModel.$Wager,
        CoinFlipModel.$WagerNum,
        CoinFlipModel.setWager,
        CoinFlipModel.$PickedSide,
        CoinFlipModel.setPickedSide,
        CoinFlipModel.$ResultsPending,
        CoinFlipModel.setResultsPending,
        CoinFlipModel.$PlayAnimation,
        CoinFlipModel.setPlayAnimation
    ]);

    return (<>
        <Section
            className={s._}
            bodyProps={{
                className: s.body,
            }}
        >

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    width: '100%',
                    height: '100%',
                }}
            >
                <div style={{
                    width: "60%",
                    height: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    columnGap: '40px'
                }}>
                    <div id='coin_box' style={{
                        width: "100%",
                        height: "70%"
                    }}>
                        <Coin action={pickedSide} play={true} />
                    </div>

                    <div className={s.side_picker}>
                        <div className={s.coin_pick_side} style={{
                            backgroundColor: 'green'
                        }} onClick={() => { setPickedSide(CoinSide.Head); console.log('head') }}></div>
                        <div className={s.coin_pick_side} style={{
                            backgroundColor: 'red'
                        }} onClick={() => { setPickedSide(CoinSide.Tails); console.log('tail') }}></div>
                    </div>
                </div>
                <CoinFlipSettings />


            </div>
        </Section >
    </>);
}