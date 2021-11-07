var input = null;
var c = null;
var textarea = null;

$(document).ready(function($) {
	
	/*
	try{
		var sec = 30;
		var circle = 1
		setInterval(function(){
			
			if(sec==0){
			   //обновление курса
			   // ..  
			   //get_course();
			   
			   //получаем пару
			   //getPair(1);
			 
			 	sec=30;
				circle=1;
			  
				
			   return;
			}
			
			sec--;
		},1000);
	  
	  
		setInterval(function(){
			if(sec!=0){
				$(".v-progress-text div").text(sec);
				$(".vProgressSpinner").removeClass("spin");
				$(".progress__value").css("stroke-dashoffset",circle);
			}
			else{
				$(".vProgressSpinner").addClass("spin");
				 $(".v-progress-text div").text('');
				 $(".progress__value").css("stroke-dashoffset",10);
			}
			circle+=0.25;
		},100);
	}
	catch(e){}
	*/
	try{
    var time = lastseconds;
    claim__time = setInterval(function(){
			time--;

			var cminutes = Math.floor(time / 60);
			var cseconds = time % 60;

			if(cseconds<10) cseconds='0'+cseconds;
			if(cminutes<10) cminutes='0'+cminutes;


			$(".claim-time-tick").html(cminutes+":"+cseconds+" мин.");

			if(time<=0) {
				$(".claim-time").html("Время оплаты вышло");
				clearInterval(claim__time);
			}

		},1000);
	}
	catch (e) {

	}

	try {
		
		var data_pay_id_first = $('.section-send li.pay-select-li:nth-child(1)').attr('data-pay-id'); 
		console.log( data_pay_id_first );
				
		createFromTo(1);
		/*getPair(1);
		getReserves();*/
		
		if(data_pay_id_first != from_to[0]){
			console.log('from_to ' + from_to[0] )
			
			var cur_from_id = from_to[0];
			$.get({
				url: 'getways',
				data: {
					send:cur_from_id
				},
				success: function (data) {
					from_to[0] = (+cur_from_id);
					api.ways = data.toWays;
					$(".bank-curr-to").text(data.firstWay['bank_to__currency_id__code']);
					createFromTo(1);
					/*getPair(1);*/
				}
			});
		
		
		}
		
		getPair(1);
		getReserves();
		//changePs(1, from_to[0]);
		//changePs(2, from_to[1]);

		//getCourse();
	}
	catch (e) {

	}
	

CourseUpdate();

//при выборе направления и платёжной системы
$(".pay-select-li").click(function () {
	deleteErrors();

	var way = $(this).attr("data-way");
	var ps = $(this).attr("data-pay-id");
	
	$(this).siblings('li').removeClass('active');
	$(this).addClass('active');


	CourseUpdate();


	if(way==1) {
		$.get({
			url: 'getways',
			data: {
				send:ps
			},
			success: function (data) {
				from_to[0] = (+ps);
				from_to[1] = (+data.firstWay['bank_to__pk']);
				api.ways = data.toWays;
				
				console.log(from_to[1])
				console.log(api);
				console.log(data);
				$(".bank-curr-to").text(data.firstWay['bank_to__currency_id__code']);
        		/*$(".ps-logo-to img, .calc_input_right_logo, #poluchaete_logo_input").attr("src",'/media/'+data.firstWay['bank_to__logo']);*/
				createFromTo(1);

				//получаем пару
				getPair(1);
			}
		});
	}
	else{
		from_to[1] = (+ps);
		//получаем пару
		getPair(2);
	}
});


$(".in-text").keyup(function () {
    calculate(1);
});
$(".to-text").keyup(function () {
    calculate(2);
});


$(".in-text").change(function(){
    calculate(1);
});
$(".to-text").change(function(){
    calculate(2);
});





	c = { // c - classes
		state: {
			active: 'active',
			filled: 'filled',
			valid: 'valid',
			error: 'error',
			focus: 'focus',
			checked: 'checked',
			required: 'required'
		},
		sElem: '__', // separator Element
		sMode: '_' // separator Modifier

	};
	 input = {
		class: {
			block: 'input',
			area: 'area'
		},
		block: null,
		placeholder: null,
		area: null,
		value: null,
		Vars: function(block){
			this.block = block.parents('.' + this.class.block);
		},
		Filled: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				this.block.addClass(this.class.block + c.sMode + c.state.filled)
			}
			else {
				this.block.removeClass(this.class.block + c.sMode + c.state.filled)
			}
			if(this.block.hasClass('input_digit')){
                  //block.val(this.value.replace(/[^0-9\.]/g, '').replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 '));
            // this.block.val();
          }
		},
		OnFocus: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.focus).removeClass(this.class.block + c.sMode + c.state.error);
		},
		UnFocus: function(block){
			this.block = block.parents('.' + this.class.block);
			this.block.removeClass(this.class.block + c.sMode + c.state.focus);
		},
		EventValid: function(block){
			this.Vars(block);
			this.block.removeClass(this.class.block + c.sMode + c.state.error);
			return 0;
		},
		EventValidError: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.error);
			return 1;
		},
		Validation: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				if (this.block.hasClass(this.class.block + '_phone')){
					if (this.value.length != 18){
						return this.EventValidError(block);
					}
					else{
						return this.EventValid(block);
					}
				}
				else{
					return this.EventValid(block);
				}
			}
			else {
				return this.EventValidError(block);
			}
		},
		Init: function () {
			this.area = '.' + input.class.block + c.sElem + input.class.area;
			$(window).on('load', function () {
				$('body').find(input.area).each(function () {
					input.Filled($(this));
				})
			});
			$(this.area).on('focusin', function () {
				input.OnFocus($(this));
			});
			$(this.area).on('focusout', function () {
				input.UnFocus($(this));
			});
			$(this.area).on('keyup', function () {
				input.Filled($(this));
			});
			$('.' + this.class.block + '_phone ' + this.area).mask('+7 (000) 000-00-00'); // phone mask
		}
	};

	console.log(input);
	
	$('.input__placeholder').on('click', function () {
		var inputArea = $(this).next('.input__area');
		input.OnFocus(inputArea);
		inputArea.focus();
	});



	textarea = {
		class: {
			block: 'textarea',
			area: 'area'
		},
		block: null,
		placeholder: null,
		area: null,
		value: null,
		Vars: function(block){
			this.block = block.parents('.' + this.class.block);
		},
		Filled: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				this.block.addClass(this.class.block + c.sMode + c.state.filled)
			}
			else {
				this.block.removeClass(this.class.block + c.sMode + c.state.filled)
			}
		},
		OnFocus: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.focus).removeClass(this.class.block + c.sMode + c.state.error);
		},
		UnFocus: function(block){
			this.block = block.parents('.' + this.class.block);
			this.block.removeClass(this.class.block + c.sMode + c.state.focus);
		},
		EventValid: function(block){
			this.Vars(block);
			this.block.removeClass(this.class.block + c.sMode + c.state.error);
			return 0;
		},
		EventValidError: function(block){
			this.Vars(block);
			this.block.addClass(this.class.block + c.sMode + c.state.error);
			return 1;
		},
		Validation: function(block){
			this.Vars(block);
			this.value = block.val();
			if (this.value != ''){
				return this.EventValid(block);
			}
			else {
				return this.EventValidError(block);
			}
		},
		Init: function () {
			this.area = '.' + textarea.class.block + c.sElem + textarea.class.area;
			$(window).on('load', function () {
				$('body').find(textarea.area).each(function () {
					textarea.Filled($(this));
				})
			});
			$(this.area).on('focusin', function () {
				textarea.OnFocus($(this));
			});
			$(this.area).on('focusout', function () {
				textarea.UnFocus($(this));
			});
			$(this.area).on('keyup', function () {
				textarea.Filled($(this));
			});
		}
	};

	var checkbox = {
		class: {
			block: 'checkbox',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('.' + this.class.block + c.sElem + this.class.input);
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == c.state.checked){
				this.block.addClass(this.class.block + c.sMode + c.state.checked)
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.input.attr(c.state.checked, c.state.checked);
				this.block.addClass(this.class.block + c.sMode + c.state.checked);
			}
			else {
				this.input.removeAttr(c.state.checked);
				this.block.removeClass(this.class.block + c.sMode + c.state.checked);
			}

		},
		Validation: function(block){
			var blocksLength = block.find('.' + this.class.block + c.sMode + c.state.checked).length;
			if (blocksLength == 0){
				return 1;
			} else{
				return 0;
			}


		},
		Init: function () {
			this.input = '.' + checkbox.class.block + c.sElem + checkbox.class.input;
			$(window).on('load', function () {
				$('body').find('.' + checkbox.class.block).each(function () {
					checkbox.Filled($(this));
				})
			});
			$('.' + checkbox.class.block).on('click', function () {
				checkbox.Click($(this));
			});
		}
	};

	var radio = {
		class: {
			block: 'radio',
			input: 'input'
		},
		block: null,
		input: null,
		value: null,
		name: null,
		status: null,
		radios: null,
		Vars: function(block){
			this.block = block;
			this.input = this.block.find('.' + this.class.block + c.sElem + this.class.input);
			this.name = this.input.attr('name');
			this.status = this.input.attr('checked');
			this.value = this.input.val();
		},
		Filled: function(block){
			this.Vars(block);
			if (this.status == c.state.checked){
				this.block.addClass(this.class.block + c.sMode + c.state.checked)
			}
		},
		Click: function (block) {
			this.Vars(block);
			if(this.status == undefined || this.status == ''){
				this.radios = this.block.parents('body').find('input[name = ' + this.name + ']');
				this.radios.each(function () {
					var input = $(this).parents('.' + radio.class.block);
					$(this).removeAttr('checked');
					input.removeClass(radio.class.block + c.sMode + c.state.checked);
				});
				this.input.attr(c.state.checked, c.state.checked);
				this.block.addClass(this.class.block + c.sMode + c.state.checked);
			}
		},
		Validation: function(block){
			var blocksLength = block.find('.' + this.class.block + c.sMode + c.state.checked).length;
			if (blocksLength == 0){
				return 1;
			} else{
				return 0;
			}
		},
		Init: function () {
			this.input = '.' + radio.class.block + c.sElem + radio.class.input;
			$(window).on('load', function () {
				$('body').find('.' + radio.class.block).each(function () {
					radio.Filled($(this));
				})
			});
			$('.' + radio.class.block).on('click', function () {
				radio.Click($(this));
			});
		}
	};

	input.Init();
	textarea.Init();
	checkbox.Init();
	radio.Init();

	$('.lang__item_current').on('click', function () {
		var block = $(this).parents('.lang');
		block.toggleClass('lang_open');
	});

