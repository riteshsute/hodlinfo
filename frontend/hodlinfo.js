
async function loadCryptoData() {

  try {
    console.log('Loading data...');
    const response = await axios.get('http://localhost:3000/api/get-and-format-data');
    console.log(response)
    const data = response.data;
    console.log(data);
    displayCryptoData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    
  }
}

function displayCryptoData(data) {
    console.log(data)
  const cryptoData = document.getElementById('cryptoData');

  cryptoData.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    const cryptoCell = document.createElement('td');
    cryptoCell.textContent = item.symbol;
    row.appendChild(cryptoCell);

    const lastPriceCell = document.createElement('td');
    lastPriceCell.textContent = item.last;
    row.appendChild(lastPriceCell);

    const buyPriceCell = document.createElement('td');
    buyPriceCell.textContent = item.buy;
    row.appendChild(buyPriceCell);

    const sellPriceCell = document.createElement('td');
    sellPriceCell.textContent = item.sell;
    row.appendChild(sellPriceCell);

    const volumeCell = document.createElement('td');
    volumeCell.textContent = item.volume;
    row.appendChild(volumeCell);

    cryptoData.appendChild(row);
  });
}

loadCryptoData();
