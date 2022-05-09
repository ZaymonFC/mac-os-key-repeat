import { useEffect } from "react";

const useSubscription = (makeSubcription, deps) => {
  useEffect(() => {
    const sub = makeSubcription();
    return () => sub?.unsubscribe();
  }, deps);
};

export default useSubscription;
