import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, act } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';
import { AnimationAction } from 'three';

interface ModelProps {
	action: 'winner' | 'loser';
	play?: boolean;
}

const Model: FC<ModelProps> = ({ action, play = false }) => {
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

export interface CoinflipProps {
	animationVariant: 'loser' | 'winner';
	play?: boolean;
}

export const Coinflip: FC<CoinflipProps> = ({ animationVariant, play = false }) => {
	return (
		<div
			style={{
				position: 'absolute',
				width: '100%',
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
					<Model action={animationVariant} play={play} />
				</Suspense>
			</Canvas>
		</div>
	);
};
