var app;


define(["jquery", "qlik"], function($, qlik) {
	'use strict';
	debugger;
	app = qlik.currApp(this);
	app.clearAll();
    
	
	return {
		
		//property panel
		definition: {
			type: "items",
			component: "accordion",
			items: {
			    settings: {
					uses: "settings"
				},  
                customProperties : {
                  component: "expandable-items",
				  label: "Custom Properties",
				  type : "items",
                  items:{					
					TexttoDisplay : {
								
								label: "Label Text",
								type : "items",
								items : 
								{									
									id1_Name:{
										ref: "Option_1_Text",
										label: "Label 1",
										type: "string",
										defaultValue: "OFF"
									},
									id2_Name:{
										ref: "Option_2_Text",
										label: "Label 2",
										type: "string",
										defaultValue: "ON"
									}									
								}									
							},
					VariableName:{
								ref: "output_variable_name",
								label: "Variable",
								type: "string",								
								expression: "optional",
								defaultValue: ""
							} ,					
					State:{
							ref: "selection_state",
							label:"Current Selection",
							component: "dropdown",
							show: false,
							defaultValue: "none",
							options: [
								{
									value: "none",
									label: "None"
								},
								{
									value: "left",
									label: "Select OFF"
								},
								{
									value: "right",
									label: "Select ON"
								}
							]
					}
                  }
                }
				
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ( $element, layout ) {
			var self = this, html = '<div>';
            debugger;		
			
			var id1=layout.qInfo.qId+"-id1";
			var id2=layout.qInfo.qId+"-id2";
			
			var id1_value="0";
			var id2_value="1";
			
			var id1_name=layout.Option_1_Text;
			var id2_name=layout.Option_2_Text;
			
			
			
			var style1="style='border:none;"+
								"color: white;"+
								"padding: 5px 10px;"+
								"text-align: center;"+
								"text-decoration: none;"+
								"display: inline-block;"+
								"font-size: 16px;"+
								"border-top-left-radius: 0.4em;"+
								"border-bottom-left-radius: 0.4em;"+
								"cursor: pointer;'";
								
			var style2="style='border:none;"+
								"color: white;"+
								"padding: 5px 10px;"+
								"text-align: center;"+
								"text-decoration: none;"+
								"display: inline-block;"+
								"font-size: 16px;"+
								"border-top-right-radius: 0.4em;"+
								"border-bottom-right-radius: 0.4em;"+
								"cursor: pointer;'";
			
			html += "<span >";
				html += "<input type='button' "+style1+" value='"+id1_name+"' name='MyButtonAeS1'  id='"+id1+"'  />" ; 
				
				html += "<input type='button' "+style2+" value='"+id2_name+"' name='MyButtonAeS2' id='"+id2+"'  />" ; 
							
			html +=	"</span>";
			
			
		html += '</div>';
			
		$element.html( html );			
		

		
		
		if (app.variable.getByName) 
		{
			app.variable.getByName(layout.output_variable_name).then(function () {
			
			}, function () {
			
			app.variable.create(layout.output_variable_name);
			
			app.variable.setContent(layout.output_variable_name,'0');
			});
		} 
		else {
			//create variable - ignore errors
			app.variable.create(layout.output_variable_name);
		}
		
		var color1="#01DF01",color2="gray";
		
				
		if(layout.selection_state=="left")
		{
			document.getElementById(id1).style.backgroundColor = color1;
			document.getElementById(id2).style.backgroundColor = color2;
			
			app.variable.setContent(layout.output_variable_name,id1_value);
		}
		if(layout.selection_state=="right")
		{
			document.getElementById(id2).style.backgroundColor = color1;
			document.getElementById(id1).style.backgroundColor = color2;
			
			app.variable.setContent(layout.output_variable_name,id2_value);
		}		
		if(layout.selection_state=="none")
		{
			app.variable.setContent(layout.output_variable_name,"nill");
		}			
			
		
		var me=this;	
			
		/////////////////////////////////////////
		$("#"+id1).click(
				function(event){
					
					
					
					document.getElementById(id1).style.backgroundColor = color1;
					document.getElementById(id2).style.backgroundColor = color2;					
					
					app.variable.setContent(layout.output_variable_name,id1_value);
					
					me.backendApi.getProperties().then(function(reply)
					{	
							reply.selection_state= "left"; 
							me.backendApi.setProperties(reply);
							
					});
					
					
				}				
			);
		
		$("#"+id2).click(
				function(event){
					
					
					document.getElementById(id2).style.backgroundColor = color1;
					document.getElementById(id1).style.backgroundColor = color2;
					
					app.variable.setContent(layout.output_variable_name,id2_value);
					
					me.backendApi.getProperties().then(function(reply)
					{	
							reply.selection_state= "right"; 
							me.backendApi.setProperties(reply);
							
					});
				}
			);
			
		
		
		}
	};
} );