//filters
	$('.type_currency_out > div, .type_currency_in > div').click(function(){
		var type_currency_filter = $(this).attr('data-filter');
		if ( $(this).parent('.type_currency').hasClass('type_currency_in') ){
			$('.type_currency_in > div').removeClass('active');
			$('.type_currency_in > div[data-filter=' + type_currency_filter + ']').addClass('active');
			var money_select_li = $('.money_select_in li');
		}else if ( $(this).parent('.type_currency').hasClass('type_currency_out')  ){

			$('.type_currency_out > div').removeClass('active');
			$('.type_currency_out > div[data-filter=' + type_currency_filter + ']').addClass('active');
			var money_select_li = $('.money_select_out li');
		}
		
		if( type_currency_filter == 'all' ){ 
			money_select_li.removeClass('curr_none');
		}else{ 
			money_select_li.each(function(i,elem) {
				data_type_li = $(this).attr('data-currency-type');
					if ( data_type_li == type_currency_filter){
						$(this).removeClass('curr_none');
					}else{
						$(this).addClass('curr_none');      
					}
			});
		}    
	
	});
	

	$('.mobile_in').click(function(){
		// $('.ps_from_mobile').addClass('md-show');
		$('.ps_from_mobile').modal({
			blockerClass: "mobile_modal_bg"
		});
	})
   
	$('.mobile_out').click(function(){
		// $('.ps_to_mobile').addClass('md-show');
		$('.ps_to_mobile').modal({
			blockerClass: "mobile_modal_bg"
		});
	})
	
	$('.ps_from_mobile .close_icon, .ps_to_mobile .close_icon').click(function(){
		// $('.ps_from_mobile, .ps_to_mobile').removeClass('md-show');
		$.modal.close();
	})

	
   

	
	$(window).resize(function(){
		// $('.ps_from_mobile, .ps_to_mobile').removeClass('md-show');
		/*
		if(  $(window).width() > 1199  ){
			$('.ps_from_mobile, .ps_to_mobile').css('display','block');
		}else if( $(window).width() <= 1199 ) {
			$('.ps_from_mobile, .ps_to_mobile').css('display','none');
		}
		*/
	})
	
	function closePopup(){
		$('.form-group').removeClass('form-group_in-up');
  		$('.drop-popup').removeClass('drop-popup_toggle')
  		$('.popup').removeClass('popup_show');
	}


	$('.drop-popup').on('click', function () {
		var formGroup = $(this).parents('.form-group');
		var offsetTop = formGroup.offset().top;
		var type = $(this).attr('data-type');
		var currency = $('.popup .currency');

		currency.attr('data-current', type);

		if(type=='send'){
			$("#section-get").css("display","none");
			$("#section-send").css("display","contents");
		}
		if(type=='get'){
			$("#section-send").css("display","none");
			$("#section-get").css("display","contents");
		}

		formGroup.toggleClass('form-group_in-up');
    $(this).toggleClass('drop-popup_toggle');
    $('.popup').toggleClass('popup_show');
    $('.popup').css('top', offsetTop + 54 + 11);

  });

  $('.popup__bg, .popup__close').on('click', function(event) {
  	 closePopup();
  });
  
  $('.currency__item').on('click', function(event) {
	// $('.ps_from, .ps_to').css('dispaly','none');
	// if (!$(this).hasClass('currency__item_selected')) {
  	// 	$(this).addClass('currency__item_selected');	
  	// }
  	var title = $(this).attr('data-input-title'),
  			desc = $(this).attr('data-input-desc'),
  			input = $(this).find('.currency__input'),
  			lengthMin = Number(input.attr('minlength')),
  			lengthMax = Number(input.attr('maxlength')),
  			img = $(this).find('.currency__icon img').attr('src');

  	var wrapDesc = $('.form-group_in-up .input__desc'),
  			wrapInput = $('.form-group_in-up').parents('.block').find('.block__input_change'),
  			wrapInputTitle = wrapInput.find('.input__placeholder'),
  			wrapInputArea = wrapInput.find('.input__area'),
  			wrapIcon = $('.form-group_in-up .drop-popup__icon img');


  	wrapInputTitle.html(title);
  	wrapInput.attr('minlength', lengthMin).attr('maxlength', lengthMax);
  	wrapDesc.html(desc);
  	wrapIcon.attr('src', img);
	closePopup();
  	
  });


  $('.money_select_in li, .money_select_out li').click(function(){
	 
	if(  $(window).width() <= 1199  ){
		// $('.ps_from_mobile, .ps_to_mobile').removeClass('md-show');
		// $.modal.close();
	}
	
  })
 
 
  new ClipboardJS('.btn_copy');

	$('.q-toggle').on('click', function(event) {
		var block = $(this).parents('.question');
		block.toggleClass('question_toggle');
	});	

	$(document).mouseup(function (e){
		var div = $(".question");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
			div.removeClass('question_toggle');
		}
	});


	$('.select select').styler({
		onSelectOpened: function() {
			var select = $(this).parents('.select');
			select.addClass('select_open')
		},
		onSelectClosed: function() {
			var select = $(this).parents('.select');
			select.removeClass('select_open')
		}
	});

	var hum = $('.hum'),
			humClass = 'hum_toggle',
			nav = $('.nav'),
			navClass = 'nav_toggle';

	hum.on('click', function(event) {
		hum.toggleClass(humClass);
		nav.toggleClass(navClass);
	});


	$('.news__more').on('click', function(event) {
		$(this).slideUp(400);
		$('.news__item').slideDown(400);
	});	

	$('.jq-selectbox__select, .jq-selectbox__dropdown li').on('click', function(event) {
		var block = $(this).parents('.jq-selectbox');
		block.toggleClass('jq-selectbox_toggle');
	});

	$('.btn_validate').on('click', function () {
		var form = $(this).parents('form'),
				errorsCounter = 0;

		form.find('.' + input.class.block + c.sMode + c.state.required + " ." + input.class.block + c.sElem + input.class.area).each(function () {
			errorsCounter += input.Validation($(this));
		});
		form.find('.' + textarea.class.block + c.sMode + c.state.required + " ." + textarea.class.block + c.sElem + textarea.class.area).each(function () {
			errorsCounter += textarea.Validation($(this));
		});
		form.find('.checkboxs').each(function () {
			errorsCounter += checkbox.Validation($(this));
		});
		
		console.log(errorsCounter);
		

		if (errorsCounter == 0){

		}
	});

	var tabs = {
		_: {
			main: $('.tabs-wrap'),
			list: $('.tabs-list'),
			nav:  $('.tabs-nav')
		},
		class: {
			selected: 'selected',
		},
		current: {
			nav: null,
			item: null
		},
		Vars: function(block){
			tabs.current.nav = block;
			tabs.current.item = $(tabs.current.nav.attr('href'));
		},
		Add: function(block){
			tabs.Vars(block);
			tabs.current.nav.addClass(tabs.class.selected);
			// setTimeout( function(){
				tabs.current.item.addClass(tabs.class.selected);
			// }, 300)
		},
		Remove: function(block){
			tabs.Vars(block);
			tabs.current.nav.parents('li').siblings().each(function(index, el) {
				$(this).find('a').removeClass(tabs.class.selected);
			});
			tabs.current.item.siblings().removeClass(tabs.class.selected);
		},
		OnClick: function(block){
			tabs.Add(block);
			tabs.Remove(block);
		},
		Init: function(){
			tabs._.main.each(function(index, el) {
				tabs.Add($(this).find('.tabs-nav li:first-of-type a'));
			});

			$('.tabs-nav li a').on('click', function(event) {
				event.preventDefault();
				tabs.OnClick($(this));
			});
		}

	}

	tabs.Init();

	$('.text ol').each(function(index, el) {
		if ($(this).parents('.ol-group').length != 1) {
			$(this).find('li').each(function(liIndex, el) {
				var text = $(this).text();
				liIndex = (liIndex + 1);
				$(this).prepend('<span class="count">' + liIndex + '</span> ');
			});
		}

	});

	$('.ol-group').each(function(index, el) {
		$(this).find('h5').each(function(h5Index, el) {
			h5Index= (h5Index + 1) + ".";
			$(this).prepend('<span class="count">' + h5Index + '</span> ');
			$(this).next('ol').find('li').each(function(liIndex, el) {
				liIndex = (liIndex + 1) + ".";
				var text = $(this).text();
				$(this).prepend('<span class="count">' + h5Index + liIndex + '</span> ');
			});
		});
	});

	$('.tabs__select').on('click', function(event) {
		$(this).next('.tabs__nav').slideToggle(300);
	});
	$('.tabs__nav-list a').on('click', function(event) {
		if ($(window).width() < 1220) {
			$('.tabs__select .jq-selectbox').removeClass('jq-selectbox_toggle');
			$('.tabs__nav').slideUp(300);
		}
	});

	$(window).on('load resize', function(event) {
		if ($(window).width() >= 1220) {
			$('.tabs__nav').removeAttr('style');
		}
	});

	$('.close_icon').click(function(){ 
		$(this).parent('.note_bl').removeClass("note_in_block");
	});

	
	
	/*$('.fi__head').on('click', function () {
		var item = $(this).parents('.fi'),
				body = item.find('.fi__body');

		item.toggleClass('fi_open');
		body.slideToggle(300);
	});*/
	
	$('.accordeon_questions__h2').on('click', function(){ 

		var accordeon_item = $(this).parents('.accordeon_questions__li'),
			accordeon_body = accordeon_item.find('.msg');
		accordeon_item.toggleClass('accordeon_questions__open')
		/*accordeon_body.slideToggle(300);*/

	})

});

