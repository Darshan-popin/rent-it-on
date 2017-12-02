

CKEDITOR.plugins.add('placeholder_select',
{
	requires : ['richcombo'],
	init : function( editor )
	{
		//  array of placeholders to choose from that'll be inserted into the editor
		var placeholders = [];
		
		// init the default config - empty placeholders
		var defaultConfig = {
			format: '[[%placeholder%]]',
			placeholders : []
		};

		// merge defaults with the passed in items		
		var config = CKEDITOR.tools.extend(defaultConfig, editor.config.placeholder_select || {}, true);

		// run through an create the set of items to use
		// for (var i = 0; i < config.placeholders.length; i++) {
		// 	// get our potentially custom placeholder format
		// 	var array = config.placeholders[i].split(':');
		// 	var placeholder = config.format.replace('%placeholder%', array[0]);			
		// 	placeholders.push([placeholder, array[1], array[1]]);
		// }

		// add the menu to the editor
		editor.ui.addRichCombo('placeholder_select',
		{
			label: 		'Robo-tags',
			title: 		'Robo-tags',
			className : 'cke_format',
			multiSelect:false,
			panel:
			{
				css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
				attributes: { 'aria-label': 'Robo CRM Metatags' }
			},

			init: function()
			{
				
				for (var i in config.placeholders)
				{
					this.startGroup( config.placeholders[i][0]);
					for(var j =0;j<config.placeholders[i][1].length;j++){
						var subarr = config.placeholders[i][1];
					var array = subarr[j].split(':');
					var placeholder = config.format.replace('%placeholder%', array[0]);			
					this.add(placeholder, array[1], array[1]);
					}	
					//this.add(placeholders[i][0], placeholders[i][1], placeholders[i][2]);
				}
			},

			onClick: function( value )
			{
				editor.focus();
				editor.fire( 'saveSnapshot' );
				editor.insertHtml(value);
				editor.fire( 'saveSnapshot' );
			}
		});
	}
});
