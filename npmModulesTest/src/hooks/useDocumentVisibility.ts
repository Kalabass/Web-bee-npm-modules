import { useEffect, useState } from "react";

interface VisibilityChangeHandler {
	(isVisible: boolean): void;
}

export const useDocumentVisibility = () => {
	const [visible, setVisible] = useState(!document.hidden);
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	const handleVisibilityChange = () => {
		const isVisible = !document.hidden;
		setVisible(isVisible);
		if (!isVisible) {
			setCount(prevCount => prevCount + 1);
		}
	};

	const onVisibilityChange = (callback: VisibilityChangeHandler) => {
		const handler = () => callback(!document.hidden);
		document.addEventListener("visibilitychange", handler);
		return () => document.removeEventListener("visibilitychange", handler);
	};

	return { visible, count, onVisibilityChange };
};
