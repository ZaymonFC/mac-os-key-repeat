import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { interval, merge, Subject, takeUntil, of } from "rxjs";
import { delay, map, switchMap } from "rxjs/operators";
import useSubscription from "../hooks/useSubscription";
import { pure } from "../lib/utils";

const SPECIAL_KEYS_REGEX =
  /^(?:Meta|Control|Alt|Escape|Arrow|Tab|Enter|Shift|CapsLock|Home|End|PageUp|PageDown|F\d+)/;

const useKeyRepeat = (delayMsAtom, repeatMsAtom, autoClearAtom) => {
  const [delayMs] = useAtom(delayMsAtom);
  const [repeatMs] = useAtom(repeatMsAtom);
  const [autoClear] = useAtom(autoClearAtom);
  const [buffer, setBuffer] = useState("");

  const down$ = useMemo(() => new Subject(), []);
  const up$ = useMemo(() => new Subject(), []);

  const head$ = useMemo(() => down$, [down$]);

  /** Creates a stream that emits a value after a delay, cancellable by up$. */
  const makeDelayStream = (delayMs) => (value) =>
    of(value).pipe(delay(delayMs), takeUntil(up$));

  /** Creates a stream that repeatedly emits a value at given interval, cancellable by up$. */
  const makeRepeaterStream = (repeatMs) => (value) =>
    interval(repeatMs).pipe(map(pure(value)), takeUntil(up$));

  const tail$ = useMemo(
    () =>
      head$.pipe(
        switchMap(makeDelayStream(delayMs)),
        switchMap(makeRepeaterStream(repeatMs)),
      ),
    [head$, delayMs, repeatMs, up$],
  );

  const put$ = useMemo(() => merge(head$, tail$), [head$, tail$]);

  useSubscription(
    () =>
      put$.subscribe((v) => {
        if (v === "Backspace") {
          setBuffer((b) => b.slice(0, -1));
        } else if (!SPECIAL_KEYS_REGEX.test(v)) {
          setBuffer((b) => b + v);
        }
      }),
    [put$, setBuffer],
  );

  const clearBuffer = useCallback(() => setBuffer(""), [setBuffer]);

  useEffect(() => autoClear && clearBuffer(), [autoClear, clearBuffer]);

  useSubscription(
    () => up$.subscribe(() => autoClear && clearBuffer()),
    [up$, autoClear, clearBuffer],
  );

  /** Handles keydown events, rejecting OS-generated key repeats. */
  const down = useCallback(
    (event) => !event.repeat && down$.next(event.key),
    [down$],
  );

  return {
    down,
    up: (event) => up$.next(event.key),
    buffer,
  };
};

export default useKeyRepeat;