function phToggle(data) {
		var inputArea = $(data).next('.input__area');
		input.OnFocus(inputArea);
		inputArea.focus();
}

/*
calculator_input_tpl += '<div class="'+type_input+' pay-input block__input block__input_small input input_border input_h54 input_radius input_required '+input_calc_class+'"> <div class="input__wrap"  id="'+way_input+'_requis' +index+ '"> <div class="input__placeholder" onclick="phToggle(this)">' + placeholder + '</div> <input class="input__area" type="' + inputs.inputs[input_calc].type + '" name="names"> </div> </div>';
calculator_input_tpl += '<div class="'+type_input+' pay-input block__input block__input_small input input_border input_h54 input_radius input_required '+input_calc_class+'"> <div class="input__wrap"  id="'+way_input+'_requis' +index+ '"> <div class="input__placeholder" onclick="phToggle(this)">' + placeholder + '</div> <input class="input__area" type="' + inputs.inputs[input_calc].type + '" name="names"> </div> </div>';
        	
*/

//создание полей в калькуляторе
function createInput(inputs, way) {
	
	var calculator_input_tpl = "";
    var index = 1;
    for (var input_calc in inputs.inputs) {
        var placeholder = "";
        var type_input = "in-inputs";
        var way_input = "from";
        if (way == 2) way_input = "to";
        if (way == 2) type_input = "to-inputs";
        var input_calc_class = "active-calc-inputs-in";
        if (way == 2) input_calc_class = "active-calc-inputs-to";
        if (way == 1) placeholder = inputs.inputs[input_calc].placeholder_in;
        if (way == 2) placeholder = inputs.inputs[input_calc].placeholder_to;
        if (way == 1 && inputs.inputs[input_calc].visible_in)
            calculator_input_tpl += '<div class="form-item  in-inputs pay-input ' + input_calc_class +'"><input type="' + inputs.inputs[input_calc].type + '" id="' +way_input+'_requis' +index+ '" class="form-input" required name="names" ><label for="'+way_input+'_requis' +index+ '" class="form-label">'+placeholder+'</label><img class="input_img_logo" src="' + $('#section-send li[data-pay-id=' + api['pair']['paySystems'][from_to[0]]['id'] +'] span img').attr("src") + '"></div>';
		if (way == 2 && inputs.inputs[input_calc].visible_to)
            calculator_input_tpl += '<div class="form-item  to-inputs pay-input ' + input_calc_class +'"><input type="' + inputs.inputs[input_calc].type + '" id="' +way_input+'_requis' +index+ '" class="form-input" required name="names" ><label for="'+way_input+'_requis' +index+ '" class="form-label">'+placeholder+'</label><img class="input_img_logo" src="' + $('#section-get li[data-pay-id=' + api['pair']['paySystems'][from_to[1]]['id'] +'] span img').attr("src") + '"></div>';
		index++;
    }
	
	return calculator_input_tpl;
}

