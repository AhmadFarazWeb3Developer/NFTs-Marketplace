const fetchEthUsd = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await res.json();

    return await data.ethereum.usd;
  } catch (err) {
    console.error("Error fetching ETH/USD rate:", err);
    return null;
  }
};

export default fetchEthUsd;
