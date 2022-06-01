import { debug } from "util";
import { LOCAL_STORAGE_KEY } from "../resources/constants";

/**
 * loads persisted data from local storage for app. Data returned is parsed (POJO)
 * @returns POJO data
 */
export const loadStates = () => {
  
    const serializedState = <string> window.localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      const parsedValue = JSON.parse(serializedState);
      return parsedValue;
  
    } catch (error) {
      if (process.env.NODE_ENV === "development")
      debug("Error loading from local storage: " + error);
      return serializedState;
    }
}
    
  /**
   * Persist data into local storage
   * @param {*} state 
   */
  export const saveStates = async (state: any) => {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
        
      } catch (error) {
        if (process.env.NODE_ENV === "development")
          console.error("Error saving to local storage", error);
      }
  }
  
  /**
   * CLears any data in local storage related to system
   */
  export const clearStates = () =>{
      try {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          
      } catch (error) {
        if (process.env.NODE_ENV === "development")
          console.warn("Error loading from local storage", error);
      }
  }