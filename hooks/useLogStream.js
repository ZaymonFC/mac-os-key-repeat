import useSubscription from "./useSubscription";

const useLogStream = (stream$, label) => {
  useSubscription(
    () => stream$.subscribe((v) => console.log(label, v)),
    [stream$]
  );
};

export default useLogStream;
