import React from "react";

/**
 * Provides a wrapper around `React.useEffect` that manages the lifecycle
 * of a **subscription**.
 *
 * The `subscription` will be **recreated** if any of the dependencies _change_.
 *
 * There is a custom rule in our `eslintrc.json` to enable the `exhaustive-deps`
 * rule for this hook.
 *
 * @param subscribe - function that returns an object with an unsubscribe method.
 * @param deps - dependencies for the subscription. If any of these change, the subscription will be recreated
 */
export const useSubscription = (subscribe, deps) => {
  React.useEffect(() => {
    const subscription = subscribe();
    return () => subscription?.unsubscribe();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSubscription;