function createInputRef(inputs) {
    let tpl = "";
    var index = 1;

    for (let input in inputs) {
        if(inputs[input]['visible_to']) {
			tpl += '<div class="form-item">\n' +
			'                            <input class="form-input" id="to_requis' + index + '" type="' + inputs[input]['type'] + '" name="data" required value="">\n' +
			'                            <label for="to_requis' + index + '" class="form-label">' + inputs[input]['placeholder_in'] + '</label>\n' +
			'                            <img class="input_img_logo" src="/media/' + inputs[input]['logo'] + '">\n' +
			'                        </div>';
			index++;
		}
    }

    return tpl;
}


function CreateCoursesMain(data){
	courses_main_tpl = '';
	for (var course_main in data.courses) {
				
		courses_main_tpl += '<div class="courses_main_page__item">\n' +
						'      <span class="courses_main_page__course_pair_val">' + data.courses[course_main] + '</span>\n' +
						'	 </div>';
		
	}

	return courses_main_tpl;
}


var course_update_interval = '';
var course_update_interval_sec = '';


function CourseUpdate(){

	clearInterval(course_update_interval);
	clearInterval(course_update_interval_sec);

	/*try{*/
		var sec = 30;
		var circle = 1
		course_update_interval = setInterval(function(){
			
				if(sec==0){
				//обновление курса
				// ..  
				//get_course();
				
				//получаем пару
				/*getPair(1);*/
				
				getPairCourseThirtySecondUpdate(1)

				sec=30;
				circle=1;
					
				return;
				}
				
				sec--;
			},1000);
	  
	  
		course_update_interval_sec = setInterval(function(){
				if(sec!=0){
					$(".v-progress-text div").text(sec);
					$(".vProgressSpinner").removeClass("spin");
					$(".progress__value").css("stroke-dashoffset",circle);
				}
				else{
					$(".vProgressSpinner").addClass("spin");
					$(".v-progress-text div").text('');
					$(".progress__value").css("stroke-dashoffset",10);
				}
				circle+=0.25;
		},100);
	/*}
	catch(e){}*/


}



