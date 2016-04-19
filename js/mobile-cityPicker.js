(function($){            
		var scroll = {
			init: function(args){
				$(function(){
					scroll.fillHtml(args);
					scroll.bindEvent(args);
				})
			},
			fillHtml: function(args){
				if (typeof ChineseDistricts === 'undefined') {
			        throw new Error('The file "city-picker.data.js" must be included first!');
			    }
			    
		    	var country = 86,
		    		label = args.option.label,
		    		liStr = '';
		    	//console.log(ChineseDistricts[country]);
		    	for(var province in ChineseDistricts[country]){
		    		liStr += '<li><span class="'+label[0]+'">'+ChineseDistricts[country][province]+'</span>';
		    			liStr += '<ul>';
		    			for(var city in ChineseDistricts[province]){
		    				liStr += '<li><span class="'+label[1]+'">'+ChineseDistricts[province][city]+'</span>';
		    					liStr += '<ul>';
		    					for(var district in ChineseDistricts[city]){
		    						liStr += '<li><span class="'+label[2]+'">'+ChineseDistricts[city][district]+'</span></li>';
		    					}
		    					liStr += '</ul>';
		    				liStr += '</li>';
		    			}
		    			liStr += '</ul>';
		    		liStr +='</li>'
		    	}
		    	$('#'+args.id).html(liStr);
		    	
			},
			getText: function(args,val){
	        	var citys = [];
	        	val.split(' ').map(function(e,i){
	        		console.log($('[aria-selected="true"]'));
	        		var input = $('.'+args.inputClass).eq(i),
	        			txt = $('[aria-selected="true"]').find('.'+input.data('label')).html();
	        		input.attr('data-id',e).val(txt);
	        		citys.push(txt);
	        	});
	        	if(typeof(args.callback) == 'function'){
	        		args.callback(val,citys);
	        	}
			},
			bindEvent: function(args){
				$('#'+args.id).mobiscroll().treelist($.extend({
			        onSelect: function (valueText, inst) {
			        	console.log(valueText);
			        	scroll.getText(args,valueText);
    				},
    				onValueTap: function (item, inst) {
    					console.log(item);
    				},
			    },args.option));
			    if(args.inputClick){
			    	$('.'+args.inputClass).on('click',function(){
			    		$('#'+args.id).mobiscroll('show');
			    	})
			    }
			}
		};
	$.extend({
		mobileCityPicker: function(option){
			scroll.init($.extend({
				id: '',
				inputClass:'cityPickerInput',
				option:{
					defaultValue:[0,0,0],
					label:['province', 'city', 'district'],
					theme: 'android-holo-light',
			        mode: 'mixed',
			        inputClass: 'hidden',
			        display: 'bottom', 
			        lang: 'zh',
				},
				callback:function(){},
			},option));
		}
	})
})(jQuery);