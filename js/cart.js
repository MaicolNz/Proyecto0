var ids = [];

function subtotal(cost, cant) {
  return cost * cant;
}
fetch("https://japceibal.github.io/emercado-api/user_cart/" + "25801" + ".json")
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);

    for (let i = 0; i < data.articles.length; i++) {
      fetch(PRODUCT_INFO_URL + data.articles[0].id + ".json")
        .then((response) => response.json())
        .then(function (producto) {
          console.log(producto);
          let html = `<tr>
          <th><img src="${producto.images[0]}" width=50px></th>
          <td>${producto.name}</td>
          <td>${producto.currency} ${producto.cost}</td>
          <td><input type="number" id="quantity${
            producto.id
          }" name="quantity" min="1" max="10" value="1"></td>
          <td id="sub${producto.id}"> ${producto.currency} ${subtotal(
            producto.cost,
            1
          )}</td>
          </tr>`;
          ids.push(producto.id);
          document.getElementById("tabla").innerHTML += html;
          document.getElementById("subM").innerHTML = `${
            producto.currency
          } ${subtotal(producto.cost, 1)}`;
          document.getElementById("EnvioM").innerHTML = `${producto.currency} ${
            (5 / 100) * subtotal(producto.cost, 1)
          }`;
          document.getElementById("TotalM").innerHTML = `${producto.currency} ${
            subtotal(producto.cost, 1) + (5 / 100) * subtotal(producto.cost, 1)
          }`;
        });
    }
  });

document.addEventListener("input", function (evento) {
  for (let i = 0; i < ids.length; i++) {
    fetch(PRODUCT_INFO_URL + ids[i] + ".json")
      .then((response) => response.json())
      .then(function (producto) {
        var total =
          document.getElementById("quantity" + ids[i]).value * producto.cost;
        var totalV;
        document.getElementById("subM").innerHTML = `${producto.currency} ${
          document.getElementById("quantity" + ids[i]).value * producto.cost
        }`;
        document.getElementById("sub" + producto.id).innerHTML = `${
          producto.currency
        } ${
          document.getElementById("quantity" + ids[i]).value * producto.cost
        }`;
        //Envios//
        if (document.getElementById("premium").checked) {
          document.getElementById("EnvioM").innerHTML = `${
            producto.currency
          } ${Math.round((15 / 100) * total)}`;
          totalV = Math.round((15 / 100) * total);
        } else if (document.getElementById("express").checked) {
          document.getElementById("EnvioM").innerHTML = `${
            producto.currency
          } ${Math.round((7 / 100) * total)}`;
          totalV = Math.round((7 / 100) * total);
        } else if (document.getElementById("standard").checked) {
          document.getElementById("EnvioM").innerHTML = `${
            producto.currency
          } ${Math.round((5 / 100) * total)}`;
          totalV = Math.round((5 / 100) * total);
        }
        document.getElementById("TotalM").innerHTML = `${producto.currency} ${
          total + totalV
        }  `;
      });
  }
});