function changeRefOutput() {
    let refsel = $("#ref-select").val();

    $.get({
        url: '/getpsinfo',
        data: {
            ps: refsel
        },
        success: function (data) {
            $("#ref-inputs").html(createInputRef(data['paySystems'][refsel]['inputs']));
			try {
                input.Init();
            } catch (e) {
            }
            return;
        }
    });
}
//вывод реферальной суммы
function referalOutput() {
    let refsel = $("#ref-select").val();

    let paydata = "ps="+refsel;
    to_requis = [];

    payinputs = $("#ref-inputs .form-item input");

    for (var i = 0; i < payinputs.length; i++) {
        paydata += "&to_requis" + (i + 1) + "=" + encodeURIComponent($(payinputs[i]).val());
        to_requis.push($(payinputs[i]).val());
       
    }

    //paydata +="&g-recaptcha-response="+grecaptcha.getResponse(claim__captcha);

    $.post({
        url: '',
        data: paydata,
        success: function (data) {
			console.log(data)
			if (data["response"] == "error") {
                showErrors(data);
            } else if (data["response"] == "success") {
                deleteErrors();
				$('#ref-inputs .form-input').val('');
				$('.ref_sum').val('Сумма: 0,0 RUR / 0,0 USD / 0,0 BTC');
				$("#summ-success").css("display", "");
            }
        }
    });
}

