import { useEffect, useState } from 'react';

export const useTimeSinceUpdate = (timestamp) => {
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('—');

  useEffect(() => {
    const updateTimeSince = () => {
      if (!timestamp) {
        setTimeSinceUpdate('—');
        return;
      }

      const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);

      if (secondsAgo < 60) {
        setTimeSinceUpdate(`${secondsAgo}s`);
      } else {
        const minutesAgo = Math.floor(secondsAgo / 60);
        setTimeSinceUpdate(`${minutesAgo}m`);
      }
    };

    updateTimeSince();
    const interval = setInterval(updateTimeSince, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeSinceUpdate;
};

export default useTimeSinceUpdate;
