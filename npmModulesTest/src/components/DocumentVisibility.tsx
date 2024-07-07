import { FC, useEffect } from "react";
import { useDocumentVisibility } from "../hooks/useDocumentVisibility";

const DocumentVisibility: FC = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    const unsubscribeFirstHandler = onVisibilityChange((isVisible) => {
      console.log("first handler", isVisible);
    });

    const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
      console.log("second handler", isVisible);
    });

    const timerId = setTimeout(() => unsubscribeSecondHandler(), 5000);

    return () => {
      unsubscribeFirstHandler();
      unsubscribeSecondHandler();
      clearTimeout(timerId);
    };
  }, [onVisibilityChange]);

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз Вкладка активна?{" "}
        {visible ? "да" : "нет"}
      </span>
    </div>
  );
};

export default DocumentVisibility;
