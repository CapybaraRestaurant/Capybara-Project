if (results[0]) {
    document.getElementById('address').value = results[0].formatted_address;
  }
  function goBack() {
    window.history.back();
  }
  