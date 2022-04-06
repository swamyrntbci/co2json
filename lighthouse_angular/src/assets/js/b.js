const wcID = (selector) => document.getElementById("wcb");
const url = new URL(window.location.href);
const isTest = url.searchParams.get("test");
const wcU = encodeURIComponent(url);

//const wcU = encodeURIComponent('https://www.renault.co.in/book-your-renault.html')

const newRequest = async function (render = true) {
  console.log("wcU" + wcU);
  // Run the API request because there is no cached result available
  if (!isTest) {
    await fetch("http://localhost:30000/co2/calculate?url=" + wcU, {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Accept: "application/json;charset=UTF-8",
      },
    })
      .then(function (r) {
        if (!r.ok) {
          throw Error(r);
        }
        return r.json();
      })

      .then(function (r) {
        if (render) {
          renderResult(r);
        }

        // Save the result into localStorage with a timestamp
        r.t = new Date().getTime();
        localStorage.setItem("wcb_" + wcU, JSON.stringify(r));
      })

      // Handle error responses
      .catch(function (e) {
        wcID("wcb_g").innerHTML = "No Result";
        console.log(e);
        localStorage.removeItem("wcb_" + wcU);
      });
  }
};

const renderResult = function (obj) {
  //var obj = JSON.parse(r);

  wcID("wcb_g").innerHTML = obj.data.co2 + "g of CO<sub>2</sub>/view";
  //wcID('wcb_2').insertAdjacentHTML('beforeEnd', 'Cleaner than ' + r + '% of pages tested')
};

// Get the CSS and add it to the DOM. The placeholder will be filled by gulp build
const wcC = "{{css}}";
const wcB = wcID("wcb");
let i = 0;
window.onload = function () {
  if ("fetch" in window) {
    // If the fetch API is not available, don't do anything.
    // Add the badge markup

    // Get result if it's saved
    let cachedResponse = localStorage.getItem("wcb_" + wcU);
    const t = new Date().getTime();

    // If there is a cached response, use it
    if (cachedResponse) {
      console.log("cached request");

      const r = JSON.parse(cachedResponse);
      //document.getElementById("wcb_g").innerHTML = r.co2 + 'g of CO<sub>2</sub>/view'
      renderResult(r);

      // If time since response was cached is over a day, then make a new request and update the cached result in the background
      if (t - r.t > 86400000) {
        newRequest(false);
      }

      // If no cached response, then fetch from API
    } else {
      console.log("new request");
      newRequest();
    }
  }
};
