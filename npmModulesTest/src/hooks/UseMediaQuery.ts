import { useEffect, useState } from 'react';

interface useMediaQueryProps {
	query: string;
}
export const useMediaQuery = ({ query }: useMediaQueryProps): boolean => {
	const [isMatching, setIsMatching] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(query);

		setIsMatching(mql.matches);

		const handleMatch = (e: MediaQueryListEvent) => {
			setIsMatching(e.matches);
		};

		mql.addEventListener('change', handleMatch);

		return () => {
			mql.removeEventListener('change', handleMatch);
		};
	}, [query]);

	return isMatching;
};
