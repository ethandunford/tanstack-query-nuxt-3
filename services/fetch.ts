export const getTimeStampFetch = async () : Promise<string | undefined> => {
    const response = await useFetch("/api/get-time-stamp");
    return response.data.value?.date;
};