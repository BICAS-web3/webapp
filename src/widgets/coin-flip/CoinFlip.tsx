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
import { ADDRESS, ABI } from '@/shared/data/contracts/CoinFlip';
import { AvailableNetworks } from '@/shared/data/networks';
import { CoinSide } from './model';

interface CoinModelProps {
    action: 'winner' | 'loser';
    play?: boolean;
}

const CoinModel: FC<CoinModelProps> = ({ action, play = false }) => {
    const { scene, animations } = useGLTF('/coinflip/3dcoinOrigin.gltf');
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
        if (play && actions.topface && actions.bottomface) {
            const current = actions[action === 'loser' ? 'bottomface' : 'topface'] as AnimationAction;
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
                width: '50%',
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

export interface CoinFlipSettingsProps { }

export const CoinFlipSettings: FC<CoinFlipSettingsProps> = props => {

    const [sessionAddress, pending, checked, chosenNetwork, chosenToken] = useUnit([
        sessionModel.$sessionAddress,
        sessionModel.$sessionPending,
        sessionModel.$sessionChecked,
        sessionModel.$chosenNetwork,
        sessionModel.$chosenToken
    ]);

    const [BetsAmount, BetsAmountInt, setBetsAmount, Wager, WagerNum, setWager, pickedSide, setPickedSide] = useUnit([
        CoinFlipModel.$BetsAmount,
        CoinFlipModel.$BetsAmountInt,
        CoinFlipModel.setBetsAmount,
        CoinFlipModel.$Wager,
        CoinFlipModel.$WagerNum,
        CoinFlipModel.setWager,
        CoinFlipModel.$PickedSide,
        CoinFlipModel.setPickedSide
    ])



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

    //const ethereum = MMSDK.getProvider();

    const makeBet = async () => {
        const ethereum = new ethers.providers.Web3Provider((window.ethereum as any));
        const signer = await ethereum.getSigner();
        const contract = new ethers.Contract(ADDRESS, ABI, signer);

        const tokenAddress = AvailableNetworks.get(chosenNetwork)?.tokens[chosenToken].contractAddress

        await contract.CoinFlip_Play(WagerNum, tokenAddress, pickedSide == CoinSide.Head, BetsAmountInt, 1000000, 1000000, { value: 3000000000000000, gasLimit: 400000, gasPrice: 2500000256 });
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
                        max='100'
                        value={BetsAmount}
                        onChange={changeBets}
                    ></input>
                    <div style={{
                        flexBasis: '100%',
                        height: 0,
                    }}></div>
                    <div className={s.multiple_bets_slider_container}>
                        <input type="range" step="1" min="1" max="100" defaultValue='1' value={BetsAmountInt} onChange={changeBets} className={s.slider}></input>
                    </div>
                </div>

                <div className={s.stop_gain}></div>
                <div className={s.stop_loss}></div>

                <div className={s.profit_on_win}></div>

            </div>

            {
                sessionAddress ?
                    < button className={s.place_bet_button} onClick={async () => { await makeBet(); }}>Place bet</button>
                    : < button className={s.place_bet_button_disabled} disabled>Not connected</button>
            }
        </div >
    </>);
}

export interface CoinFlipProps { }

export const CoinFlip: FC<CoinFlipProps> = props => {

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
                <CoinFlipAnimation action={'winner'} play={true} />
                <CoinFlipSettings />


            </div>
        </Section >
    </>);
}