//получить банк
function getPs(ps) {

}

function getPair(way) {
	$.get({
			url: 'pair',
			data:{
				from:from_to[0],
				to:from_to[1]
			},
			success: function (data) {
				api['pair'] = data;
				
				$('.section-send li.active, .section-get li.active').removeClass('active');
				$('.section-send li[data-pay-id=' + api['pair']['paySystems'][from_to[0]]['id'] +']').addClass('active');
				$('#otdaete_logo_input, .calc_input_left_logo, #mobile_logo_in').attr("src", $('#section-send li[data-pay-id=' + api['pair']['paySystems'][from_to[0]]['id'] +'] span img').attr("src"))
				$('.otdaete_give_away_cur_name, #mobile_in_name').html($.trim($('#section-send li[data-pay-id=' + api['pair']['paySystems'][from_to[0]]['id'] +'] span').text()));
				$('.otdaete_give_away_cur').html($.trim($('#section-send li[data-pay-id=' + api['pair']['paySystems'][from_to[0]]['id'] +']').attr("data-input-desc")));
				$('.give_away_title_bl__min_sum').text(api['pair']['paySystems'][from_to[0]]['min_summa']);
				$('.give_away_title_bl__max_sum').text(api['pair']['paySystems'][from_to[0]]['max_summa']);


				$('.section-get li[data-pay-id=' + api['pair']['paySystems'][from_to[1]]['id'] +']').addClass('active');
				$('#poluchaete_logo_input, .calc_input_right_logo, #mobile_logo_out').attr("src", $('#section-get li[data-pay-id=' + api['pair']['paySystems'][from_to[1]]['id'] +'] span img').attr("src"))
				$('.poluchaete_give_away_cur_name, #mobile_out_name').html($.trim($('#section-get li[data-pay-id=' + api['pair']['paySystems'][from_to[1]]['id'] +'] .name_cur').text()));
				$('.poluchaete_give_away_cur').html($.trim($('#section-get li[data-pay-id=' + api['pair']['paySystems'][from_to[1]]['id'] +']').attr('data-input-desc')));
				
				
				if(way==1) changePs(1, from_to[0]);
				changePs(2, from_to[1]);
				if(way!=2)
				showNotify(1, from_to[0]);
				showNotify(2, from_to[1]);
				getCourse();
				
				
			}
		});
}


