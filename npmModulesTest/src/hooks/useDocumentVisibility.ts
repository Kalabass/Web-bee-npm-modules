import { useCallback, useEffect, useRef, useState } from "react";

interface VisibilityChangeHandler {
	(isVisible: boolean): void;
}

export const useDocumentVisibility = () => {
	const [visible, setVisible] = useState(!document.hidden);
	const [count, setCount] = useState(0);
	const subscribersRef = useRef<VisibilityChangeHandler[]>([]);

	const handleVisibilityChange = useCallback(() => {
		const isVisible = !document.hidden;
		setVisible(isVisible);
		if (!isVisible) {
			setCount(prevCount => prevCount + 1);
		}
		subscribersRef.current.forEach(callback => callback(isVisible));
	}, []);

	const onVisibilityChange = useCallback(
		(callback: VisibilityChangeHandler) => {
			subscribersRef.current.push(callback);
			return () => {
				subscribersRef.current = subscribersRef.current.filter(
					sub => sub !== callback
				);
			};
		},
		[]
	);

	useEffect(() => {
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return { visible, count, onVisibilityChange };
};
