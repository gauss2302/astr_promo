// composables/useWinners.ts
type Winner = {
  id: string;
  rank: number;
  wallet: string; // изменено с name на wallet
  points?: number;
  prize?: string;
};

type UseWinnersOptions = {
  endpoint?: string;
};

// Функция для анонимизации адреса кошелька
function maskWallet(address: string): string {
  if (address.length <= 8) return address;
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  const stars = "*".repeat(address.length - 35);
  return `${start}${stars}${end}`;
}

export function useWinners(opts: UseWinnersOptions = {}) {
  const config = useRuntimeConfig();
  const endpoint =
    opts.endpoint ||
    (config.public?.apiBase ? `${config.public.apiBase}/winners` : null);

  // Мок-данные с адресами кошельков
  const mock: Winner[] = Array.from({ length: 25 }).map((_, i) => ({
    id: String(i + 1),
    rank: i + 1,
    wallet: maskWallet(
      [
        "0x1234567890abcdef1234567890abcdef12345678",
        "0xabcdef1234567890abcdef1234567890abcdef12",
        "0x9876543210fedcba9876543210fedcba98765432",
        "0x1111222233334444555566667777888899990000",
        "0xaaaabbbbccccddddeeeeffffaaaabbbbccccdddd",
        "0x5555666677778888999900001111222233334444",
        "0x2222333344445555666677778888999900001111",
        "0x7777888899990000111122223333444455556666",
        "0x3333444455556666777788889999000011112222",
        "0x8888999900001111222233334444555566667777",
        "0x4444555566667777888899990000111122223333",
        "0x9999000011112222333344445555666677778888",
        "0x0000111122223333444455556666777788889999",
        "0x6666777788889999000011112222333344445555",
        "0x1111000022223333444455556666777788889999",
        "0xaaaa1111bbbb2222cccc3333dddd4444eeee5555",
        "0x5555eeee4444dddd3333cccc2222bbbb1111aaaa",
        "0x9999888877776666555544443333222211110000",
        "0x1234abcd5678efgh9012ijkl3456mnop78901234",
        "0xfedcba9876543210fedcba9876543210fedcba98",
        "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
        "0xdeadbeefcafebabe1234567890abcdef12345678",
        "0x0123456789abcdef0123456789abcdef01234567",
        "0xffffeeeeddddccccbbbbaaaa9999888877776666",
        "0x1111aaaa2222bbbb3333cccc4444dddd5555eeee",
      ][i]
    ),
    points: 5000 - i * 120,
    prize:
      i === 0
        ? "1 ETH"
        : i === 1
        ? "iPhone 17 Pro Max"
        : i === 2
        ? "Мерч-бокс Asterium"
        : i <= 9
        ? "Карта Asterium + 100 HUMO"
        : "50 HUMO",
  }));

  const { data, pending, error, refresh } = useFetch<Winner[]>(
    endpoint || "/__mock/winners",
    {
      lazy: true,
      server: false,
      default: () => mock,
    }
  );

  const winners = computed<Winner[]>(() => data.value ?? mock);
  const top25 = computed<Winner[]>(() => winners.value.slice(0, 25));

  return { winners, top25, pending, error, refresh };
}
