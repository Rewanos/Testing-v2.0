$(function() {

	$("a[href='#callback']").magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
	});

	$(document).ready(function () {
	 $.getJSON('https://codeit.pro/frontTestTask/company/getList', function(data) {
	  
	    
	     $('.ms-list').append('<li>'+ data.list.length);
	    
	  });
	});

		$(document).ready(function () {
	 $.getJSON('https://codeit.pro/frontTestTask/company/getList', function(data) {
	   for(var i = 0; i < data.list.length; i++) {
	    var obj = data.list[i];
	     $('.companies').append('<li id=' +'"'+ obj.name + '" >'+ obj.name + '<ul></ul>');
	     $('.partners-block').append('<li id='+ '"' + obj.name + '"' + '><ul class="block_part"></ul></li>');
	     for(var k =0; k < obj.partners.length; k++) {
	       var partner = obj.partners[k];
	       $(".partners-block li#" +obj.name).find('ul').append('<li>'+'<span>'+ partner.name + '</span>' + ' '+ partner.value + '%');
	     }
	    }
	  });
	  $('.companies').on('click', 'li', function() {
	    var companyName = $(this).attr('id');
	    $('.partners-block li').removeClass('active');
	    $('.partners-block li#'+ companyName).addClass('active');
	    $('.partners-wrapper, .partners-block').slideDown();
	  });
	  
	})


		var ctx = document.getElementById("myChart").getContext('2d');
	var myPieChart = new Chart(ctx,{
	    type: 'pie',
	    data: {
	      labels: [
	        'Germany',
	        'Norway',
	        'Ukraine',
	        'Sweden',
	        'United States',
	        'Poland'
	    ],
	      datasets: [{
	        data: [3, 4, 18, 18, 23, 34],
	        backgroundColor: [
	                'rgba(255, 99, 132, 0.5)',
	                'rgba(54, 162, 235, 0.5)',
	                'rgba(255, 206, 86, 0.5)',
	                'rgba(75, 192, 192, 0.5)',
	                'rgba(153, 102, 255, 0.5)',
	                'rgba(255, 159, 64, 0.5)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 2
	    }],
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	   
	  }
	});


		//News Slider

		$(document).ready(function(){
	  $.getJSON('https://codeit.pro/frontTestTask/news/getList', function(data) {
	    for (var i = 0; i < data.list.length; i++) {
	      var post = data.list[i];
	      var datestamp =  new Date(post.date*1000);
	      var day = datestamp.getDate();
	      var month = datestamp.getMonth();
	     
	      if (day <= 9) {
	        day = '0' + day
	      }
	      if (month <= 9) {
	        month = '0' + month
	      }
	      var date = day+ '.' + month + '.' + datestamp.getFullYear(); 
	      console.log(post);
	      
	      $('.news-block .swiper-wrapper').append('<div class="swiper-slide"><img class="news-image" src='+ '"'+ post.img + '"' + '><h1 class="title"><a href="codeit.com.ua">' + post.link + '</a></h1> <p class="news-text">'+ post.description + '</p><span class="news-author"><strong>Автор:</strong> '+ post.author+'</span><p><span class="news-date"><strong>Дата:</strong> '+ date + '</span></p></div>');
	            
	    }
	  }).done(function() {
	     var size = 90;
	      $('.news-text').each(function () {
	        newsText = $(this).text();
	        if(newsText.length > size){
		        $(this).text(newsText.slice(0, size) + ' ...');
	        }
	      })       
	    var mySwiper = new Swiper ('.swiper-container', {
	      // Optional parameters
	      direction: 'horizontal',
	      loop: true,
	      speed: 600,
	      pagination: '.swiper-pagination',
		    nextButton: '.swiper-button-next',
	    	prevButton: '.swiper-button-prev'
	    })  
	  });
	      
	})


	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(".contact-form .success").addClass("active")
			setTimeout(function() {
				// Done Functions
				$(".contact-form .success").removeClass("active")
				th.trigger("reset");
				$.magnificPopup.close();
			}, 1000);
		});
		return false;
	});

});
