// src/services/dataLoader.ts

/**
 * Carrega dados JSON de uma URL.
 * Se isSingleObject for true, espera e retorna um único objeto (T | null).
 * Caso contrário (padrão), espera e retorna um array de objetos (T[] | null).
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
    const rawData = await response.json(); // Pega a resposta bruta

    if (isSingleObject) {
      // Se for um objeto único, mas o Apps Script retornou um array de 1 elemento,
      // pegamos o primeiro elemento.
      if (Array.isArray(rawData) && rawData.length > 0) {
        return rawData[0] as T; // Retorna o primeiro elemento do array como T
      } else if (!Array.isArray(rawData)) {
        return rawData as T; // Retorna o próprio dado como T se já for um objeto
      } else {
        return null; // Array vazio quando esperava um objeto
      }
    } else {
      // ESTA É A MUDANÇA CRUCIAL: Se não for single object, SEMPRE retorne um array.
      // Mesmo que o JSON da API retorne um único objeto acidentalmente,
      // queremos que o consumer (as páginas Visualizacoes/Publicacoes) sempre recebam um array.
      if (Array.isArray(rawData)) {
        return rawData as T[];
      } else {
        // Se esperávamos um array, mas recebemos um único objeto (situação inesperada, mas defensiva)
        // Envolvemos-o em um array ou retornamos um array vazio.
        console.warn(`loadData: Esperava array para ${url}, mas recebeu um objeto. Envolvendo em array.`);
        return [rawData] as T[]; // Coloca o objeto dentro de um array
      }
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return null;
  }
}