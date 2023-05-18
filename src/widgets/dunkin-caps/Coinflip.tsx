import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, Suspense, useEffect } from 'react';

const Model = () => {
	const { scene, animations } = useGLTF('/coinflip/3dcoin.gltf');
	const { actions } = useAnimations(animations, scene);

	useEffect(() => {
		if (actions.topface) {
			actions.bottomface?.play();
			actions.bottomface?.setLoop(2200, 1);
		}
	}, []);

	// @ts-ignore
	return <primitive object={scene} />;
};

export const Coinflip: FC = () => {
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
					<Model />
				</Suspense>
			</Canvas>
		</div>
	);
};
