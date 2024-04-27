import create from 'zustand';

const useStore = create((set) => {
  // Initialize userData from local storage
  const initializeUserData = () => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData).user : null;
  };

  return {
    userData: initializeUserData(),
    setUserData: (data) => {
      // Update the Zustand store with the data
      set({ userData: data.user });
      
      // Store the data in local storage
      localStorage.setItem('userData', JSON.stringify(data));
    },
  };
});

export default useStore;
