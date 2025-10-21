/**
 * Carrega um array de objetos JSON de uma URL.
 * Retorna um array vazio em caso de erro ou se a resposta não for um array válido.
 * @param url A URL da API.
 * @returns Uma Promise que resolve com um array de T ou um array vazio.
 */
export const loadArrayData = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Falha ao buscar dados de ${url}: ${response.statusText}`);
    }

    const rawData = await response.json();

    // Lógica robusta para garantir que a resposta seja sempre um array de dados.
    if (rawData && rawData.data) {
      console.log(`loadArrayData: Recebeu um objeto com a chave 'data'. Extraindo o array...`);
      return rawData.data as T[];
    } else if (Array.isArray(rawData)) {
      console.log(`loadArrayData: Recebeu um array. Utilizando diretamente.`);
      return rawData as T[];
    } else {
      console.warn(`loadArrayData: Formato inesperado para ${url}. Retornando array vazio.`);
      return [];
    }
  } catch (error) {
    console.error(`Erro em loadArrayData para ${url}:`, error);
    // Em caso de erro, retorna um array vazio para evitar que a aplicação quebre
    return [];
  }
};

/**
 * Carrega um único objeto JSON de uma URL.
 * Retorna null em caso de erro ou se a resposta não for um objeto válido.
 * @param url A URL da API.
 * @returns Uma Promise que resolve com um objeto T ou null.
 */
export async function loadSingleObjectData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const rawData = await response.json();

    if (!Array.isArray(rawData) && rawData !== null && typeof rawData === 'object') {
      return rawData as T;
    } else if (Array.isArray(rawData) && rawData.length > 0 && rawData[0] !== null && typeof rawData[0] === 'object') {
      console.warn(`loadSingleObjectData: Esperava um objeto único para ${url}, mas recebeu um array. Pegando o primeiro elemento.`);
      return rawData[0] as T;
    } else {
      console.warn(`loadSingleObjectData: Esperava um objeto único para ${url}, mas recebeu formato inesperado:`, rawData);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao carregar objeto único de dados de ${url}:`, error);
    return null;
  }
}