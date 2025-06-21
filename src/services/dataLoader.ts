// src/services/dataLoader.ts

/**
 * Carrega dados JSON de uma URL.
 * Se isSingleObject for true, espera e retorna um único objeto (T | null).
 * Caso contrário, espera e retorna um array de objetos (T[] | null).
 * @param url A URL do arquivo JSON.
 * @param isSingleObject Opcional. Se true, a função espera um único objeto como resposta JSON.
 * @returns Uma Promise que resolve com os dados JSON.
 */
export async function loadData<T>(url: string, isSingleObject: boolean = false): Promise<T | T[] | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: T | T[] = await response.json(); // Pega a resposta como T ou T[]

    if (isSingleObject) {
      // Se for um objeto único, mas o Apps Script retornou um array de 1 elemento,
      // pegamos o primeiro elemento.
      if (Array.isArray(data) && data.length > 0) {
        return data[0] as T; // Retorna o primeiro elemento do array como T
      } else if (!Array.isArray(data)) {
        return data as T; // Retorna o próprio dado como T se já for um objeto
      } else {
        return null; // Array vazio quando esperava um objeto
      }
    } else {
      // Se for um array, retorna o array como está
      return data as T[];
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return null;
  }
}