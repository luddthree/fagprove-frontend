export default function useEmail() {
    const sendTaskEmail = async (email) => {
      try {
        const response = await useFetch('http://localhost:8000/api/tasks/emsend', {
          method: 'POST',
          body: { email }
        });
        return response.data;
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
  
    return { sendTaskEmail };
  }
  