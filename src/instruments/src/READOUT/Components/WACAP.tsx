import React, { useState, useEffect } from 'react';
import { useSimVar } from '../../Hooks/simVars';

interface CautionMessage {
  id: number;
  message: string;
  condition: boolean;
}

export const WACAP = (props) => {
  const [WACAP_Test] = useSimVar('L:C17_WACAP_Test', 'bool');
  const [Park_brake] = useSimVar('A:Brake parking position', 'bool');
  const [Speed_brake] = useSimVar('A:Spoilers right position', 'bool');
  const [Landing_light] = useSimVar('A:Light landing', 'bool');
  const [Taxi_light] = useSimVar('A:Light taxi', 'bool');
  const [Fuel_quantity] = useSimVar('A:FUEL TOTAL QUANTITY', 'gallons');
  const [Cargo_door] = useSimVar('L:DoorSwitch', 'enum');
  const [APU_FIRE_TEST] = useSimVar('L:C17_FIRE_ANNUN_TEST', 'enum');
  const [cautionMessages, setCautionMessages] = useState<CautionMessage[]>([]);

  useEffect(() => {
    const messages: CautionMessage[] = [
      { id: 1, message: 'PARK BRAKE', condition: WACAP_Test || Park_brake },
      { id: 2, message: 'LANDING LIGHT', condition: WACAP_Test || Landing_light },
      { id: 3, message: 'TAXI LIGHT', condition: WACAP_Test || Taxi_light },
      { id: 4, message: 'FUEL LOW', condition: WACAP_Test || Fuel_quantity <= 12310 },
      { id: 5, message: 'SPOILERS', condition: WACAP_Test || Speed_brake },
      { id: 6, message: 'RAMP OPEN', condition: WACAP_Test || Cargo_door },
      { id: 7, message: 'APU', condition: WACAP_Test || APU_FIRE_TEST },
      // Add more caution messages here...
    ];

    setCautionMessages(messages);
  }, [WACAP_Test, Park_brake, Speed_brake, Landing_light, Taxi_light, Fuel_quantity, Cargo_door, APU_FIRE_TEST]);

  const maxMessages = 14;
  const visibleMessages = cautionMessages.filter((message) => message.condition);
  const displayedMessages = visibleMessages.slice(0, maxMessages);
  const remainingMessages = Math.max(0, visibleMessages.length - maxMessages);

  return (
    <g>
      {/* CENTER */}
      {displayedMessages.map((message, index) => (
        <text
          key={message.id}
          x={670}
          y={615 + index * 23}
          fontSize={30}
          fill="#FF0000"
          className="WAPanel"
          textAnchor="middle"
        >
          {message.message}
        </text>
      ))}
      {remainingMessages > 0 && (
        <g className="scroll-symbols">
          <text x={650} y={615 + maxMessages * 23} fontSize={16} fill="#FF0000">
            ↑
          </text>
          <text x={650} y={638 + maxMessages * 23} fontSize={16} fill="#FF0000">
            ↓
          </text>
        </g>
      )}
    </g>
  );
};