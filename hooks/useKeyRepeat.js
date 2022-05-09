import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import {
  delay,
  interval,
  map,
  merge,
  Subject,
  switchMap,
  takeUntil,
  throttle,
} from "rxjs";
import useSubscription from "../hooks/useSubscription";
import { pure } from "../lib/utils";

const useKeyRepeat = (delayMsAtom, repeatMsAtom) => {
  const [delayMs] = useAtom(delayMsAtom);
  const [repeatMs] = useAtom(repeatMsAtom);
  const [buffer, setBuffer] = useState("");

  const down$ = useMemo(() => new Subject(), []);
  const up$ = useMemo(() => new Subject(), []);

  const makeRepeaterStream = (repeatMs) => (value) =>
    interval(repeatMs).pipe(map(pure(value)), takeUntil(up$));

  const head$ = useMemo(() => down$.pipe(throttle((_) => up$)), [down$, up$]);
  const tail$ = useMemo(
    () => head$.pipe(delay(delayMs), switchMap(makeRepeaterStream(repeatMs))),
    [head$, delayMs, repeatMs]
  );

  const put$ = useMemo(() => merge(head$, tail$), [head$, tail$]);

  useSubscription(() => put$.subscribe((v) => setBuffer((b) => b + v)), [put$]);
  useSubscription(() => up$.subscribe((_) => setBuffer("")), [up$, setBuffer]);

  return {
    down: (event) => down$.next(event.key),
    out: () => up$.next(),
    buffer,
  };
};

export default useKeyRepeat;
