'use strict';

var modal = {

	days : 12 ,

	students :[
		{
			name : 'Slappy the Frog' ,
			checked : [],
			missed : 12

		},
		{
			name : 'Lilly the Lizard' ,
			checked : [],
			missed : 12

		},
		{
			name : 'Paulrus the Walrus',
			checked : [],
			missed : 12
		},
		{
			name : 'Gregory the Goat',
			checked : [],
			missed : 12
		},
		{
			name : 'Adam the Anaconda',
			checked : [],
			missed : 12
		}
	]
	

};

var control = {


	lstorage: {
		start : function(){
			if (!localStorage.attendance){
				localStorage.attendance = JSON.stringify(modal);
			} else {
				modal = JSON.parse(localStorage.attendance);
			}
		},
		
		add : function(){
			localStorage.attendance = JSON.stringify(modal) ;
		}
	},


	data:{
		add : function(days , checked , i , s ){
			modal.days = days ;
	
			modal.students[i].checked[s] = checked ;
			
			
			modal.students[i].missed=12;
			for (let st=0 ; st<=modal.students[i].checked.length ; st++ ){
				if(modal.students[i].checked[st]===true){
					modal.students[i].missed-- ;
				}
			}
		},
		
		get:function(call , i){
			switch(call){
			case 1 :
				return modal.days ;
				break;
			case 2 :
				return modal.students[i].checked;
				break;
			case 3 :
				return modal.students[i].missed;
				break;
			default : 
				console.log('error');
			}
		}
	},
	


	table : function(){
		view.pageStructure(
			modal.students,
			modal.days ,
			modal.students
		);
	},


	addName : function(newStd){
		modal.students.push({
			name : newStd ,
			checked : [],
			missed : 12
		});
		view.appendName(newStd);
		control.lstorage.add();
		view.missedDays(modal.students , modal.days);
	},


	render : function(){
		this.lstorage.start();
		this.table();
		view.addName();
		view.missedDays(modal.students , modal.days );
	}

};


var view = {

	pageStructure : function(student , days , missed){
		let table = document.createElement('table'),
			thead = document.createElement('thead'),
			tbody = document.createElement('tbody'),
			h1 = document.createElement('h1');
			
		h1.textContent='Udacity Attendance';
		document.body.prepend(table);
		document.body.prepend(h1);
			
		

		for(let i = 0 ; i < student.length ; i++){

			let tr = document.createElement('tr'),
				trhead = document.createElement('tr');


			if(i==0){
				table.appendChild(thead);
				thead.appendChild(trhead);
				table.appendChild(tbody);
			}


			tbody.appendChild(tr);
            

			for (let s=0 ; s < days ; s++){

				let td = document.createElement('td'),
					th = document.createElement('th'),
					thhead = document.createElement('th'),
					input = document.createElement('input');


				
				input.setAttribute('type','checkbox');		   
				

				if(s==0){
					let thhead = document.createElement('th');

					th.textContent=student[i].name;
					th.style.color='yellow';
					tr.appendChild(th);
                    
					thhead.textContent='Student Name';
					trhead.appendChild(thhead);
				}



				td.appendChild(input);
				tr.appendChild(td);
                
				thhead.textContent= s+1 ;
				trhead.appendChild(thhead);
				
				

				if(s==11){

					let thhead = document.createElement('th'),
						td = document.createElement('td');

					thhead.setAttribute('class','missed-col');
					td.setAttribute('class','missed-col');

					td.textContent = missed[i].missed ;
					tr.appendChild(td);
                    
					thhead.textContent = 'Days Missed-col';
					trhead.appendChild(thhead);
				}



			}
        
		}
        
	},



	addName : function(){
		let input = document.createElement('input'),
			submit = document.createElement('input');

		input.setAttribute('type','input');
		submit.setAttribute('type','button');
		submit.setAttribute('value','Add New Student');

		document.body.prepend(submit);
		document.body.prepend(input);


		submit.onclick = function(){
			if(input.value != ''){
				control.addName(
					input.value 
				);

				input.value = '';

			}
		};
	},



	appendName: function(student){
		let getTr = document.getElementsByTagName('tr'),
			newTr = getTr[getTr.length-1].cloneNode(true),
			table = document.getElementsByTagName('table')[0];

		newTr.firstChild.textContent = student ;

		for (var a=1 ;a< newTr.children.length-1 ; a++){
			newTr.children[a].children[0].checked=false;
		}

		table.appendChild(newTr);
	},



	missedDays: function(student , days){
		let tr = document.getElementsByTagName('tr');

		for (let Tr=1 ; Tr<=student.length ; Tr++){
			let td = tr[Tr] ;
			for(let Td =1 ; Td<=days ; Td++){
				td.children[Td].children[0].onclick = function(){
					control.data.add(
						12,
						td.children[Td].children[0].checked,
						Tr-1 ,
						Td-1
					);
					td.lastChild.textContent = control.data.get(3,Tr-1) ;
					control.lstorage.add();
				};
			}
		}
			

	},




    

	render : function(){
	}
};




control.render();









/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
// (function() {
// 	if (!localStorage.attendance) {
// 		console.log('Creating attendance records...');
// 		function getRandom() {
// 			return (Math.random() >= 0.5);
// 		}

// 		var nameColumns = $('tbody .name-col'),
// 			attendance = {};

// 		nameColumns.each(function() {
// 			var name = this.innerText;
// 			attendance[name] = [];

// 			for (var i = 0; i <= 11; i++) {
// 				attendance[name].push(getRandom());
// 			}
// 		});

// 		localStorage.attendance = JSON.stringify(attendance);
// 	}
// }());


// /* STUDENT APPLICATION */
// $(function() {
// 	var attendance = JSON.parse(localStorage.attendance),
// 		$allMissed = $('tbody .missed-col'),
// 		$allCheckboxes = $('tbody input');

// 	// Count a student's missed days
// 	function countMissing() {
// 		$allMissed.each(function() {
// 			var studentRow = $(this).parent('tr'),
// 				dayChecks = $(studentRow).children('td').children('input'),
// 				numMissed = 0;

// 			dayChecks.each(function() {
// 				if (!$(this).prop('checked')) {
// 					numMissed++;
// 				}
// 			});

// 			$(this).text(numMissed);
// 		});
// 	}

// 	// Check boxes, based on attendace records
// 	$.each(attendance, function(name, days) {
// 		var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
// 			dayChecks = $(studentRow).children('.attend-col').children('input');

// 		dayChecks.each(function(i) {
// 			$(this).prop('checked', days[i] ); 
// 		});
// 	});

// 	// When a checkbox is clicked, update localStorage
// 	$allCheckboxes.on('click', function() {
// 		var studentRows = $('tbody .student'),
// 			newAttendance = {};

// 		studentRows.each(function() {
// 			var name = $(this).children('.name-col').text(),
// 				$allCheckboxes = $(this).children('td').children('input');

// 			newAttendance[name] = [];

// 			$allCheckboxes.each(function() {
// 				newAttendance[name].push($(this).prop('checked'));
// 			});
// 		});

// 		countMissing();
// 		localStorage.attendance = JSON.stringify(newAttendance);
// 	});

// 	countMissing();
// }());