// src/services/dataLoader.ts

import { getCachedData, setCacheData } from "./LocalStorageCache";

/**
 * Chave de cache primária para dados de array (geralmente a URL da API)
 */
const getArrayCacheKey = (url: string) => `array_cache_${url}`;

/**
 * Carrega um array de objetos JSON de uma URL, USANDO CACHE.
 * * @param url A URL da API.
 * @param forceRefresh Se verdadeiro, ignora o cache local e faz a requisição de rede.
 * @returns Uma Promise que resolve com um array de T ou um array vazio.
 */
export const loadArrayData = async <T>(url: string, forceRefresh: boolean = false): Promise<T[]> => {
    const cacheKey = getArrayCacheKey(url);
    
    // 1. TENTAR CARREGAR DO CACHE (COM BYPASS)
    const cachedData = getCachedData<T[]>(cacheKey);
    
    if (cachedData && !forceRefresh) { // <-- SÓ RETORNA O CACHE SE forceRefresh for FALSE
        console.log(`loadArrayData: [CACHE HIT] - ${url}`);
        return cachedData; // RETORNO INSTANTÂNEO!
    }
    
    // 2. BUSCA DE REDE (Se o cache falhou, expirou OU forceRefresh é true)
    try {
        // Se forceRefresh for true, o cache local deve ser limpo antes de buscar,
        // mas o getCachedData já garante que ele está limpo se expirou.
        // Se for forçado (true), a lógica já passa para o fetch.
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Falha ao buscar dados de ${url}: ${response.statusText}`);
        }

        const rawData = await response.json();
        let finalData: T[] = [];

        // Sua lógica de normalização:
        if (rawData && rawData.data) {
            finalData = rawData.data as T[];
        } else if (Array.isArray(rawData)) {
            finalData = rawData as T[];
        } else {
            console.warn(`loadArrayData: Formato inesperado para ${url}. Retornando array vazio.`);
        }

        // 3. SALVAR NO CACHE antes de retornar
        if (finalData.length > 0) {
            setCacheData(cacheKey, finalData);
        }
        
        return finalData;

    } catch (error) {
        console.error(`Erro em loadArrayData para ${url}:`, error);
        // Em caso de erro, retorna um array vazio
        return [];
    }
};

// =========================================================================================

/**
 * Chave de cache primária para dados de objeto único (geralmente a URL da API)
 */
const getSingleObjectCacheKey = (url: string) => `object_cache_${url}`;

/**
 * Carrega um único objeto JSON de uma URL, USANDO CACHE.
 * * @param url A URL da API.
 * @param forceRefresh Se verdadeiro, ignora o cache local e faz a requisição de rede.
 * @returns Uma Promise que resolve com um objeto T ou null.
 */
export async function loadSingleObjectData<T>(url: string, forceRefresh: boolean = false): Promise<T | null> {
    const cacheKey = getSingleObjectCacheKey(url);
    
    // 1. TENTAR CARREGAR DO CACHE (COM BYPASS)
    const cachedData = getCachedData<T>(cacheKey);
    
    if (cachedData && !forceRefresh) { // <-- SÓ RETORNA O CACHE SE forceRefresh for FALSE
        console.log(`loadSingleObjectData: [CACHE HIT] - ${url}`);
        return cachedData; // RETORNO INSTANTÂNEO!
    }

    // 2. BUSCA DE REDE (Se o cache falhou, expirou OU forceRefresh é true)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
        let finalObject: T | null = null;
        
        // Sua lógica de normalização:
        if (!Array.isArray(rawData) && rawData !== null && typeof rawData === 'object') {
            finalObject = rawData as T;
        } else if (Array.isArray(rawData) && rawData.length > 0 && rawData[0] !== null && typeof rawData[0] === 'object') {
            console.warn(`loadSingleObjectData: Esperava um objeto único para ${url}, mas recebeu um array. Pegando o primeiro elemento.`);
            finalObject = rawData[0] as T;
        } else {
            console.warn(`loadSingleObjectData: Esperava um objeto único para ${url}, mas recebeu formato inesperado:`, rawData);
        }

        // 3. SALVAR NO CACHE antes de retornar
        if (finalObject) {
            setCacheData(cacheKey, finalObject);
        }

        return finalObject;

    } catch (error) {
        console.error(`Erro ao carregar objeto único de dados de ${url}:`, error);
        return null;
    }
}