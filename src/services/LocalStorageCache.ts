/* eslint-disable @typescript-eslint/no-unused-vars */
// src/services/localStorageCache.ts

// Duração do cache: 30 minutos (30 * 60 * 1000 milissegundos)
const CACHE_DURATION_MS = 30 * 60 * 1000; 

interface CacheData<T> {
  data: T;
  expiry: number; // Timestamp de expiração
}

/**
 * Tenta buscar um item do Local Storage. Retorna o dado se for válido e não expirado.
 */
export const getCachedData = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  
  try {
    const cached: CacheData<T> = JSON.parse(item);
    const now = new Date().getTime();

    // Verifica se o cache expirou
    if (now > cached.expiry) {
      localStorage.removeItem(key);
      return null; // Expirado
    }
    
    // Cache válido, retorna o dado
    return cached.data; 
  } catch (e) {
    // Se o JSON estiver corrompido, limpa o item e retorna null
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Armazena um dado no Local Storage com um timestamp de expiração.
 */
export const setCacheData = <T>(key: string, data: T): void => {
  try {
    const expiry = new Date().getTime() + CACHE_DURATION_MS;
    const cached: CacheData<T> = { data, expiry };
    localStorage.setItem(key, JSON.stringify(cached));
  } catch (e) {
    console.error("Falha ao salvar no Local Storage:", e);
  }
};