/**
 * Store the collection into local storage
 * @param {string} collectionName the name of the collection 
 */
export function setCollection(collectionName: string): void {
    localStorage.setItem('collection', collectionName);
}