import { getGalleryList } from "./getGalleryList";

export async function retrieveGalleryInfo(galleryId) {
  try {
    const galleries = await getGalleryList();
    const gallery = galleries.find((gallery) => gallery.id === galleryId);

    if (!gallery) {
      console.error("Gallery not found...");
      return;
    }

      return gallery;
      
  } catch (error) {
    console.error("Erro ao buscar informações do cliente...", error);
  }
}
