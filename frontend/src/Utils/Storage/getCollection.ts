/**
 * Return the collection name inside of local storage 
 */
export function getCollection(): string | null {
    return localStorage.getItem("collection");
}