function convertTemperature (){
    var temp = parseFloat(document.getElementById('temperature').value);
    var convertFrom = document.getElementById('convertFrom').value;
    var result;
    if (isNaN(temp)) {
        document.getElementById('result').innerText = "Please enter a valid number.";
        return;
      }

      if (convertFrom === 'C') {
        // Convert Celsius to Fahrenheit
        result = (temp * 9/5) + 32;
        document.getElementById('result').innerText = temp + "°C is " + result.toFixed(2) + "°F";
      } else if (convertFrom === 'F') {
        // Convert Fahrenheit to Celsius
        result = (temp - 32) * 5/9;
        document.getElementById('result').innerText = temp + "°F is " + result.toFixed(2) + "°C";
      }else if (convertFrom === 'K') {
        result = ((temp * 9/5) + 32) + 273.15;
        document.getElementById('result').innerText = temp + "°C is " + result.toFixed(2) + "°K";
      }
}