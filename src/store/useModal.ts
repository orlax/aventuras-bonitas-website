import { SpringCarouselImage } from "@/components/images/spring_carousel/springCarousel";
import { Locale } from "@/dictionaries";
import { create } from "zustand";

export type ModalType = "contact-form" | "image";

interface ModalData {
  contactDict?: any;
  lang?: Locale;
  image?: SpringCarouselImage;
  onCloseAction?: () => void;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
