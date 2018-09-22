$(function() {
  $('select').selectric({      
  });

  class Challange {
    constructor(url) {
      this.url = url;       
    };
  
    async getData(currency) {
      try {
        let response = await fetch(`${this.url}${currency}`);
        let data = await response.json(); 
        return data;
      } catch (error) {
        throw new Error('Не удалось получить стоимость валюты');
      };
    };
    
    async changeData(url, classPiese) {
      let challange = new Challange(`${url}`);      
   
      $("#currency").on('change', async function(){       
        let b =  $("#currency option:selected").text();
        let currencyOption =  $("#currency option:selected").val();
  
        try {
          let data = await challange.getData(b);
          let price = data.changes.price;
          let percent = data.changes.percent;
                                  
          $(`.${classPiese}ask`).html(currencyOption + " " + data.ask);
          $(`.${classPiese}price-hour`).html(price.hour + " " + currencyOption);
          $(`.${classPiese}price-day`).html(price.day + " " + currencyOption);
          $(`.${classPiese}price-week`).html(price.week + " " + currencyOption); 
          $(`.${classPiese}price-month`).html(price.month + " " + currencyOption); 

          $(`.${classPiese}percent-hour`).html(percent.hour + " " + '%');
          $(`.${classPiese}percent-day`).html(percent.day + " " + '%');
          $(`.${classPiese}percent-week`).html(percent.week + " " + '%'); 
          $(`.${classPiese}percent-month`).html(percent.month + " " + '%');
        } catch (error) {
          console.error(error);
        };
      });
    };

    async pushDataDefault(url, classPiese) {
      let challange = new Challange(`${url}`);
      let currencyOption =  $("#currency option:selected").val();
      let b = $("#currency option:selected").text();
      
      try {
        let data = await challange.getData(b);
        let price = data.changes.price;
        let percent = data.changes.percent;
                                
        $(`.${classPiese}ask`).html(currencyOption + " " + data.ask);
        $(`.${classPiese}price-hour`).html(price.hour + " " + currencyOption);
        $(`.${classPiese}price-day`).html(price.day + " " + currencyOption);
        $(`.${classPiese}price-week`).html(price.week + " " + currencyOption); 
        $(`.${classPiese}price-month`).html(price.month + " " + currencyOption); 

        $(`.${classPiese}percent-hour`).html(percent.hour + " " + '%');
        $(`.${classPiese}percent-day`).html(percent.day + " " + '%');
        $(`.${classPiese}percent-week`).html(percent.week + " " + '%'); 
        $(`.${classPiese}percent-month`).html(percent.month + " " + '%');
      } catch (error) {
        console.error(error);
      };
    };  
    
    async percentChanger(checkBox, priceDiv) {
      $(`input.${checkBox}`).click(function() {
      var checked = $(`input.${checkBox}:checked`);
  
      if ( checked.length == 0 ) {
        $( 'div#' + $(this).val() ).hide();
        $( `div#${priceDiv}` ).show();
      } else {
          $( 'div#' + $(this).val() ).show();
          $( `div#${priceDiv}` ).hide();          
      };
    });
   };      
  };   

  (async () => {
    let render = new Challange();

    await render.percentChanger('ethereum-show-or-hide', 'ethereum-price');
    await render.percentChanger('litecoin-show-or-hide', 'litecoin-price');
    await render.percentChanger('bitcoin-show-or-hide', 'bitcoin-price');

    await render.pushDataDefault('https://apiv2.bitcoinaverage.com/indices/global/ticker/ETH', 'E');
    await render.pushDataDefault('https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC', 'L');
    await render.pushDataDefault('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC', 'B');

    await render.changeData('https://apiv2.bitcoinaverage.com/indices/global/ticker/ETH', 'E');
    await render.changeData('https://apiv2.bitcoinaverage.com/indices/global/ticker/LTC', 'L');
    await render.changeData('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTC', 'B');

  })();  

});

