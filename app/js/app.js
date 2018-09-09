$(function() {
  $('select').selectric({      
  });

  var ajaxGet = {
    checkAjax: null,
    checkCurrency: function(){  
      $("#currency").on('change', function(){        
        var currencyOption =  $("#currency option:selected");
        var b = $("#currency option:selected").text();        

        if(ajaxGet.checkAjax!=null){
          ajaxGet.checkAjax.abort();			
        }
        ajaxGet.checkAjax = $.ajax({
          url: currencyOption.val(),
          data: currencyOption.serialize(), 
          dataType: "json", 
          timeout: 20000,
          type: "GET",         
          success: function(data){                     
            let price = data.changes.price;                        
                         
            $('.ask').html(b + data.ask);
            $('.price-hour').html(price.hour + b);  
            $('.price-day').html(price.day + b);  
            $('.price-week').html(price.week + b);  
            $('.price-month').html(price.month + b);
          },
          error: function(XMLHttpRequest){
            if(XMLHttpRequest.statusText!="abort"){
              alert("Currency is not select");		
            }
            else{			
              var	count = parseInt($("#count").text());		
              count++;
              $("#count").text(count);
            }
          }
        });
      });       
    },    
  }; 

  ajaxGet.checkCurrency();

});
