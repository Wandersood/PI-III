const API = "http://localhost:8003/app";

const handleErrors = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.detail;
    } catch (e) {
      console.error("Erro ao converter mensagem de erro", e);
    }
    throw Error(errorMessage);
  }
  return response;
};

export const createFolder = async (folderData, id) => {
  const response = await fetch(`${API}/folder/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folderData),
  });
  await handleErrors(response);
  const data = await response.json();
  return data;
} 

export const fetchAllFoldersFromGallery = async (id: string) => {
  const gallery = await fetchGallery(id);
  const folders = gallery.folders;
  return folders;
}

export const fetchFolderById = async (galleryId, folderId) => {
  const response = await fetch(
    `${API}/galerias/${galleryId}/pastas/${folderId}`
  );
  await handleErrors(response);
  const data = await response.json();
  return data;
}

export const fetchImageById = async (galleryId, fileId) => {
  const response = await fetch(`${API}/galerias/${galleryId}/fotos/${fileId}/download`);
  await handleErrors(response);
  const data = await response.blob();
  return data;
}

export const fetchGallery = async (id: string) => {
  const response = await fetch(`${API}/galerias/${id}`);
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const fetchAllGalleries = async () => {
  const response = await fetch(`${API}/galerias`);
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const createGallery = async (galleryData) => {
  const response = await fetch(`${API}/galerias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(galleryData),
  });
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const updateGallery = async (id, galleryData) => {
  const response = await fetch(`${API}/galerias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(galleryData),
  });
  await handleErrors(response);
  const data = await response.json();
  return data;
};

export const deleteGallery = async (id) => {
  const response = await fetch(`${API}/galerias/${id}/delete`, {
    method: "DELETE",
  });
  await handleErrors(response);
  return response;
};


export const deleteImage = async (galleryId, imageId) => {
  const response = await fetch(`${API}/galerias/${galleryId}/fotos/${imageId}`, {
    method: "DELETE",
  });
  await handleErrors(response);
  return response;
}