function getPairCourseThirtySecondUpdate(way) {
	
	/*console.log('123 getPairThirtySecond')*/

}


function getReserves() {
	$.get({
			url: 'getreserves',
			success: function (data) {
				console.log(data);
				for (var reserve in data.reserves) {
					$("span[data-reserve-id='"+reserve+"'], .money_select_out li[data-pay-id='"+reserve+"'] .reserve_sum > span").html(data.reserves[reserve]);
				}
			}
	});
}

function changePs(way, ps) {
    var psystem = 0;
	console.log(way);
	console.log(ps);
	if (way == 1) {
        psystem = getPs(ps);
		console.log(psystem);
	   
		
		$(".active-calc-inputs-in").remove();
		$("#in-inputs").append(createInput(psystem, way));

        try {
			input.Init();
		}
		catch (e) {}
		return;
    }
    else if (way == 2) {
        psystem = getPs(ps);
		console.log(psystem);
		$(".active-calc-inputs-to").remove();
        $("#to-inputs").append(createInput(psystem, way));

        try {
			input.Init();
		}
		catch (e) {}

    }
}

function getMins(in_bank, to_bank) {
	if(api.pair.mins!=null){
		if(api.pair.mins.min_in!=0){
			$(".in-text").val(api.pair.mins.min_in);
			$(".otdaete_give_away_cur_val").html(api.pair.mins.min_in);
			$('.give_away_title_bl__min_sum').text(api.pair.mins.min_in);
			calculate(1);
		}
		else{
			$(".to-text").val(api.pair.mins.min_to);
			$(".poluchaete_give_away_cur_val").html(api.pair.mins.min_to);
			calculate(2);
		}
	}
	else{
		if(to_bank.min_summa_out!=0){
			$(".to-text").val(to_bank.min_summa_out);
			$(".poluchaete_give_away_cur_val").html(to_bank.min_summa_out);
			calculate(2);
		}
		else{
			$(".in-text").val(in_bank.min_summa);
			$(".otdaete_give_away_cur_val").html(in_bank.min_summa);
			$('.give_away_title_bl__min_sum').text(in_bank.min_summa);
			calculate(1);
		}
	}
}

function getCourse() {
	var to_bank = getPs(from_to[1]);
	var in_bank = getPs(from_to[0]);

	if(to_bank.currency_code != in_bank.currency_code){
		if(api.pair.course<1){
			$("#in-course").html(roundPs(1/api.pair.course,in_bank.round) +" "+ in_bank.currency_code);
			$("#to-course").html("1 "+ to_bank.currency_code);
			
			$('#give_away_cur_val').html(roundPs(1/api.pair.course,in_bank.round));
			$('#give_away_cur').html(in_bank.currency_code);
		
			$('#receive_cur_val').html("1");
			$('#receive_cur').html(to_bank.currency_code);
		}
		else{
		
			$("#in-course").html("1" +" "+ in_bank.currency_code);
			$("#to-course").html(roundPs(api.pair.course,to_bank.round) +" "+ to_bank.currency_code);
		
		
			$('#give_away_cur_val').html("1");
			$('#give_away_cur').html(in_bank.currency_code);
		
			$('#receive_cur_val').html(roundPs(api.pair.course,to_bank.round));
			$('#receive_cur').html(to_bank.currency_code);
		
		}
	}
	else{
		
		$("#in-course").html("1" +" "+ in_bank.currency_code);
		$("#to-course").html(roundPs(api.pair.course,to_bank.round) +" "+ to_bank.currency_code);

	
		$('#give_away_cur_val').html("1");
		$('#give_away_cur').html(in_bank.currency_code);
	
		$('#receive_cur_val').html(roundPs(api.pair.course,to_bank.round));
		$('#receive_cur').html(to_bank.currency_code);
	
	}

	from_to[2] = api.pair.course;

	getMins(in_bank, to_bank);
}



