import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";


const useThunk = (thunk) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const doSomething = useCallback((args) => {
        setIsLoading(true);
        dispatch(thunk(args)).unwrap()
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [dispatch, thunk]);
    return [doSomething, isLoading, error];
};

export default useThunk;