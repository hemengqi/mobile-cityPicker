(function($){            
		var scroll = {
			init: function(args){
				$(function(){
					if(!args.id){console.log('必须设置容器id');return;}
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
			getText: function(args,val){
	        	val.split(' ').map(function(e,i){
	        		var input = $('.'+args.inputClass).eq(i);
	        		input.attr('data-id',e).val($('[data-val="'+e+'"]').find('.'+input.data('label')).html());
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
			        labels: args.label,
			        onSelect: function (valueText, inst) {
			        	scroll.getText(args,valueText);
    				},
			    });
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
				'id': '',
				'defaultValue':[0,0,0],
				'label':['province', 'city', 'district'],
            	'inputClass': 'input-cnt',
            	'inputClick': false,
			},option));
		}
	})
})(jQuery);