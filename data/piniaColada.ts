import { useQuery, useMutation } from '@pinia/colada'

export function useApi() {

    // https://pinia-colada.esm.dev/guide/queries.html
    const getTimeStamp = useQuery({
        key: () => ["getTimeStampPinia"],
        query: () => $fetch("/api/get-time-stamp")
    })

    const isEven = useMutation({
        // https://pinia-colada.esm.dev/guide/mutations.html
        mutation: async (number: string) => {
            await $fetch("/api/is-even", {
                method: "post",
                body: { number },
            });
        },
    });

    return { getTimeStamp, isEven };
}
