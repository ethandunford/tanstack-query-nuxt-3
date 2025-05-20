import { useQuery, useMutation } from "@tanstack/vue-query";

export function useApi() {
  const getTimeStamp = useQuery({
    queryKey: ["getTimeStamp"],
    queryFn: async () => {
      const data = await $fetch("/api/get-time-stamp");
      return data;
    },
  });

  const isEven = useMutation({
    mutationFn: async (number: string) => {
      await $fetch("/api/is-even", {
        method: "post",
        body: { number },
      });
    },
  });

  return { getTimeStamp, isEven };
}
