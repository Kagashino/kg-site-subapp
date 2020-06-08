import React, {useCallback, useRef, useState} from 'react';
import './App.scss';
import Game, { STAT } from './rules';

function App({ subAppName }: { subAppName: string }) {
  const gameRef = useRef(new Game());
  const { current: game } = gameRef;
  const [, update] = useState(Date.now());

  const handleReset = useCallback(()=>{
    game.reset();
    update(Date.now());
  }, [update]);

  const handlePlace = useCallback((x)=>{
    game.place(x);
    update(Date.now());
  }, [update]);

  return (
    <div className={subAppName}>
      <div className="panel">
        <button onClick={handleReset}
                className="reset"
                disabled={game.status === STAT.PLAYING}>reset</button>
        <ul className="grids">
          {
            game.grids.map((i, x)=>(
              <li key={`${x}-${i}`} className='grid'>
                <button onClick={()=>handlePlace(x)}>{ i }</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
