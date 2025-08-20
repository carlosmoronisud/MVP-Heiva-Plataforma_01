
/**
 * Carrega um array de objetos JSON de uma URL.
 * Retorna null em caso de erro ou se a resposta não for um array válido.
 * @param url A URL da API.
 * @returns Uma Promise que resolve com um array de T ou null.
 */


export const loadArrayData = async <T>(url: string): Promise<T[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Falha ao buscar dados de ${url}: ${response.statusText}`);
    }

    const rawData = await response.json();

    // Verificação e correção do formato de dados.
    // O erro 'esperava um array, mas recebeu um único objeto' indica que a resposta do script
    // está encapsulada em um objeto, como: { data: [...] }.
    // Esta lógica adapta o comportamento para suportar ambos os casos,
    // garantindo a compatibilidade.
    if (rawData && typeof rawData === 'object' && !Array.isArray(rawData) && rawData.data) {
      // Se a resposta é um objeto com uma chave 'data' que é um array, use esse array.
      console.log(`loadArrayData: Recebeu um objeto com a chave 'data'. Extraindo o array...`);
      return rawData.data as T[];
    } else if (Array.isArray(rawData)) {
      // Se a resposta já é um array, use-o diretamente.
      return rawData as T[];
    } else {
      // Se o formato não é o esperado, loga um aviso e tenta converter.
      // A sua lógica atual já faz isso, mas esta é mais explícita.
      console.warn(`loadArrayData: Esperava um array para ${url}, mas recebeu um formato inesperado.`);
      return Array.isArray(rawData) ? rawData : [rawData];
    }
  } catch (error) {
    console.error(`Erro em loadArrayData para ${url}:`, error);
    throw error;
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
      // Se a resposta é um único objeto diretamente, o retornamos.
      return rawData as T;
    } else if (Array.isArray(rawData) && rawData.length > 0 && rawData[0] !== null && typeof rawData[0] === 'object') {
      // Se a resposta é um array com um elemento, pegamos o primeiro objeto.
      console.warn(`loadSingleObjectData: Esperava um objeto único para ${url}, mas recebeu um array. Pegando o primeiro elemento.`);
      return rawData[0] as T;
    } else {
      // Caso contrário, não encontramos o objeto esperado.
      console.warn(`loadSingleObjectData: Esperava um objeto único para ${url}, mas recebeu formato inesperado:`, rawData);
      return null;
    }
  } catch (error) {
    console.error(`Erro ao carregar objeto único de dados de ${url}:`, error);
    return null;
  }
}