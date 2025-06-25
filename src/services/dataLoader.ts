
/**
 * Carrega um array de objetos JSON de uma URL.
 * Retorna null em caso de erro ou se a resposta não for um array válido.
 * @param url A URL da API.
 * @returns Uma Promise que resolve com um array de T ou null.
 */
export async function loadArrayData<T>(url: string): Promise<T[] | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const rawData = await response.json();

    if (Array.isArray(rawData)) {
      // Se a resposta é um array, fazemos o cast para T[]
      return rawData as T[];
    } else if (rawData !== null && typeof rawData === 'object') {
      // Se a resposta é um objeto único (inesperado quando esperando um array),
      // o envolvemos em um array para compatibilidade com o consumer.
      console.warn(`loadArrayData: Esperava um array para ${url}, mas recebeu um único objeto. Envolvendo em array.`);
      return [rawData] as T[];
    } else {
      // Outros casos (null, string, number, etc. inesperados)
      console.warn(`loadArrayData: Esperava array para ${url}, mas recebeu tipo não array ou vazio inesperado:`, rawData);
      return []; // Retorna array vazio para evitar problemas no frontend
    }
  } catch (error) {
    console.error(`Erro ao carregar array de dados de ${url}:`, error);
    return null;
  }
}

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