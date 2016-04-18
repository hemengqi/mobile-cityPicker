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
		    		liStr = '';
		    	//console.log(ChineseDistricts[country]);
		    	for(var province in ChineseDistricts[country]){
		    		liStr += '<li><span class="'+args.label[0]+'">'+ChineseDistricts[country][province]+'</span>';
		    			liStr += '<ul>';
		    			for(var city in ChineseDistricts[province]){
		    				liStr += '<li><span class="'+args.label[1]+'">'+ChineseDistricts[province][city]+'</span>';
		    					liStr += '<ul>';
		    					for(var district in ChineseDistricts[city]){
		    						liStr += '<li><span class="'+args.label[2]+'">'+ChineseDistricts[city][district]+'</span></li>';
		    					}
		    					liStr += '</ul>';
		    				liStr += '</li>';
		    			}
		    			liStr += '</ul>';
		    		liStr +='</li>'
		    	}
		    	$('#'+args.id).html(liStr);
		    	
			},
			getText: function(val){
	        	val.split(' ').map(function(e,i){
	        		var input = $('.input-cnt').eq(i);
	        		input.data('id',e).val($('[data-val="'+e+'"]').find('.'+input.data('label')).html());
	        	});
			},
			bindEvent: function(args){
				$('#'+args.id).mobiscroll().treelist({
			        theme: 'android-holo-light',
			        mode: 'mixed',
			        inputClass: 'cityPickerInput',
			        display: 'bottom', 
			        lang: 'zh',
			        defaultValue: args.defaultValue,
			        labels: ['province', 'city', 'district'],
			        onSelect: function (valueText, inst) {
			        	scroll.getText(valueText);
    				},
			    });
			}
		};
	$.extend({
		mobileCityPicker: function(option){
			scroll.init($.extend({
				'id': '',
				'defaultValue':[0,0,0],
			},option));
		}
	})
})(jQuery);