function filter() {
  input = document.getElementById("filter");
  filtered = input.value.toUpperCase();
  container = document.getElementById("wordles");
  cards = container.getElementsByClassName("card");

  for (i = 0; i < cards.length; i++) {
    a = cards[i].getElementsByTagName("h4")[0];
    b = cards[i].getElementsByTagName("p")[0];

    txtValue = (a.textContent || a.innerText) + (b.textContent || b.innerText);
    if (txtValue.toUpperCase().indexOf(filtered) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}
fetch("https://raw.githubusercontent.com/ethrx/wordles/main/wordles.json")
  .then((r) => r.json())
  .then((d) => {
    for (let j = 0; j <= d.length; j += 3) {
      console.log(j, d.slice(j, j + 3));
      document.getElementById("wordles").innerHTML += `
        <div class="row" id=${
          "r" + j
        } style="justify-content: center;flex-wrap: wrap;width:100%">

        </div>
        `;
      d.slice(j, j + 3).forEach((w) => {
        document.getElementById("r0").innerHTML += `
          <div class="card col-md-3" style="margin: 10px; min-height: 10%; border-radius: 5px; margin-top: 0px; text-align: left; display: flex; flex-direction: column;">
               <div style="display: flex; flex-direction: column; position: absolute; margin-top: 1.25rem">
                  <a type="button" class="btn-floating" style="color: #ffafbd;"><i style="font-size: 1.5rem" class="fa-regular fa-circle-up"></i></a>
                  <span style="text-align: center; padding-bottom: 1px">${
                    w.pop || "0"
                  }</span>

                  <a type="button" class="btn-floating" style="color: #ffafbd;"><i style="font-size: 1.5rem" class="fa-regular fa-circle-down"></i></a>
               </div>
            <a
               href=${w.link}
               style="text-decoration: none !important; color: inherit;margin: 10px"
               target="_blank"
               >
               <img class="card-img-top w-100 d-block" />
               <div class="card-body" style="margin-left: 15px;">
                  <div style="display: flex; padding: 10px; padding-left: 0px; align-items: center; flex-flow: wrap; justify-content: space-between">
                    <h4 class="card-title">${w.title}</h4>
                    <img type="image/ico" style="width: 50px; height:50px" src="http://www.google.com/s2/favicons?domain=https://${
                      new URL(w.link).hostname
                    }&sz=128"></img>
                  </div>
                  <p class="card-text" style="">
                     ${w.description}
                  </p>
               </div>
            </a>
          </div>
            `;
      });
    }

    window.wordles = d;
  });
