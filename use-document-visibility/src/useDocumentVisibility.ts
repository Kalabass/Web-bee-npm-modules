import { useCallback, useEffect, useState } from "react";

interface VisibilityChangeHandler {
	(isVisible: boolean): void;
}

export const useDocumentVisibility = () => {
	const [visible, setVisible] = useState(!document.hidden);
	const [count, setCount] = useState(0);
	const [subscribers, setSubscribers] = useState<VisibilityChangeHandler[]>([]);

	const handleVisibilityChange = useCallback(() => {
		const isVisible = !document.hidden;
		setVisible(isVisible);
		if (!isVisible) {
			setCount(prevCount => prevCount + 1);
		}
		subscribers.forEach(callback => callback(isVisible));
	}, [subscribers]);

	useEffect(() => {
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [handleVisibilityChange]);

	const onVisibilityChange = useCallback(
		(callback: VisibilityChangeHandler) => {
			setSubscribers(prevSubscribers => [...prevSubscribers, callback]);
			return () => {
				setSubscribers(prevSubscribers =>
					prevSubscribers.filter(sub => sub !== callback)
				);
			};
		},
		[]
	);

	return { visible, count, onVisibilityChange };
};