function getCourseCourseThirtySecondUpdate() {
	var to_bank = getPs(from_to[1]);
	var in_bank = getPs(from_to[0]);

	if(to_bank.currency_code != in_bank.currency_code){
		if(api.pair.course<1){
			$("#in-course").html(roundPs(1/api.pair.course,in_bank.round) +" "+ in_bank.currency_code);
			$("#to-course").html("1 "+ to_bank.currency_code);
			
			$('#give_away_cur_val').html(roundPs(1/api.pair.course,in_bank.round));
			$('#give_away_cur').html(in_bank.currency_code);
		
			$('#receive_cur_val').html("1");
			$('#receive_cur').html(to_bank.currency_code);
		}
		else{
		
			$("#in-course").html("1" +" "+ in_bank.currency_code);
			$("#to-course").html(roundPs(api.pair.course,to_bank.round) +" "+ to_bank.currency_code);
		
		
			$('#give_away_cur_val').html("1");
			$('#give_away_cur').html(in_bank.currency_code);
		
			$('#receive_cur_val').html(roundPs(api.pair.course,to_bank.round));
			$('#receive_cur').html(to_bank.currency_code);
		
		}
	}
	else{
		
		$("#in-course").html("1" +" "+ in_bank.currency_code);
		$("#to-course").html(roundPs(api.pair.course,to_bank.round) +" "+ to_bank.currency_code);

	
		$('#give_away_cur_val').html("1");
		$('#give_away_cur').html(in_bank.currency_code);
	
		$('#receive_cur_val').html(roundPs(api.pair.course,to_bank.round));
		$('#receive_cur').html(to_bank.currency_code);
	
	}
	
	from_to[2] = api.pair.course;
	console.log('from_to getCourseThirtySecondUpdate')
	calculate(1);
	
	/*
	getMins(in_bank, to_bank);*/
}






function createFromTo(way) {
    // if (way == 1) $(".section-get .pay-select-li").css("display", "none");
	
	var get_last_active_id = $(".section-get .pay-select-li.active").attr('data-pay-id');
	
	//находим куда хотим переключиться
    for (var inway in api.ways) {
		if (way == 1 ){
			$(".section-get .pay-select-li[data-pay-id='" + api.ways[inway] + "']").css("display", "");
			if( get_last_active_id == api.ways[inway] ) from_to[1] = api.ways[inway];
			
		}
	}
}


function show_modal(id){
    $('.modal_window_bg').css({ display: 'none' });
    console.log(id);
    $('#' + id + '.modal_window_bg').css({ display: 'block',  transition: 'all 0s', opacity: 0, top: '40%', left: '40%', width: '20%', height: '20%' });
    $('#' + id + '.modal_window_bg').css({ transition: 'all 0.2s linear', opacity: 1, top: '0', left: '0', width: '100%', height: '100%' });
  
}
function hide_modal(){
    $('.modal_window_bg').css({ transition: 'all 0.2s linear', opacity: 0, top: '40%', left: '40%', width: '20%', height: '20%' });
    setTimeout( function(){
        $('.modal_window_bg').css({ display: 'none' });
    }, 200);
}

function showNotify(way,ps) {
	console.log(way+" и "+ps);
    //уведомление
    var bank = getPs(ps);
	
	if(way==1) {
        if(bank.notify_in!="") {
			
			$("#notify-body").html(bank.notify_in);
            $("#notify-modal").modal({fadeDuration: 100});
			
			/*$('#notifications_in').html(bank.notify_in)
			$('#notifications_in_block').addClass("note_in_block");*/
		}
    }
    else{
        if(bank.notify_to!="") {
			  
			$("#notify-body").html(bank.notify_to);
            $("#notify-modal").modal({fadeDuration: 100});
			/*
			$('#notifications_out').html(bank.notify_to)
			$('#notifications_out_block').addClass("note_in_block");*/
		}
    }
}


function roundPs(x, n) {
    if(isNaN(x) || isNaN(n)) return false;
    var m = Math.pow(10,n);
	return Math.round(x*m)/m;
}

function calculate(way) {
	
}
