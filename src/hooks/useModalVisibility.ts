import { useEffect } from "react";

export function useModalVisibility(
  setIsModalVisible: (visible: boolean) => void,
) {
  useEffect(() => {
    const setModalVisible = () => {
      setIsModalVisible(true);
    };
    const setModalInvisible = () => {
      setIsModalVisible(false);
    };

    window.addEventListener("blur", setModalVisible);
    window.addEventListener("focus", setModalInvisible);

    return () => {
      window.removeEventListener("blur", setModalVisible);
      window.removeEventListener("focus", setModalInvisible);
    };
  }, [setIsModalVisible]);
}
