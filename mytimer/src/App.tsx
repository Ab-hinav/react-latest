import { useRef, useState, useEffect } from 'react'


function App() {
  const [time, setTime] = useState(60);
  const initialTimeRef = useRef(60);
  const [isRunning, setIsRunning] = useState(false);
  const [editState, setEditState] = useState<boolean>(false);

  const minRef = useRef<HTMLInputElement>(null);
  const secRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {

      interval = setInterval(() => {
        setTime(prev => {
          if (prev < 1) {
            setIsRunning(false);
            setTime(initialTimeRef.current);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000)

    }
    return () => {
      clearInterval(interval)
    };
  }, [isRunning, time]);

  const handleEditStateChange = () => {
    setEditState(true);
    setIsRunning(false);
  }


  const handleDialogboxUpdate = (min: number, sec: number) => {
    const calcTime = min * 60 + sec;
    setTime(calcTime);
    initialTimeRef.current = calcTime;
    setEditState(false);
  }


  return (
    <div className="h-screen flex justify-center items-center bg-[#0f1c2e] relative">
      <div className="bg-[#172a45] rounded-xl p-8 text-center shadow-lg">
        <svg width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#1e3a8a"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#3b82f6"
            strokeWidth="10"
            fill="none"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={(2 * Math.PI * 90 * (1 - time / initialTimeRef.current))}
            transform="rotate(-90 100 100)"
          />
          <text
            x="80"
            y="115"
            textAnchor="middle"
            fontSize="28"
            fill="#ffffff"
            fontWeight="bold"
            onClick={() => handleEditStateChange()}
          >
            {`${parseInt(time / 60 + '').toString().padStart(2, '0')}`}
            {':'}
          </text>
          <text
            x="120"
            y="115"
            textAnchor="middle"
            fontSize="28"
            fill="#ffffff"
            fontWeight="bold"
            onClick={() => handleEditStateChange()}>
            {`${parseInt(time % 60 + '').toString().padStart(2, '0')}`}
          </text>
        </svg>
        {/* Modal Dialog for Editing Timer */}
        {editState && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Edit Timer</h2>
              <input
                type="number"
                defaultValue={Math.floor(time / 60)}
                min={0}
                ref={minRef}
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
              <input
                type="number"
                defaultValue={time % 60}
                min={0}
                ref={secRef}
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditState(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const min = Number(minRef.current?.value || 0);
                    const sec = Number(secRef.current?.value || 0);
                    handleDialogboxUpdate(min, sec);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2 bg-[#334155] text-white rounded-lg mr-4">
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(initialTimeRef.current);
            }}
            className="px-6 py-2 bg-[#334155] text-white rounded-lg">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
