import React, { useEffect, useState, useRef } from 'react';
import { render } from '../Hooks/index';
import { useSimVar } from '../Hooks/simVars';
import { AURALS } from './Components/AURALS';
import { MasterCaution } from './Components/MasterCaution';
import './style.scss';
import { AuralPower } from '../../Common/circuit';

const Systems = () => {
	return (
		<AuralPower>
			<svg viewBox="0 0 500 500">
				<rect x={0} y={0} width={500} height={500} fill="black" />
				<g>
					<AURALS />
					<MasterCaution />
				</g>
			</svg>
		</AuralPower>
	);
};

render(<Systems />);
